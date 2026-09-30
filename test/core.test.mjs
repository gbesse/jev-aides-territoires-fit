// Objectif : vérifier la normalisation, la règle déterministe et la décision sémantique.
import test from "node:test";
import assert from "node:assert/strict";
import { aidCase, rankAidFit } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const edge = {
  "id": "limite-1",
  "text": "Cas synthétique traité par une règle déterministe avant toute analyse sémantique.",
  "source": {
    "url": "https://example.test/cas-limite",
    "date": "2026-09-16"
  },
  "aidStatus": "closed"
};
test("exige une source", () => assert.throws(() => aidCase({ id: "x", text: "y" }), /source/));
test("applique le cas limite sans appel Jev", async () => { const provider = createFakeProvider(() => { throw new Error("appel interdit"); }); assert.equal((await rankAidFit(edge, provider)).decision, "out_of_scope"); assert.equal(provider.calls, 0); });
test("classe un dossier sourcé", async () => { const provider = createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "strong_match", probabilities: {
  "strong_match": 0.85,
  "possible_match": 0.05,
  "weak_match": 0.05,
  "out_of_scope": 0.05
}, confidence: 0.85 } }, usage: { input_tokens: 10, output_tokens: 0 } })); const result = await rankAidFit({
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
}, provider); assert.equal(result.decision, "strong_match"); assert.equal(result.review, false); });
