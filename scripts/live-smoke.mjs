// Objectif : effectuer un appel Jev synthétique uniquement sur demande explicite.
import { createJevClient } from "../src/jev.mjs";
import { rankAidFit } from "../src/index.mjs";
const client = createJevClient();
const résultat = await rankAidFit({
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
}, client);
console.log(JSON.stringify({ décision: résultat.decision, confiance: résultat.confidence, usage: résultat.usage }, null, 2));
