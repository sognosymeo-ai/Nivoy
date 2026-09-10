"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { IconAlertTriangle, IconCheckCircle, IconSpinner, IconUpload, IconX } from "@/components/Icons";

const TAILLE_MAX_CSV = 5 * 1024 * 1024;
const TAILLE_MAX_PDF = 15 * 1024 * 1024;

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

function formaterTaille(octets: number) {
  if (octets < 1024 * 1024) return `${Math.round(octets / 1024)} Ko`;
  return `${(octets / (1024 * 1024)).toFixed(1)} Mo`;
}

function ChampFichier({
  label,
  accept,
  extension,
  tailleMax,
  fichier,
  onChange,
}: {
  label: string;
  accept: string;
  extension: string;
  tailleMax: number;
  fichier: File | null;
  onChange: (fichier: File | null) => void;
}) {
  const [survole, setSurvole] = useState(false);
  const [erreurLocale, setErreurLocale] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function validerEtDefinir(candidat: File | null) {
    if (!candidat) {
      onChange(null);
      return;
    }
    if (!candidat.name.toLowerCase().endsWith(extension)) {
      setErreurLocale(`Ce fichier doit être un ${extension.toUpperCase()}.`);
      onChange(null);
      return;
    }
    if (candidat.size > tailleMax) {
      setErreurLocale(`Fichier trop volumineux (max ${formaterTaille(tailleMax)}).`);
      onChange(null);
      return;
    }
    setErreurLocale(null);
    onChange(candidat);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setSurvole(true);
        }}
        onDragLeave={() => setSurvole(false)}
        onDrop={(e) => {
          e.preventDefault();
          setSurvole(false);
          validerEtDefinir(e.dataTransfer.files?.[0] ?? null);
        }}
        className={`mt-1.5 flex items-center justify-between gap-3 rounded-xl border border-dashed px-4 py-3 text-sm transition ${
          survole ? "border-indigo-400 bg-indigo-50/60" : "border-slate-300"
        }`}
      >
        {fichier ? (
          <>
            <span className="flex min-w-0 items-center gap-2 text-slate-900">
              <IconUpload aria-hidden="true" className="h-4 w-4 flex-shrink-0 text-indigo-600" />
              <span className="truncate">{fichier.name}</span>
              <span className="flex-shrink-0 text-xs text-slate-400">{formaterTaille(fichier.size)}</span>
            </span>
            <button
              type="button"
              onClick={() => {
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
              aria-label={`Retirer ${fichier.name}`}
              className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <IconX className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <label className="flex w-full cursor-pointer items-center justify-between">
            <span className="text-slate-400">Glissez un fichier ou cliquez pour choisir</span>
            <span className="flex-shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              Parcourir
            </span>
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={(e) => validerEtDefinir(e.target.files?.[0] ?? null)}
              className="hidden"
            />
          </label>
        )}
      </div>
      {erreurLocale && <p className="mt-1.5 text-xs text-red-600">{erreurLocale}</p>}
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

  function handleNouvelleAnalyse() {
    setCraFile(null);
    setFactureFile(null);
    setResultat(null);
    setErreur(null);
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
    <main id="contenu" className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-100 bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
          <Link href="/" className="rounded text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
            Nivoy
          </Link>
          {emailUtilisateur && (
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="hidden sm:inline">{emailUtilisateur}</span>
              <button
                onClick={handleDeconnexion}
                className="rounded underline hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
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
          <ChampFichier
            label="CRA (CSV)"
            accept=".csv"
            extension=".csv"
            tailleMax={TAILLE_MAX_CSV}
            fichier={craFile}
            onChange={setCraFile}
          />
          <ChampFichier
            label="Facture (PDF)"
            accept=".pdf"
            extension=".pdf"
            tailleMax={TAILLE_MAX_PDF}
            fichier={factureFile}
            onChange={setFactureFile}
          />

          <button
            onClick={handleAnalyser}
            disabled={!craFile || !factureFile || enCours}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-40"
          >
            {enCours && <IconSpinner className="h-4 w-4 animate-spin" />}
            {enCours ? "Analyse en cours..." : "Analyser"}
          </button>
        </div>

        <div aria-live="polite">
          {erreur && (
            <p className="mt-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <IconAlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{erreur}</span>
            </p>
          )}

          {resultat && (() => {
            const ecartJoursDetecte = resultat.ecartJours > 0;
            const ecartMontantDetecte = resultat.ecartMontant?.anomalieDetectee ?? false;
            const aucunEcart = !ecartJoursDetecte && !ecartMontantDetecte;

            return (
              <div className="mt-6 animate-fadein space-y-4">
                {ecartJoursDetecte && (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                    <p className="flex items-start gap-2 font-semibold text-amber-800">
                      <IconAlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span>{resultat.ecartJours} jour(s) potentiellement non facturé(s)</span>
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
                    <p className="flex items-start gap-2 font-semibold text-amber-800">
                      <IconAlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span>
                        Écart de chiffre d&apos;affaires potentiel à vérifier :{" "}
                        {Math.abs(resultat.ecartMontant.ecartMontant).toLocaleString("fr-FR")} €
                      </span>
                    </p>
                    <div className="mt-3 space-y-1 border-t border-amber-200 pt-3 text-sm text-amber-700/80">
                      <p>CRA : {resultat.ecartMontant.montantCra.toLocaleString("fr-FR")} € HT (somme des lignes)</p>
                      <p>Facture : {resultat.ecartMontant.montantFactureHt.toLocaleString("fr-FR")} € HT</p>
                    </div>
                  </div>
                )}

                {aucunEcart && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                    <p className="flex items-start gap-2 font-semibold text-emerald-800">
                      <IconCheckCircle aria-hidden="true" className="mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span>Aucun écart détecté entre le CRA et la facture pour cette mission.</span>
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
                  <p className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                    <IconAlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" />
                    <span>
                      Extraction à vérifier : le montant total HT de la facture ne correspond pas
                      exactement à jours × TJM.
                    </span>
                  </p>
                )}

                <button
                  onClick={handleNouvelleAnalyse}
                  className="w-full rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                  Nouvelle analyse
                </button>
              </div>
            );
          })()}
        </div>
      </div>
    </main>
  );
}
