# ChainRadar

ChainRadar is a local-first crypto-incident investigation workspace with a
public post-hack research library, investigator accounts, private case metadata,
standalone and legacy case-linked response checklists, tool access controls, and a privacy-restricted
administration console.

Investigator profile photos are self-hosted: the profile page accepts a bounded
JPEG, PNG, or WebP upload, ChainRadar re-encodes it to a metadata-stripped
512x512 WebP, and PostgreSQL stores the private normalized bytes. The application
does not save or render third-party avatar URLs.

## Post-Hack Intelligence

- `/intelligence` — searchable incident-study library
- `/intelligence/[slug]` — local-archive educational case study
- `/casestudy` — four real investigations and one clearly labelled synthetic control with exact public evidence seeds
- `/casestudy/[slug]` — guided address, transaction, impact, and ChainRadar tool workflow

The migration job seeds the 80 normalized records from
`data/post-hack-incidents.json` into PostgreSQL. The database is authoritative at
runtime: public pages read only the explicitly published revision, so a saved
draft or an unpublished edit cannot appear in the public library.

Active administrators manage this catalog at `/admin/incidents`. They can
create a draft, save strict bounded revisions, publish the current head
revision, and archive a study without deleting its history. IDs and slugs remain
immutable, mutations use optimistic revision checks and idempotency identifiers,
and revisions plus lifecycle events are append-only. This public research
catalog is deliberately separate from private investigator cases and case
files.

Imported timelines and attack flows are explicitly presented as educational
reconstructions, not verified forensic evidence. Verify every record against
primary sources before relying on a claim, amount, address, or attribution.

## Research and feasibility

Every proposed module or forensic tool begins in [`R&D`](./R&D/README.md).
Production implementation starts only after its research record covers forensic
value, source provenance, technical feasibility, privacy, security, legal and
ethical constraints, UX, cost, operations, and a documented go/no-go decision.

The Wallet File Analyzer implementation candidate, available to active investigators
for controlled local and synthetic evaluation, is documented in
[`R&D/studies/wallet-file-analyzer`](./R&D/studies/wallet-file-analyzer). It
classifies supported wallet artifacts in a one-shot browser worker, provides a
30-second explicit credential reveal only for recognized formats and a supplied
known password where required, and can separately query one consented public
address through the existing bounded Blockchain Profiler. It has no wallet-file,
password, or private-key server route, persistence, export, cracking, signing,
broadcast, sweep, or Bitcoin Core database-key extraction path.

## Project demonstration

Use the presenter-ready [`demo/README.md`](./demo/README.md) runbook to prepare
and deliver a ChainRadar demonstration. It covers five distinct projects and
attack vectors across Ethereum, Solana, TRON, Bitcoin, and Monero; maps every
chain-investigation tool to a technically relevant case; and provides exact
public seeds, independent cross-checks, setup, expected results, and truthful
failure handling.

## Post-hack investigation checklist

Authenticated investigators with tool access can open `/checklists`, directly
choose a versioned investigation guide, and privately save or resume progress
without creating a case. The bounded initial catalog contains one general
post-hack workflow and ten specialist workflows; it does not claim to cover
every investigation. Existing case-linked runs remain available for backward
compatibility. The tool stores structured task status, bounded blocker/N/A
reasons, revisions, and two private plain-text task-note fields: what the
investigator found and what work remains. Each note is limited to 4,000
characters. The append-only event history stores a raw-note-free
HMAC-SHA-256 replay fingerprint rather than raw note text. Original evidence, files, credentials,
and custody records remain in an approved external evidence system.

Checklist completion is workflow attestation only. It does not prove an
artifact's authenticity or custody, identify a hacker, guarantee recovery,
satisfy every jurisdiction, or make evidence admissible. Preserve evidence in
an approved external evidence system and use qualified forensic, incident,
legal, and law-enforcement review where applicable.

Validate every versioned template, source reference, summary count, and
canonical digest with `npm run checklists:check`.

## Technical evidence reports

Blockchain Profiler, Wallet Activity Tracer, policy-permitted Address
Intelligence results, and private checklist runs can produce an examiner-authored
technical report. Each report exports the complete normalized result as
canonical JSON, a detached SHA-256 manifest, and a printable derivative with
case/request/authority/custody fields, source provenance, exact finding-basis
references, limitations, independent verification, quality checks, and sign-off.
Reviewed-final status is gated on complete document control and examiner plus
independent-reviewer affirmations.

This is an authentication-ready supporting record, not a guarantee of court
admissibility. Current generic public-provider reports disclose that raw source
responses are not embedded and instruct the examiner to retain independent raw
acquisitions externally. The Seed Investigator retains its stronger bounded raw
artifact package. Seed creation and missing-word recovery remain deliberately
non-exportable to avoid leaking credential material. See the
[technical evidence reporting record](./docs/features/technical-evidence-reporting/README.md)
and run `npm run evidence-report:check`.

## Engineering and thesis documentation

The maintained implementation record starts at [`docs/README.md`](./docs/README.md).
It includes the current feature-status catalog, individual feature records,
architecture and API references, role/privacy boundaries, Docker runbooks,
verification strategy, limitations, development history, and a thesis evidence
register. Run `npm run docs:check` after documentation or feature changes.

## Local stack

The Docker stack starts four services:

