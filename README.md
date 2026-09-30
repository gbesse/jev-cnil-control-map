# Jev CNIL Control Map

**Relie les motifs publics de sanctions CNIL aux écarts possibles des contrôles de protection des données.**

[![Tests](https://github.com/gbesse/jev-cnil-control-map/actions/workflows/test.yml/badge.svg)](https://github.com/gbesse/jev-cnil-control-map/actions/workflows/test.yml) [MIT](LICENSE) · Node.js 22+ · v0.1.3 · Documentation française

Le moteur compare le raisonnement sourcé d’une décision CNIL à un contrôle interne et à ses preuves pour préparer une file de revue d’audit.

## Démarrage rapide

```sh
git clone https://github.com/gbesse/jev-cnil-control-map.git
cd jev-cnil-control-map
npm install
npm run demo
```

La démonstration utilise uniquement des données et probabilités synthétiques. Elle n’effectue aucun appel réseau et ne constitue pas une mesure de qualité de Jev.

## Exemple exécutable

Cet exemple compare un motif de sanction CNIL à une preuve de contrôle. Il utilise un fournisseur Jev simulé : aucune clé API ni connexion réseau n’est nécessaire. L’assertion intégrée fait échouer la commande si le comportement attendu change.

Le code complet de [`examples/demo.mjs`](examples/demo.mjs) est directement copiable :

```js
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
```

Lancez-le avec :

```sh
npm run demo:principal
```

Résultat à repérer : `mapping: partially_addressed`.

### Cas limite à tester

Même avec un résultat incertain, la sortie reste une revue et jamais un avis juridique. Le code se trouve dans [`examples/cas-limite.mjs`](examples/cas-limite.mjs).

```sh
npm run demo:limite
```

Résultat à repérer : `review: true · legalAdvice: false`. La commande `npm run demo` exécute les deux exemples.

## Utilisation de la bibliothèque

Importez les fonctions métier depuis `@gbesse/jev-cnil-control-map`. Fournissez soit `createJevClient()` depuis l’export `./jev`, soit `createFakeProvider()` pour les tests hors ligne.

Les noms de l’API JavaScript restent stables pour préserver la compatibilité avec les versions précédentes. La documentation, les exemples et les explications destinées aux utilisateurs sont en français.

## Frontière de décision

Les références, dates, traitements et responsables restent dans le code. Jev compare seulement le motif et le contrôle fournis. La sortie ne constitue jamais un conseil juridique.

La question exacte envoyée à Jev est versionnée dans [`src/index.mjs`](src/index.mjs). Les identifiants, dates, calculs, filtres, seuils et transitions d’état restent gérés par du code ordinaire.

## Sources

- [https://www.data.gouv.fr/datasets/sanctions-proncees-par-la-cnil](https://www.data.gouv.fr/datasets/sanctions-proncees-par-la-cnil)
- [https://www.legifrance.gouv.fr](https://www.legifrance.gouv.fr)

Conservez l’attribution amont, les identifiants d’origine, les URL de source et les dates de récupération avec chaque enregistrement dérivé.

## Appels Jev réels

Les appels réels sont facultatifs et payants. Le client fixe le modèle `jev-1.13.0`, valide l’identité du modèle et toutes les probabilités, refuse les redirections, ne retente que les erreurs réseau et les réponses HTTP 429/529, puis bloque les requêtes dépassant une estimation prudente de 24 000 jetons.

```sh
TYPESAFE_API_KEY=... node scripts/live-smoke.mjs
```

N’envoyez jamais de secret, de donnée personnelle ni de dossier sensible non expurgé. Évaluez le comportement sur un jeu représentatif de cas français avant tout usage opérationnel.

## Validation

```sh
npm run check
npm run typecheck
npm test
npm run demo
```

La CI exécute ces vérifications sous Node.js 22 et 24.

Projet indépendant, sans affiliation avec TypeSafe AI ni avec l’administration française. Consultez la [documentation de l’API Jev](https://docs.typesafe.ai/api) et les [limites du modèle](https://docs.typesafe.ai/model-jaggedness/jev-1.13).
