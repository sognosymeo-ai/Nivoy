"use client";

import { useState } from "react";

const onglets = [
  {
    id: "jours",
    titre: "Écart de jours",
    description:
      "Nivoy compare le nombre de jours travaillés (CRA) au nombre de jours facturés. Si vous avez travaillé plus que ce qui a été facturé, l'écart et le montant potentiel sont signalés.",
    apercu: {
      badge: "⚠️ 3 jour(s) potentiellement non facturé(s)",
      lignes: ["CRA : 23 jours travaillés", "Facture : 20 jours facturés × 700 €/jour"],
    },
  },
  {
    id: "montant",
    titre: "Écart de chiffre d'affaires",
    description:
      "Quand votre CRA détaille un montant par ligne, Nivoy le compare au total HT de la facture. Toute différence — dans un sens ou dans l'autre — est signalée pour vérification.",
    apercu: {
      badge: "⚠️ Écart de chiffre d'affaires potentiel à vérifier : 3 400 €",
      lignes: ["CRA : 6 450 € HT (somme des lignes)", "Facture : 9 850 € HT"],
    },
  },
];

export default function DetectionTabs() {
  const [actif, setActif] = useState(onglets[0].id);
  const onglet = onglets.find((o) => o.id === actif)!;

  return (
    <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <div className="inline-flex rounded-full border border-slate-200 bg-white p-1">
          {onglets.map((o) => (
            <button
              key={o.id}
              onClick={() => setActif(o.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                actif === o.id ? "bg-indigo-600 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {o.titre}
            </button>
          ))}
        </div>
        <p className="mt-6 text-slate-600">{onglet.description}</p>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <p className="text-sm font-semibold text-amber-800">{onglet.apercu.badge}</p>
        <div className="mt-3 space-y-0.5 border-t border-amber-200 pt-3 text-xs text-amber-700/80">
          {onglet.apercu.lignes.map((ligne) => (
            <p key={ligne}>{ligne}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