- `chainradar`: the Next.js application, bound to localhost only
- `postgres`: private PostgreSQL storage for accounts, sessions, normalized
  profile photos, cases, checklist progress, and tools
- `migrate`: a one-shot schema migration job
- `mailpit`: a local inbox for password-reset and verification messages

Start everything:

```bash
docker compose up --build -d
```

Open:

- App: [http://localhost:3000](http://localhost:3000)
- Local email inbox: [http://localhost:8025](http://localhost:8025)

Create the local administrator by signing up with
`admin@chainradar.local`. There is no default password. Override `ADMIN_EMAIL`
in a local `.env` file to use a different bootstrap address.

Create a normal investigator with any other email. Authenticated investigators
land on `/dashboard`; administrators land on `/admin`.

### Market intelligence

The investigator dashboard loads current global crypto metrics and top assets
from CoinMarketCap, combines them with canonical DeFi TVL history and top
protocols from DeFiLlama, and adds a six-network activity pulse from Blockchair's
fixed multi-chain stats endpoint. Add server-only keys to your untracked `.env`
file:

```text
COINMARKETCAP_API_KEY=replace-with-your-rotated-key
BLOCKCHAIR_API_KEY=replace-with-your-reviewed-key
```

For controlled availability failover, the server also accepts comma-, semicolon-,
or newline-delimited `COINMARKETCAP_API_KEYS`, `BLOCKCHAIR_API_KEYS`,
`ETHERSCAN_API_KEYS`, and `TRONGRID_API_KEYS` pools (maximum eight unique keys
per provider). A pool is for independently authorized credentials under the
same reviewed commercial plan. It is not a mechanism for evading quota or plan
limits. ChainRadar retries only retryable availability/rate/plan failures and
fails closed on integrity, schema, or chain-identity failures.

The keys are passed only to the `chainradar` runtime container. They are not
available to browser JavaScript, Docker builds, or the migration service.
CoinMarketCap and Blockchair are cached for 10 minutes and DeFiLlama for 30
minutes so dashboard traffic does not consume one provider request per user.
Local personal/testing runs may use Blockchair's documented keyless allowance;
beta and production startup require a reviewed key. Provider failures produce
partial or stale context without blocking private cases and tools.

Market and TVL information is contextual research data, not forensic evidence or
financial advice. TVL changes can include token-price movement and should not be
presented as net capital flow.

Check container health and logs:

```bash
docker compose ps
docker compose logs -f chainradar
docker compose logs migrate
```

Stop the local site:

```bash
docker compose down
```

Database data is kept in the `chainradar_postgres` named volume. To remove the
local database as well, run `docker compose down --volumes` only when you
intentionally want to erase local accounts and cases.

## Private beta deployment

The committed local defaults are not an internet deployment. A controlled,
single-host, all-tools private beta uses the fail-closed overlay and operator
preflight:

```bash
npm run deployment:check
docker compose -f compose.yaml -f compose.beta.yaml config --quiet
```

The preflight never prints configured values. It requires production-shaped
authentication, database, SMTP, immutable image-tag, and provider configuration;
live provider behavior and the broader release checklist remain separate gates.
Before building, migrating, or exposing a beta, follow the complete
[private beta runbook](./docs/operations/private-beta.md) and
[release checklist](./docs/operations/release-checklist.md). Wallet Flow Tracer
also requires an explicit accountable administrator activation and approved
investigator allow decision on a fresh database; its migration intentionally
leaves it disabled/default-deny.

For the managed GitHub Student Pack path, use the versioned DigitalOcean App
Platform template and the complete
[DigitalOcean Student Pack deployment runbook](./docs/operations/digitalocean-student-deployment.md).
It selects Managed PostgreSQL, App Platform-managed TLS for an owned `.TECH`
domain, Resend SMTP, external-only Honeybadger uptime checks, and restricted
SQLGate administration. The template is fail-closed and does not remove the
release checklist or the independent gates for privacy-sensitive wallet tools.

## Authentication configuration

Copy `.env.example` to `.env` before any non-local deployment and replace every
secret. Google sign-in is enabled only when both `GOOGLE_CLIENT_ID` and
`GOOGLE_CLIENT_SECRET` are set. Register this local callback URL with Google:

```text
http://localhost:3000/api/auth/callback/google
```

Local email verification is off for quick setup; password-reset messages are
still captured by Mailpit. Enable `AUTH_REQUIRE_EMAIL_VERIFICATION=true` outside
local development.

### Session lifecycle

- Creating or verifying an account does not create an authenticated session.
- A successful email, nickname, or Google sign-in creates a database session and
  an HTTP-only session cookie.
- Signing out removes only the session belonging to that browser; sessions on
  other devices remain active.
- Sessions also end on expiry, password reset, or an administrative account
  disable/role change.

## Case privacy boundary

The product administrator can see account basics, operational counts, case
titles, case status, and tool health. The admin API has no case-content route and
cannot create, edit, join, export, or delete investigator cases. Case titles are
administrative metadata, so investigators should never place secrets in titles.

This is an application-level product boundary. Anyone with infrastructure-level
database or server credentials remains trusted; hiding content from those
operators would require investigator-held encryption keys.

## Run without Docker

```bash
npm install
npm run dev
```

For a non-Docker development server, provide a reachable PostgreSQL database in
`DATABASE_URL`, run `npm run db:migrate`, then run `npm run dev`.
