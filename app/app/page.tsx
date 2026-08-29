"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

function ChampFichier({
  label,
  accept,
  fichier,
  onChange,
}: {
  label: string;
  accept: string;
  fichier: File | null;
  onChange: (fichier: File | null) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <label className="mt-1.5 flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm transition hover:border-indigo-400 hover:bg-indigo-50/40">
        <span className={fichier ? "text-slate-900" : "text-slate-400"}>
          {fichier ? fichier.name : "Choisir un fichier"}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          Parcourir
        </span>
        <input
          type="file"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          className="hidden"
        />
      </label>
    </div>
  );
}

export default function OutilAnalyse() {
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
    <main className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-semibold">
            Nivoy
          </Link>
          {emailUtilisateur && (
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="hidden sm:inline">{emailUtilisateur}</span>
              <button onClick={handleDeconnexion} className="underline hover:text-slate-700">
                Se déconnecter
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-2xl font-bold tracking-tight">Analyser une mission</h1>
        <p className="mt-1 text-sm text-slate-500">
          Importez le CRA et la facture correspondante pour vérifier les écarts potentiels.
        </p>

        <div className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <ChampFichier label="CRA (CSV)" accept=".csv" fichier={craFile} onChange={setCraFile} />
          <ChampFichier
            label="Facture (PDF)"
            accept=".pdf"
            fichier={factureFile}
            onChange={setFactureFile}
          />

          <button
            onClick={handleAnalyser}
            disabled={!craFile || !factureFile || enCours}
            className="w-full rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-40"
          >
            {enCours ? "Analyse en cours..." : "Analyser"}
          </button>
        </div>

        {erreur && (
          <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {erreur}
          </p>
        )}

        {resultat && (() => {
          const ecartJoursDetecte = resultat.ecartJours > 0;
          const ecartMontantDetecte = resultat.ecartMontant?.anomalieDetectee ?? false;
          const aucunEcart = !ecartJoursDetecte && !ecartMontantDetecte;

          return (
            <div className="mt-6 space-y-4">
              {ecartJoursDetecte && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                  <p className="font-semibold text-amber-800">
                    ⚠️ {resultat.ecartJours} jour(s) potentiellement non facturé(s)
                  </p>
                  <p className="mt-1 text-sm text-amber-700">
                    Montant potentiel à vérifier : {resultat.montantPotentiel?.toLocaleString("fr-FR")} €
                  </p>
                  <div className="mt-3 space-y-1 border-t border-amber-200 pt-3 text-sm text-amber-700/80">
                    <p>CRA : {resultat.joursTravailles} jours travaillés</p>
                    <p>
                      Facture : {resultat.joursFactures} jours facturés × {resultat.tjm} €/jour
                    </p>
                  </div>
                </div>
              )}

              {ecartMontantDetecte && resultat.ecartMontant && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                  <p className="font-semibold text-amber-800">
                    ⚠️ Écart de chiffre d&apos;affaires potentiel à vérifier :{" "}
                    {Math.abs(resultat.ecartMontant.ecartMontant).toLocaleString("fr-FR")} €
                  </p>
                  <div className="mt-3 space-y-1 border-t border-amber-200 pt-3 text-sm text-amber-700/80">
                    <p>CRA : {resultat.ecartMontant.montantCra.toLocaleString("fr-FR")} € HT (somme des lignes)</p>
                    <p>Facture : {resultat.ecartMontant.montantFactureHt.toLocaleString("fr-FR")} € HT</p>
                  </div>
                </div>
              )}

              {aucunEcart && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                  <p className="font-semibold text-emerald-800">
                    ✓ Aucun écart détecté entre le CRA et la facture pour cette mission.
                  </p>
                  <div className="mt-3 space-y-1 border-t border-emerald-200 pt-3 text-sm text-emerald-700/80">
                    <p>CRA : {resultat.joursTravailles} jours travaillés</p>
                    <p>
                      Facture : {resultat.joursFactures} jours facturés × {resultat.tjm} €/jour
                    </p>
                  </div>
                </div>
              )}

              {!resultat.coherenceFacture && (
                <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                  ⚠️ Extraction à vérifier : le montant total HT de la facture ne correspond pas
                  exactement à jours × TJM.
                </p>
              )}
            </div>
          );
        })()}
      </div>
    </main>
  );
}
