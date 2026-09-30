// Objectif : montrer une décision sémantique avec des données entièrement synthétiques.
import assert from "node:assert/strict";
import { rankAidFit } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = {
  "id": "exemple-1",
  "text": "Rénovation énergétique de l’école communale avec isolation, pompe à chaleur et calendrier voté.",
  "source": {
    "url": "https://example.test/donnee-source",
    "date": "2026-09-15"
  },
  "details": {
    "territoire": "Commune Exemple",
    "origine": "donnée synthétique"
  }
};
const provider = createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "strong_match", probabilities: {
  "strong_match": 0.85,
  "possible_match": 0.05,
  "weak_match": 0.05,
  "out_of_scope": 0.05
}, confidence: 0.85 } }, usage: { input_tokens: 120, output_tokens: 0 } }));
const résultat = await rankAidFit(dossier, provider);
assert.equal(résultat.decision, "strong_match");
assert.equal(provider.calls, 1);
console.log(`Décision : ${résultat.label} · probabilité : ${résultat.probability}`);
