// Garde-fou : une correspondance CNIL reste obligatoirement soumise à revue humaine.
import assert from "node:assert/strict";
import { mapControl } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";

const jev = createFakeProvider(() => ({
  model: "jev-1.13.0",
  answers: {
    mapping: {
      type: "choice",
      choice: "unclear",
      probabilities: {
        addressed: 0.05,
        partially_addressed: 0.1,
        analogous_gap: 0.1,
        not_applicable: 0.05,
        unclear: 0.7,
      },
      confidence: 0.7,
    },
  },
  usage: { input_tokens: 40, output_tokens: 0 },
}));
const resultat = await mapControl(
  {
    reference: "SAN-2",
    date: "2026-01-01",
    reasoning: "Motif incomplet",
    sourceUrl: "https://legifrance.gouv.fr",
  },
  { id: "ctl-2", processingId: "crm", description: "Contrôle à documenter" },
  jev,
);
assert.equal(resultat.review, true);
assert.equal(resultat.legalAdvice, false);
console.log(JSON.stringify(resultat, null, 2));
