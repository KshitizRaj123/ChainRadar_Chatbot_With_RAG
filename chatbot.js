import fs from 'fs';
import http from 'http';

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';
const CHAT_MODEL = process.env.OLLAMA_CHAT_MODEL || 'qwen2.5:3b';
const EMBED_MODEL = process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text';
const INDEX_CACHE_FILE = 'vector_index.json';

const OUT_OF_SCOPE_MSG =
    'It is outside of my scope. I can only answer questions about operating and navigating ChainRadar.';

const systemRules = fs.readFileSync('system_prompt.txt', 'utf-8');

let vectorStore = [];

function chunkMarkdownFile(filename) {
    if (!fs.existsSync(filename)) return [];
    const content = fs.readFileSync(filename, 'utf-8');
    const rawSections = content.split(/\n(?=##?\s)/g);
    const chunks = [];

    for (const sec of rawSections) {
        const trimmed = sec.trim();
        if (trimmed.length > 40) {
            chunks.push({ source: filename, text: trimmed });
        }
    }
    return chunks;
}

async function getEmbedding(text) {
    const res = await fetch(`${OLLAMA_HOST}/api/embed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: EMBED_MODEL,
            input: text,
        }),
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Ollama Embed Error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    return data.embeddings[0];
}

function cosineSimilarity(vecA, vecB) {
    let dot = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dot += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }
    return dot / (Math.sqrt(normA) * Math.sqrt(normB) || 1);
}

async function initVectorStore() {
    const files = ['main.md','userguide_kb.md', 'demo.md', 'chainradar_main.md'];

    if (fs.existsSync(INDEX_CACHE_FILE)) {
        console.log('📦 Loading cached local vector index from vector_index.json...');
        vectorStore = JSON.parse(fs.readFileSync(INDEX_CACHE_FILE, 'utf-8'));
        console.log(`✅ Loaded ${vectorStore.length} embedded chunks.`);
        return;
    }

    console.log('🔨 Building local RAG vector index with Ollama (nomic-embed-text)...');
    const allChunks = files.flatMap((file) => chunkMarkdownFile(file));

    for (let i = 0; i < allChunks.length; i++) {
        const item = allChunks[i];
        const embedding = await getEmbedding(item.text);
        vectorStore.push({
            id: `chunk_${i}`,
            source: item.source,
            text: item.text,
            embedding,
        });
        process.stdout.write(`   Embedded ${i + 1}/${allChunks.length} chunks...\r`);
    }

    fs.writeFileSync(INDEX_CACHE_FILE, JSON.stringify(vectorStore));
    console.log(`\n✅ Saved ${vectorStore.length} vectors to ${INDEX_CACHE_FILE}`);
}

async function answerWithLocalRAG(question) {
    const queryVec = await getEmbedding(question);

    const scored = vectorStore
        .map((chunk) => ({
            ...chunk,
            score: cosineSimilarity(queryVec, chunk.embedding),
        }))
        .sort((a, b) => b.score - a.score);

    const topChunks = scored.slice(0, 4);
    const bestScore = topChunks[0]?.score ?? 0;

    console.log(`🔍 Best RAG similarity score: ${bestScore.toFixed(3)} (Source: ${topChunks[0]?.source})`);

    if (bestScore < 0.48) {
        return { reply: OUT_OF_SCOPE_MSG, sources: [] };
    }

    const retrievedContext = topChunks
        .map((c, idx) => `[Excerpt ${idx + 1} from ${c.source}]:\n${c.text}`)
        .join('\n\n---\n\n');

    const promptMessages = [
        {
            role: 'system',
            content: `${systemRules}\n\nIMPORTANT: Answer ONLY using the RETRIEVED CHAINRADAR EXCERPTS below. Write in clean plain text or simple bullet points. If the answer is not in the excerpts, reply ONLY with: "${OUT_OF_SCOPE_MSG}"\n\n=== RETRIEVED CHAINRADAR EXCERPTS ===\n${retrievedContext}`,
        },
        {
            role: 'user',
            content: question,
        },
    ];

    const res = await fetch(`${OLLAMA_HOST}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: CHAT_MODEL,
            messages: promptMessages,
            stream: false,
            options: {
                temperature: 0,
            },
        }),
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Ollama Chat Error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const rawReply = data.message?.content?.trim() || OUT_OF_SCOPE_MSG;
    const uniqueSources = Array.from(new Set(topChunks.map((c) => c.source)));

    return { reply: rawReply, sources: uniqueSources };
}

const PORT = 4000;

async function startServer() {
    await initVectorStore();

    const server = http.createServer(async (req, res) => {
        // Handle GET request for the frontend UI
        if (req.method === 'GET' && req.url === '/') {
            try {
                const htmlContent = fs.readFileSync('index.html', 'utf-8');
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(htmlContent);
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading index.html');
            }
            return;
        }

        // Handle POST request for the chat endpoint
        if (req.method === 'POST' && req.url === '/api/chat') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', async () => {
                try {
                    const { question } = JSON.parse(body);
                    const { reply, sources } = await answerWithLocalRAG(question);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ reply, sources }));
                } catch (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: err.message || 'Local RAG error' }));
                }
            });
            return;
        }

        res.writeHead(404);
        res.end('Not found');
    });

    server.listen(PORT, () => {
        console.log(`\n🚀 ChainRadar Local RAG UI is live at: http://localhost:${PORT}`);
    });
}

startServer();