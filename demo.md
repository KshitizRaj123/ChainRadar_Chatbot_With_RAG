# ChainRadar five-case project demo

This runbook shows how to demonstrate all ChainRadar chain-investigation tools
through five different projects, networks, and attack vectors. The cases are not
five versions of the same Ethereum exploit:

1. Bybit / Safe — Ethereum signing-interface supply-chain compromise;
2. Wormhole — Solana bridge signature-verification failure;
3. LME Crypto Group / Bull Tycoon — TRON confidence-scam laundering;
4. Chaos ransomware — Bitcoin proceeds and law-enforcement seizure; and
5. Northstar Payroll — a clearly fictional Monero extortion-intake control.

The first four are source-backed real incidents or legal investigations. The
fifth is synthetic by design and uses an address published in official Monero
documentation. Its checksum result is genuine, but it has no real victim,
attacker, payment, or loss.

## Standalone investigation reports

Use the five examiner-oriented reports when the demonstration needs more than a
presenter script. Each report contains exact public transaction/address seeds,
an evidence inventory, independent cross-checks, preservation instructions,
bounded findings, sources, and a custody-completion record:

1. [Bybit signing-interface compromise](./case-studies/01-bybit-signing-interface-compromise.md)
2. [Wormhole Solana signature bypass](./case-studies/02-wormhole-solana-signature-bypass.md)
3. [LME Crypto Group TRON investigation](./case-studies/03-lme-crypto-tron-confidence-scam.md)
4. [Chaos ransomware Bitcoin seizure](./case-studies/04-chaos-ransomware-bitcoin-seizure.md)
5. [Northstar Monero synthetic control](./case-studies/05-northstar-monero-extortion-control.md)

Start with the [shared acquisition and cold-evidence
procedure](./case-studies/README.md). In these documents, “seed” means a public
investigation starting artifact. It never means a mnemonic, wallet seed phrase,
private key, or other transaction-authorizing secret.

## Demo objective

The audience should see ChainRadar answer narrow, reproducible questions with
real public data:

- What exact transaction or address starts the investigation?
- Which tool is technically appropriate for that chain and artifact?
- What did ChainRadar observe from its fixed provider or local validator?
- Which independent source can reproduce or corroborate the result?
- Which claims still depend on a technical report, government filing, or other
  off-chain evidence?
- What must remain unknown?

The demo is successful when every material result is either independently
cross-checked or explicitly marked as unverified.

## Five-case lineup

| Case | Project | Network | Attack vector | Status | Primary tool result |
| --- | --- | --- | --- | --- | --- |
| 01 | Bybit / Safe | Ethereum | Compromised signing interface and delegatecall | Real | EVM execution, call context, addresses, and bounded flow |
| 02 | Wormhole Portal Bridge | Solana | Spoofed verification account and forged guardian approval | Real | Solana instructions, accounts, logs, balances, and fee |
| 03 | LME Crypto Group / Bull Tycoon | TRON | Fake investment platform and cross-chain laundering | Real legal investigation | Confirmed USDT-TRC20 transfers for DOJ-named addresses |
| 04 | Chaos ransomware investigation | Bitcoin | Ransomware proceeds and seizure | Real legal investigation | Exact UTXO, output, and 380-satoshi fee reconciliation |
| 05 | Northstar Payroll | Monero | Fictional extortion intake and false-attribution control | Synthetic | Real local address-format and checksum validation |

Open the complete library at:

```text
http://localhost:3000/casestudy
```

## Tool coverage

Coverage is collective across the five cases. An irrelevant tool is never
forced onto the wrong chain.

| ChainRadar tool | Demonstrated in | Evidence question |
| --- | --- | --- |
| Address Lookup | Bybit, Wormhole, Chaos | What bounded recent public activity does the provider expose? |
| Transaction Observation Report | Bybit, Wormhole, Chaos | Can the exact transaction be preserved with source, time, finality, warnings, and digest? |
| Bitcoin Transaction Decoder | Chaos | Do inputs equal outputs plus the miner fee? |
| Smart-chain Transaction Decoder | Bybit and Wormhole | What EVM receipt or Solana instruction/account data actually executed? |
| Monero Address Validator | Northstar synthetic control | Is the public string structurally valid, and what network/type does it encode? |
| TRC-20 Transfer Tracker | LME Crypto Group | Which confirmed transfers use the official USDT contract? |
| Address Intelligence | Bybit, Wormhole, LME, Chaos | Which facts are deterministic and which labels are reviewed source claims? |
| Wallet Activity Tracer | Bybit and Wormhole | What bounded adjacency can be shown without claiming taint, allocation, or ownership? |
| Technical evidence report | Every evidence-producing tool above | Can the exact normalized result, method, basis paths, source qualifications, limitations, verification, and integrity values be preserved together? |

