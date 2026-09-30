// Objectif : vérifier que les types publics sont importables.
import { aidCase, rankAidFit } from "../src/index.mjs";
const dossier = aidCase({
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
});
void rankAidFit(dossier, { decide: async () => ({}) });
