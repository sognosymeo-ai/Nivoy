"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const [mode, setMode] = useState<"connexion" | "inscription">("connexion");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [inscriptionReussie, setInscriptionReussie] = useState(false);

  async function handleGoogle() {
    setErreur(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/confirm?next=/app`,
      },
    });
    if (error) {
      setErreur(error.message);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setEnCours(true);

    const supabase = createClient();

    if (mode === "connexion") {
      const { error } = await supabase.auth.signInWithPassword({ email, password: motDePasse });
      if (error) {
        setErreur("Email ou mot de passe incorrect.");
        setEnCours(false);
        return;
      }
      window.location.href = "/app";
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password: motDePasse,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm?next=/app`,
        },
      });
      if (error) {
        setErreur(error.message);
        setEnCours(false);
        return;
      }
      setInscriptionReussie(true);
      setEnCours(false);
    }
  }

  if (inscriptionReussie) {
    return (
      <main id="contenu" className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold">Vérifie ta boîte mail</h1>
          <p className="mt-2 text-sm text-slate-600">
            Un email de confirmation a été envoyé à {email}. Clique sur le lien pour activer ton
            compte.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main id="contenu" className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 block text-center text-lg font-semibold">
          Nivoy
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold">
            {mode === "connexion" ? "Connexion" : "Créer un compte"}
          </h1>

          <button
            type="button"
            onClick={handleGoogle}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path
                fill="#4285F4"
                d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.58-5.17 3.58-8.82Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.07 7.94-2.91l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.1A12 12 0 0 0 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.38l3.99-3.1Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.77c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.28 6.62l3.99 3.1C6.22 6.88 8.87 4.77 12 4.77Z"
              />
            </svg>
            Continuer avec Google
          </button>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">ou</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Mot de passe</label>
              <input
                type="password"
                required
                minLength={6}
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {erreur && <p className="text-sm text-red-600">{erreur}</p>}

            <button
              type="submit"
              disabled={enCours}
              className="w-full rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-40"
            >
              {enCours ? "..." : mode === "connexion" ? "Se connecter" : "S'inscrire"}
            </button>
          </form>

          {mode === "connexion" && (
            <Link
              href="/mot-de-passe-oublie"
              className="mt-4 block rounded text-center text-sm text-slate-500 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Mot de passe oublié ?
            </Link>
          )}

          <button
            onClick={() => setMode(mode === "connexion" ? "inscription" : "connexion")}
            className="mt-4 w-full rounded text-center text-sm text-slate-500 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {mode === "connexion" ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
          </button>
        </div>
      </div>
    </main>
  );
}