Checklists and the investigator dashboard continue the research workflow; they
are not substitutes for an evidence repository or chain parser.

## Evidence contract for the presenter

Use these terms consistently:

| Evidence class | Meaning | Safe presenter language |
| --- | --- | --- |
| On-chain or cryptographic fact | Returned public-ledger fields or a deterministic local validation | “ChainRadar observed…” or “The checksum validates…” |
| Source-reported context | A claim made by the FBI, DOJ, incident party, or technical researcher | “The FBI attributes…”, “The complaint alleges…”, or “CertiK reports…” |
| Bounded inference | A reasoned interpretation with stated alternatives and limits | “This is consistent with…, but does not establish…” |

Never say that ChainRadar independently identified a person, proved malicious
intent, calculated taint, established common ownership, or produced a legal
judgment.

## Before the presentation

### Start the local stack

From the repository root:

```bash
docker compose up --build -d
docker compose ps
```

Open:

- ChainRadar: `http://localhost:3000`
- Mailpit: `http://localhost:8025`

Confirm that `/casestudy` displays five cards and the complete tool-coverage
table.

### Prepare accounts

Use two presentation-only accounts:

| Role | Suggested account | Purpose |
| --- | --- | --- |
| Administrator | `admin@chainradar.local` | Enable and grant the Wallet Activity Tracer |
| Investigator | Any separate local demo email and nickname | Open tools and save checklist progress |

There is no default password. Never place a password, provider key, cookie, or
session token in this file, a slide, a screenshot, or a recording.

### Configure providers

Connected tools fail closed when their provider is not configured. Put secrets
only in the untracked `.env` file and rebuild the service.

| Provider setting | Needed for |
| --- | --- |
| `ETHERSCAN_API_KEY` | Bybit Ethereum observation, decoder, lookup, and depth-3 tracer history |
| `SOLANA_RPC_URL` and `SOLANA_RPC_LABEL` | Wormhole Solana observation, decoder, lookup, and depth-1 trace |
| `TRONGRID_API_KEY` and `TRONGRID_LABEL` | LME Crypto Group TRC-20 transfer history |
| No additional key | Bitcoin Esplora adapter, subject to network availability |
| No provider | Monero validation runs locally in the browser |

Provider output is an observation, not a chain-truth oracle or permanent
finality guarantee.

### Enable Wallet Activity Tracer

The tracer is deliberately migrated as disabled and default-deny.

1. Sign in as the administrator and open `/admin`.
2. Select **Wallet Flow Tracer** in the tools section.
3. Set global state to **Enabled**.
4. Keep default access off unless all local investigators should receive it.
5. Select the demo investigator and choose **Allow tool**.
6. Sign out and return as the investigator.

An individual allow cannot override a disabled or draining global state.

### Rehearsal checklist

- The five current case slugs load and no retired demo link remains.
- Each case's first-tool button opens the correct chain-specific route.
- Sign-in callbacks preserve prefilled transaction, address, network, and token
  contract query parameters.
- Ethereum, Solana, and TRON provider-readiness labels show the expected state.
- The Monero positive fixture validates and its one-character negative control
  fails checksum validation.
- You can explain one independent cross-check for every shown result.

## Recommended 18-22 minute all-tools demo

### Stage 1 — Show case and tool diversity

Open `/casestudy`.

Point out:

- five different projects and investigation contexts;
- five chain families;
- three transaction seeds and two public-address seeds;
- four real cases and one synthetic control; and
- the tool-coverage table.

Suggested talk track:

> ChainRadar selects a tool from the evidence type and network. It does not send
> a Bitcoin transaction to an EVM decoder or present a Monero checksum as a
> transaction trace. Every result includes a planned independent cross-check.

### Stage 2 — Bybit: use the EVM investigation stack

Open:

```text
/casestudy/bybit-signing-interface-compromise
```

Seed transaction:

```text
0x46deef0f52e3a983b67abf4714448a41dd7ffd6d32d32da69d62081c68ad7882
```

Show these tools in order:

1. **Transaction Observation Report** — confirm network, hash, receipt status,
   block context, provider, acquisition time, warnings, and digest.
2. **Smart-chain Transaction Decoder** — inspect the EVM target, receipt, logs,
   gas, and available call context.
3. **Wallet Activity Tracer** — run depth 1 first; show bounded movements and
   the explicit stopping boundary. Depth 3 is optional and may correctly stop
   early.
4. **Address Lookup** — inspect the affected Safe's bounded recent activity.
5. **Address Intelligence** — use the case page's **Analyze address** buttons to
   inspect the Safe, delegatecall target, and FBI-published indicator separately.
6. **Technical evidence report** — open the report panel below one completed
   result, enter presentation-only case/evidence references, build a draft, and
   show the finding-basis paths, raw-source qualification, normalized-evidence
   digest, JSON/manifest export, and printable examiner derivative.

