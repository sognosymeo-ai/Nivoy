"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function NouveauMotDePasse() {
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [reussi, setReussi] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);

    if (motDePasse !== confirmation) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }

    setEnCours(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: motDePasse });
    setEnCours(false);

    if (error) {
      setErreur(error.message);
      return;
    }
    setReussi(true);
    setTimeout(() => {
      window.location.href = "/app";
    }, 1500);
  }

  if (reussi) {
    return (
      <main id="contenu" className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold">Mot de passe mis à jour</h1>
          <p className="mt-2 text-sm text-slate-600">Redirection en cours...</p>
        </div>
      </main>
    );
  }

  return (
    <main id="contenu" className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm">
        <span className="mb-8 block text-center text-lg font-semibold">Nivoy</span>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold">Choisir un nouveau mot de passe</h1>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Nouveau mot de passe</label>
              <input
                type="password"
                required
                minLength={6}
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Confirmer le mot de passe</label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {erreur && <p className="text-sm text-red-600">{erreur}</p>}

            <button
              type="submit"
              disabled={enCours}
              className="w-full rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-40"
            >
              {enCours ? "..." : "Mettre à jour"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
