"use client";

import { useState } from "react";
import Link from "next/link";
import { IconMenu, IconX } from "@/components/Icons";

export default function MobileMenu() {
  const [ouvert, setOuvert] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOuvert(!ouvert)}
        aria-expanded={ouvert}
        aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
        className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        {ouvert ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
      </button>

      {ouvert && (
        <div className="absolute inset-x-0 top-full border-b border-slate-100 bg-white px-6 py-4 shadow-sm">
          <nav className="flex flex-col gap-1 text-sm">
            <a
              href="#tarifs"
              onClick={() => setOuvert(false)}
              className="rounded-lg px-3 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
            >
              Tarifs
            </a>
            <a
              href="#faq"
              onClick={() => setOuvert(false)}
              className="rounded-lg px-3 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
            >
              FAQ
            </a>
            <Link
              href="/login"
              onClick={() => setOuvert(false)}
              className="rounded-lg px-3 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
            >
              Se connecter
            </Link>
            <Link
              href="/login"
              onClick={() => setOuvert(false)}
              className="mt-2 rounded-full bg-indigo-600 px-3 py-2.5 text-center font-semibold text-white hover:bg-indigo-500"
            >
              Commencer gratuitement
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