Cross-check with the linked Etherscan record, NCC Group analysis, and FBI IC3
announcement.

Suggested conclusion:

> The chain establishes the executed Safe transaction. NCC Group supplies the
> interface-compromise explanation, and the FBI supplies the actor attribution.
> Those are three evidence layers, not one model prediction.

### Stage 3 — Wormhole: switch decoder family to Solana

Open:

```text
/casestudy/wormhole-solana-signature-bypass
```

Seed signature:

```text
2zCz2GgSoSS68eNJENWrYB48dMM1zmH8SZkgYneVDv2G4gRsVfwu5rNXtK5BKFxn7fSqX9BvrBc1rdPAeBEcD6Es
```

Open **Smart-chain Transaction Decoder** and show that Solana mode is already
selected. Inspect instructions, program/account keys, logs, pre/post balances,
fee, slot, execution state, and warnings.

Cross-check:

- the exact signature against Solscan;
- the 120,000-wETH mint interpretation against CertiK; and
- the Token Bridge program ID against Wormhole's official contract-address
  reference.

Suggested conclusion:

> ChainRadar reproduces the transaction-level account and execution data.
> CertiK's multi-transaction analysis supplies the spoofed-sysvar root cause.
> The seed transaction alone does not prove every preparation step.

### Stage 4 — LME Crypto Group: inspect real TRC-20 activity

Open:

```text
/casestudy/lme-crypto-tron-confidence-scam
```

DOJ-named subject address:

```text
TC66d59uus8AWhYDvAgWM55T8NRa7KNWAN
```

Official USDT-TRC20 contract filter:

```text
TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
```

Open **TRC-20 Transfer Tracker**. Confirm that both fields are prefilled,
authorize the fixed TronGrid query, and show confirmed transaction IDs,
counterparties, raw values, timestamps, source metadata, and pagination.

Cross-check selected dates and amounts against paragraphs 45-46 of the linked
verified DOJ complaint. Verify the token contract independently against
Tether's supported-protocol reference.

Suggested conclusion:

> The ledger rows can corroborate transfers to the named address. The fake
> platform, victim tracing, freeze, custody, and laundering allegations remain
> claims in the verified complaint, not facts encoded in a TRC-20 event.

### Stage 5 — Chaos: prove Bitcoin arithmetic

Open:

```text
/casestudy/chaos-ransomware-bitcoin-seizure
```

Seed transaction:

```text
626ed3b412c02541c5db53df1c776162ada693050a49d953b3c80f146734832d
```

Open **Bitcoin Transaction Decoder** and show:

- input: `2,028,914,200` satoshis;
- output: `2,028,913,820` satoshis; and
- miner fee: `380` satoshis.

Cross-check the raw transaction against Blockstream and the alleged
ransomware/seizure context against the DOJ release.

Suggested conclusion:

> Bitcoin independently reproduces the amount and fee. The DOJ supplies the
> alleged Chaos association and seizure context. A civil complaint is not a
> final judgment.

### Stage 6 — Northstar: demonstrate a truthful synthetic control

Open:

```text
/casestudy/northstar-monero-extortion-control
```

The page is prominently marked **synthetic control**. The public address is the
exact standard-address example from official Monero documentation.

1. Open **Monero Address Validator**.
2. Validate the prefilled address.
3. Show `mainnet`, `standard`, supported prefix, and checksum verified.
4. Return to the case and open the negative-control step, or change the final
   character manually.
5. Show the checksum-mismatch rejection.

Suggested conclusion:

> This is real cryptographic validation inside a fictional scenario. A valid
> Monero address proves only syntax, network/type, and checksum. It proves no
> activity, balance, payment, ownership, victim, actor, or malicious intent.

### Stage 7 — Show the cross-check section and checklist hand-off

Return to any case and open **Cross-check evidence**. Explain that each claim
names:

1. the ChainRadar observation;
2. the independent source;
3. the expected agreement; and
4. the point where the evidence classes diverge.

Then open a relevant checklist and record only a synthetic demo note such as:

```text
Demo: seed identifier reproduced; independent source comparison pending.
```

Checklist completion is workflow attestation, not proof of custody,
authenticity, attribution, recovery, or admissibility.

### Stage 8 — Close

Suggested closing statement:

> Across five different projects and five chain families, we used every
> investigation tool only where it was technically relevant. The platform
> returned real provider data or deterministic local validation, and every
> material claim had an independent cross-check or an explicit unknown state.

## Eight-minute short version

1. Show the `/casestudy` diversity and tool-coverage table.
2. Decode the Bybit EVM transaction.
3. Decode the Wormhole Solana transaction.
4. Show one LME USDT-TRC20 transfer page.
5. Reconcile the Chaos Bitcoin fee.
6. Validate the Monero positive and negative controls.
7. Finish on one **Cross-check evidence** section.

