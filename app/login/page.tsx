"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const [mode, setMode] = useState<"connexion" | "inscription">("connexion");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [inscriptionReussie, setInscriptionReussie] = useState(false);

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
      <main className="mx-auto max-w-sm p-8">
        <h1 className="text-xl font-semibold">Vérifie ta boîte mail</h1>
        <p className="mt-2 text-sm text-gray-600">
          Un email de confirmation a été envoyé à {email}. Clique sur le lien pour activer ton compte.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-sm p-8">
      <h1 className="text-xl font-semibold">
        {mode === "connexion" ? "Connexion" : "Créer un compte"}
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            type="password"
            required
            minLength={6}
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        {erreur && <p className="text-sm text-red-600">{erreur}</p>}

        <button
          type="submit"
          disabled={enCours}
          className="w-full rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          {enCours ? "..." : mode === "connexion" ? "Se connecter" : "S'inscrire"}
        </button>
      </form>

      <button
        onClick={() => setMode(mode === "connexion" ? "inscription" : "connexion")}
        className="mt-4 text-sm text-gray-500 underline"
      >
        {mode === "connexion" ? "Pas encore de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
      </button>
    </main>
  );
}
