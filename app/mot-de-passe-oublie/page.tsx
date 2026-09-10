"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function MotDePasseOublie() {
  const [email, setEmail] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoye, setEnvoye] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setEnCours(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/confirm?next=/mot-de-passe-oublie/nouveau`,
    });

    setEnCours(false);
    if (error) {
      setErreur(error.message);
      return;
    }
    setEnvoye(true);
  }

  if (envoye) {
    return (
      <main id="contenu" className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold">Vérifie ta boîte mail</h1>
          <p className="mt-2 text-sm text-slate-600">
            Si un compte existe pour {email}, un lien de réinitialisation vient d&apos;être envoyé.
          </p>
          <Link
            href="/login"
            className="mt-6 block rounded text-sm text-indigo-600 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Retour à la connexion
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="contenu" className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 block rounded text-center text-lg font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
          Nivoy
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold">Mot de passe oublié</h1>
          <p className="mt-1 text-sm text-slate-500">
            On t&apos;envoie un lien pour en choisir un nouveau.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

            {erreur && <p className="text-sm text-red-600">{erreur}</p>}

            <button
              type="submit"
              disabled={enCours}
              className="w-full rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-40"
            >
              {enCours ? "..." : "Envoyer le lien"}
            </button>
          </form>

          <Link
            href="/login"
            className="mt-4 block rounded text-center text-sm text-slate-500 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Retour à la connexion
          </Link>
        </div>
      </div>
    </main>
  );
}
