# ChainRadar User Navigation & Operations Guide

## 1. Getting Started & Accounts
- **Public Visitor (No login needed):**
  - Go to `/intelligence` to browse and search the 80 post-hack incident studies.
  - Go to `/casestudy` to view the 5 guided forensic case studies (Bybit, Wormhole, LME Crypto Group, Chaos Ransomware, Northstar Monero Control).
- **Investigator Account (Login required):**
  - After signing in via email, nickname, or Google, you land on `/dashboard`.
  - From `/dashboard`, you can view market intelligence (CoinMarketCap, DeFiLlama TVL, Blockchair network pulse), manage private cases, and launch forensic tools.
  - To update your profile photo, go to your Profile page and upload a JPEG, PNG, or WebP image (ChainRadar strips metadata and converts it to a 512x512 WebP).
- **Administrator Account (`admin@chainradar.local`):**
  - After signing in, administrators land on `/admin`.
  - Go to `/admin` -> **Tools section** to enable or disable restricted tools like the **Wallet Flow Tracer** and grant access to specific investigators.
  - Go to `/admin/incidents` to create drafts, edit revisions, publish, or archive post-hack intelligence studies.

## 2. Where to Go to Run Specific Blockchain Tools
Always match the tool to the blockchain and artifact you are investigating:

- **To check a wallet's recent public activity:**
  - Use **Address Lookup** (Available for Ethereum, Solana, and Bitcoin).
- **To preserve a transaction with source, time, finality, and SHA-256 digest:**
  - Use **Transaction Observation Report** (Available for Ethereum, Solana, and Bitcoin).
- **To decode Ethereum (EVM) or Solana smart-contract execution:**
  - Open **Smart-chain Transaction Decoder**.
  - Select **Ethereum mode** to inspect EVM target, receipt, logs, gas, and call context (e.g., Bybit Safe compromise).
  - Select **Solana mode** to inspect instructions, program/account keys, logs, pre/post balances, and slot/fee (e.g., Wormhole bridge exploit).
- **To verify Bitcoin inputs, outputs, and exact miner fees:**
  - Open **Bitcoin Transaction Decoder** (e.g., Chaos ransomware case). It checks if inputs equal outputs plus the miner fee in satoshis.
- **To track USDT or TRC-20 token transfers on TRON:**
  - Open **TRC-20 Transfer Tracker**. Enter the TRON subject address and token contract filter (e.g., official USDT `TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t`) to inspect confirmed transfers.
- **To validate a Monero (XMR) address format and checksum:**
  - Open **Monero Address Validator**. It runs locally in your browser with no external provider and verifies network (`mainnet`), type (`standard`), prefix, and cryptographic checksum.
- **To trace wallet-to-wallet movements (Bounded Adjacency):**
  - Open **Wallet Activity Tracer** (Ethereum up to depth 3; Solana depth 1).
  - *Note:* If this tool is locked, an Administrator must first enable **Wallet Flow Tracer** globally in `/admin` and click **Allow tool** for your investigator account.
- **To check reviewed source labels on an address:**
  - Use **Address Intelligence** (or click **Analyze address** inside a case study) to separate deterministic on-chain facts from reviewed external claims (like FBI or DOJ labels).
- **To analyze a wallet file locally:**
  - Active investigators can use the **Wallet File Analyzer** (in R&D evaluation), which runs in a one-shot browser worker to classify supported wallet artifacts and optionally reveal credentials for 30 seconds if you supply a known password.

## 3. How to Use Checklists & Export Technical Evidence Reports
- **Using Investigation Checklists (`/checklists`):**
  - Go to `/checklists` (requires investigator login).
  - Choose from 1 general post-hack workflow or 10 specialist workflows.
  - You can save task statuses, blocker/N/A reasons, and two private plain-text notes ("what you found" and "what work remains", up to 4,000 characters each) without creating a full case.
- **Exporting a Technical Evidence Report:**
  - After running a tool (Blockchain Profiler, Wallet Activity Tracer, Address Intelligence, or a Checklist), scroll to the **Technical evidence report** panel below the completed result.
  - Enter your case/evidence reference fields and build a draft.
  - You can export the normalized JSON, a detached SHA-256 manifest, and a printable examiner report.

## 4. How to Follow the 5 Guided Demo Cases (`/casestudy`)
Go to `/casestudy` to practice or demonstrate the platform with prefilled public seeds:
1. **Bybit (`/casestudy/bybit-signing-interface-compromise`):** Ethereum EVM compromise. Uses Transaction Observation Report, Smart-chain Decoder, Wallet Activity Tracer, Address Lookup, and Address Intelligence.
2. **Wormhole (`/casestudy/wormhole-solana-signature-bypass`):** Solana bridge exploit. Uses Smart-chain Transaction Decoder (Solana mode).
3. **LME Crypto Group (`/casestudy/lme-crypto-tron-confidence-scam`):** TRON laundering investigation. Uses TRC-20 Transfer Tracker.
4. **Chaos Ransomware (`/casestudy/chaos-ransomware-bitcoin-seizure`):** Bitcoin seizure investigation. Uses Bitcoin Transaction Decoder.
5. **Northstar Payroll (`/casestudy/northstar-monero-extortion-control`):** Fictional/synthetic control case. Uses Monero Address Validator for positive and negative checksum testing.

## 5. Crucial Rules & Platform Boundaries (What ChainRadar Does NOT Do)
- **Never input secrets:** Never paste private keys, seed phrases, mnemonics, Monero view/spend keys, passwords, or API keys into any tool route.
- **No AI/ML guilt or taint scoring:** ChainRadar does not use machine learning to determine malicious intent, calculate taint, prove common ownership, or identify real-world individuals.
- **Not automatic court proof:** Outputs and checklists are research observations and workflow attestations, not automatic court-admissible judgments.