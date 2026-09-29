// Objectif : démontrer la frontière de décision sans appel réseau.
import assert from "node:assert/strict";
import { mapControl } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const p = createFakeProvider(() => ({
  model: "jev-1.13.0",
  answers: {
    mapping: {
      type: "choice",
      choice: "partially_addressed",
      probabilities: {
        addressed: 0.15,
        partially_addressed: 0.68,
        analogous_gap: 0.1,
        not_applicable: 0.02,
        unclear: 0.05,
      },
      confidence: 0.68,
    },
  },
  usage: {},
}));
const resultat = await mapControl(
  {
    reference: "SAN-SYNTHETIC",
    date: "2026-01-01",
    reasoning: "Information insuffisante sur la durée de conservation.",
    articles: ["RGPD-13"],
    sourceUrl: "https://legifrance.gouv.fr",
  },
  {
    id: "ctl-1",
    processingId: "crm",
    description: "Notice d'information CRM",
    evidence: ["Notice publiée"],
    owner: "DPO",
  },
  p,
);
assert.equal(resultat.mapping, "partially_addressed");
console.log(JSON.stringify(resultat, null, 2));
