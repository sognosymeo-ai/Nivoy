"use client";

import { useState } from "react";

const onglets = [
  {
    id: "jours",
    titre: "Écart de jours",
    description:
      "Jours travaillés (CRA) contre jours facturés. Si l'écart est positif, Nivoy chiffre le montant à vérifier.",
    apercu: {
      badge: "⚠️ 3 jour(s) potentiellement non facturé(s)",
      lignes: ["CRA : 23 jours travaillés", "Facture : 20 jours facturés × 700 €/jour"],
    },
  },
  {
    id: "montant",
    titre: "Écart de chiffre d'affaires",
    description:
      "Montant du CRA (quand détaillé ligne par ligne) contre total HT de la facture. Tout écart est signalé.",
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
    <div className="grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
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

      <div key={onglet.id} className="animate-fadein rounded-2xl border border-amber-200 bg-amber-50 p-6">
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
