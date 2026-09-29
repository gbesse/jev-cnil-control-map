# Jev CNIL Control Map

**Map public CNIL sanction reasoning to reviewable privacy-control gaps without producing legal conclusions.**

[![Tests](https://github.com/gbesse/jev-cnil-control-map/actions/workflows/test.yml/badge.svg)](https://github.com/gbesse/jev-cnil-control-map/actions/workflows/test.yml) [MIT](LICENSE) · Node.js 22+ · Public alpha

## Try it

```sh
git clone https://github.com/gbesse/jev-cnil-control-map.git
cd jev-cnil-control-map
npm install
npm run demo
```

The demo uses synthetic records and fixture probabilities. It makes no network call and makes no measured quality claim.

## Decision boundary

Decision references, dates, processing identifiers and control ownership stay in code. Jev compares supplied reasoning with one control and its evidence. Outputs are audit prompts, never legal advice.

## Upstream sources

- [https://www.data.gouv.fr/datasets/sanctions-proncees-par-la-cnil](https://www.data.gouv.fr/datasets/sanctions-proncees-par-la-cnil)
- [https://www.legifrance.gouv.fr](https://www.legifrance.gouv.fr)

Keep upstream attribution, original identifiers, source URLs and retrieval dates with derived records.

## Real Jev requests

Real requests are opt-in and paid. The client pins `jev-1.13.0`, validates model identity and probabilities, rejects redirects, retries only network failures plus HTTP 429/529, and refuses state above a conservative 24,000-token estimate.

```sh
TYPESAFE_API_KEY=... node scripts/live-smoke.mjs
```

Never send secrets, personal data or unredacted case files. Evaluate representative French labels before operational use.

## Validation

`npm run validate` runs syntax checks, strict public-type checks, tests and the offline demo. CI runs it on Node.js 22 and 24.

Independent project; not affiliated with TypeSafe AI or the French administration. See the [Jev API documentation](https://docs.typesafe.ai/api) and [model limitations](https://docs.typesafe.ai/model-jaggedness/jev-1.13).
