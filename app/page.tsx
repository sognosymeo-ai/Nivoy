"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface EcartMontant {
  montantCra: number;
  montantFactureHt: number;
  ecartMontant: number;
  anomalieDetectee: boolean;
}

interface ResultatApi {
  joursTravailles: number;
  joursFactures: number;
  tjm: number;
  ecartJours: number;
  montantPotentiel: number | null;
  coherenceFacture: boolean;
  montantTotalHt: number;
  ecartMontant: EcartMontant | null;
}

export default function Home() {
  const [craFile, setCraFile] = useState<File | null>(null);
  const [factureFile, setFactureFile] = useState<File | null>(null);
  const [enCours, setEnCours] = useState(false);
  const [resultat, setResultat] = useState<ResultatApi | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [emailUtilisateur, setEmailUtilisateur] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setEmailUtilisateur(data.user?.email ?? null);
    });
  }, []);

  async function handleDeconnexion() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  async function handleAnalyser() {
    if (!craFile || !factureFile) return;

    setEnCours(true);
    setErreur(null);
    setResultat(null);

    try {
      const formData = new FormData();
      formData.append("cra", craFile);
      formData.append("facture", factureFile);

      const reponse = await fetch("/api/analyser", { method: "POST", body: formData });
      const data = await reponse.json();

      if (!reponse.ok) {
        setErreur(data.error ?? "Une erreur est survenue.");
      } else {
        setResultat(data);
      }
    } catch {
      setErreur("Une erreur est survenue pendant l'analyse.");
    } finally {
      setEnCours(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Analyser une mission</h1>
        {emailUtilisateur && (
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{emailUtilisateur}</span>
            <button onClick={handleDeconnexion} className="underline">
              Se déconnecter
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">CRA (CSV)</label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setCraFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Facture (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFactureFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full text-sm"
          />
        </div>

        <button
          onClick={handleAnalyser}
          disabled={!craFile || !factureFile || enCours}
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          {enCours ? "Analyse en cours..." : "Analyser"}
        </button>
      </div>

      {erreur && <p className="mt-6 text-sm text-red-600">{erreur}</p>}

      {resultat && (() => {
        const ecartJoursDetecte = resultat.ecartJours > 0;
        const ecartMontantDetecte = resultat.ecartMontant?.anomalieDetectee ?? false;
        const aucunEcart = !ecartJoursDetecte && !ecartMontantDetecte;

        return (
          <div className="mt-6 rounded border border-gray-200 p-4">
            {ecartJoursDetecte && (
              <div>
                <p className="font-medium">
                  ⚠️ {resultat.ecartJours} jour(s) potentiellement non facturé(s)
                </p>
                <p className="mt-1 text-gray-700">
                  Montant potentiel à vérifier : {resultat.montantPotentiel?.toLocaleString("fr-FR")} €
                </p>
                <div className="mt-2 space-y-1 text-sm text-gray-500">
                  <p>CRA : {resultat.joursTravailles} jours travaillés</p>
                  <p>
                    Facture : {resultat.joursFactures} jours facturés × {resultat.tjm} €/jour
                  </p>
                </div>
              </div>
            )}

            {ecartMontantDetecte && resultat.ecartMontant && (
              <div className={ecartJoursDetecte ? "mt-4 border-t border-gray-200 pt-4" : ""}>
                <p className="font-medium">
                  ⚠️ Écart de chiffre d&apos;affaires potentiel à vérifier :{" "}
                  {Math.abs(resultat.ecartMontant.ecartMontant).toLocaleString("fr-FR")} €
                </p>
                <div className="mt-2 space-y-1 text-sm text-gray-500">
                  <p>CRA : {resultat.ecartMontant.montantCra.toLocaleString("fr-FR")} € HT (somme des lignes)</p>
                  <p>Facture : {resultat.ecartMontant.montantFactureHt.toLocaleString("fr-FR")} € HT</p>
                </div>
              </div>
            )}

            {aucunEcart && (
              <div>
                <p>Aucun écart détecté entre le CRA et la facture pour cette mission.</p>
                <div className="mt-2 space-y-1 text-sm text-gray-500">
                  <p>CRA : {resultat.joursTravailles} jours travaillés</p>
                  <p>
                    Facture : {resultat.joursFactures} jours facturés × {resultat.tjm} €/jour
                  </p>
                </div>
              </div>
            )}

            {!resultat.coherenceFacture && (
              <p className="mt-4 text-sm text-amber-600">
                ⚠️ Extraction à vérifier : le montant total HT de la facture ne correspond pas exactement
                à jours × TJM.
              </p>
            )}
          </div>
        );
      })()}
    </main>
  );
}
