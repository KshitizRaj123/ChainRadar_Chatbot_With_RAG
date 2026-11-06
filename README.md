# 🛡️ ChainRadar Local RAG Assistant

A fully offline, privacy-first **Retrieval-Augmented Generation (RAG)** chatbot and navigation assistant built for **ChainRadar**. It runs entirely on your local machine using **Ollama**, allowing users to query comprehensive user guides, demo workflows, and academic project reports without relying on any external cloud APIs.

---

## ✨ Key Features

- **100% Offline & Private:** Powered locally via Ollama. No data ever leaves your computer.
- **Custom Vector Search:** Implements local text chunking, embedding generation (`nomic-embed-text`), and cosine similarity scoring.
- **Smart Out-of-Scope Protection:** Automatically intercepts and filters queries unrelated to ChainRadar to keep conversations focused.
- **Academic & Documentation Integration:** Supports referencing deep technical documentation, markdown guides, and modular Overleaf LaTeX reports.
- **Sleek Modern Web UI:** A built-in dark-themed, responsive chat interface served directly through Node.js with quick-action suggestion chips.

---

## 🛠️ Tech Stack

- **Backend:** Node.js (`http` module, file system operations)
- **AI / LLM Engine:** Ollama 
  - **Chat Model:** `qwen2.5:3b`
  - **Embedding Model:** `nomic-embed-text`
- **Frontend:** HTML5, Vanilla JavaScript, Modern CSS (Glassmorphism / Dark mode theme)
- **Data Indexing:** Local JSON Vector Caching (`vector_index.json`)

---

## 📂 Project Structure

```text
ChainRadar-Local-RAG/
├── chatbot.js            # Main Node.js server, vector store, and RAG logic
├── index.html            # Frontend UI (HTML, CSS, and client-side JavaScript)
├── system_prompt.txt     # System instructions and refusal guardrails
├── userguide_kb.md       # ChainRadar user guide knowledge base
├── demo.md               # Workflow demo steps and examples
├── chainradar_main.md    # Core platform documentation
└── .gitignore            # Git exclusion rules