Skip depth 3, administrator UI, downloads, and checklist editing.

## Expected results and independent checks

| Case | ChainRadar result | Independent check | If they disagree |
| --- | --- | --- | --- |
| Bybit | Ethereum receipt/call context and bounded activity | Etherscan, NCC Group, FBI IC3 | Record field/source/date mismatch; do not merge the claims |
| Wormhole | Solana instructions, accounts, logs, balances, and fee | Solscan, CertiK, Wormhole deployment registry | Check RPC completeness, transaction version, and program IDs |
| LME | Confirmed TRC-20 rows filtered to official USDT | Verified DOJ complaint and Tether contract reference | Check contract filter, raw decimals, page cursor, and date zone |
| Chaos | Exact Bitcoin inputs, output, and fee | Blockstream plus DOJ release | Recheck base units and raw transaction before reporting |
| Northstar | Mainnet standard address and valid checksum; corrupted control rejected | Official Monero address example and checksum specification | Treat as a parser/test-fixture defect; never invent activity |

Agreement between two public providers strengthens reproducibility but does not
prove either provider is complete, correct, or free from reorganization risk.

## Live-demo failure handling

| Symptom | Likely cause | Correct response |
| --- | --- | --- |
| Tool redirects to sign-in | Investigator session expired | Sign in; the callback preserves valid prefilled parameters |
| Wallet tracer unavailable | Global state or personal access | Enable globally and explicitly allow the demo investigator |
| Ethereum unconfigured | Missing Etherscan key | Continue with Bitcoin or local Monero; show fail-closed state |
| Solana unconfigured | Missing fixed Solana RPC | Use the static Wormhole evidence and linked independent sources |
| TRON unconfigured | Missing TronGrid key | Show the DOJ address/contract cross-check plan without inventing rows |
| Trace stops early | No eligible continuation or provider boundary | Explain the stopping reason as the correct bounded result |
| Address Intelligence has no label | No active reviewed claim | Report `unknown`; use the linked source separately |
| Provider output differs from source | Time, finality, pagination, parser, or source issue | Preserve both outputs and investigate the discrepancy |

Do not repeatedly resubmit a failing provider request. Do not switch to
fabricated output. Static case-study text is source-backed context, not a fake
live response.

## Questions an examiner may ask

### Are all five cases real?

Four use real public incidents or legal records. The Northstar Monero case is a
prominently labelled fictional control. It uses a real official documentation
address to demonstrate genuine checksum validation and the danger of false
attribution.

### Does ChainRadar use ML to decide malicious intent?

No. The current platform uses deterministic parsers, fixed-provider
observations, reviewed source claims, and bounded human interpretation. The
Wallet Activity Tracer does not run a trained intent model.

### Why not run every tool on every case?

Tools are chain- and artifact-specific. Using the Bitcoin decoder on Solana or
using Monero checksum validation as a balance lookup would be technically false.
Complete coverage means every tool has at least one valid case, not that every
tool is forced into every case.

### Is a source label evidence?

It is evidence that the named source made a claim. It is not an on-chain fact
or automatic proof of the underlying identity, ownership, or legal conclusion.

### Does the graph prove taint or ownership?

No. It shows bounded observed adjacency with provenance. It performs no taint
allocation, common-control clustering, person identification, or guilt scoring.

### Is the output court-admissible?

Not by itself. ChainRadar supports research observations. Authentication,
custody, preservation, expert review, legal process, and jurisdiction-specific
admissibility remain external obligations.

## Presenter safety

- Use only the public identifiers bundled in the case catalog.
- Never paste a private key, mnemonic, seed, view key, spend key, password, or
  API credential into any route.
- Use demo-only account details and case titles.
- Do not expose `.env`, cookies, authorization headers, or provider keys.
- Keep the Northstar project and extortion narrative labelled fictional.
- Never label the official Monero documentation address as criminal.
- Preserve discrepancies instead of editing results to match a source.

## After the demo

1. Sign out of investigator and administrator accounts.
2. Close authenticated tabs and remove unsafe recordings.
3. Stop the stack without erasing the database volume:

   ```bash
   docker compose down
   ```

4. Rotate any credential that may have been exposed.

## Related records

- [Canonical case-study catalog](../lib/case-studies/catalog.ts)
- [Wallet Activity Tracer](../docs/features/wallet-tracer/README.md)
- [Blockchain Profiler](../docs/features/blockchain-profiler/README.md)
- [Address Intelligence](../docs/features/address-intelligence-directory/README.md)
- [Investigation checklists](../docs/features/investigation-checklists/README.md)
- [Administration and tool governance](../docs/features/administration-and-governance/README.md)
- [Configuration reference](../docs/operations/configuration.md)
