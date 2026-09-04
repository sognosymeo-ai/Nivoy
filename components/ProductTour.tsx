"use client";

import { useEffect, useRef, useState } from "react";

export interface Onglet {
  id: string;
  label: string;
  icon: React.ReactNode;
  contenu: React.ReactNode;
}

export default function ProductTour({ onglets }: { onglets: Onglet[] }) {
  const [actif, setActif] = useState(onglets[0].id);
  const panneau = onglets.find((o) => o.id === actif)!;
  const dernierScroll = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    function handleWheel(e: WheelEvent) {
      const maintenant = Date.now();
      if (maintenant - dernierScroll.current < 400) return;
      if (Math.abs(e.deltaY) < 10) return;

      if (e.cancelable) e.preventDefault();
      dernierScroll.current = maintenant;

      setActif((actifCourant) => {
        const indexActuel = onglets.findIndex((o) => o.id === actifCourant);
        const direction = e.deltaY > 0 ? 1 : -1;
        const prochainIndex = Math.min(Math.max(indexActuel + direction, 0), onglets.length - 1);
        return onglets[prochainIndex].id;
      });
    }

    nav.addEventListener("wheel", handleWheel, { passive: false });
    return () => nav.removeEventListener("wheel", handleWheel);
  }, [onglets]);

  return (
    <div className="mx-auto max-w-5xl px-6">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <nav
          ref={navRef}
          className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {onglets.map((o) => {
            const estActif = o.id === actif;
            return (
              <button
                key={o.id}
                onClick={() => setActif(o.id)}
                className={`flex flex-shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-left text-sm font-medium transition [&_svg]:h-4 [&_svg]:w-4 [&_svg]:flex-shrink-0 ${
                  estActif
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
                }`}
              >
                {o.icon}
                {o.label}
              </button>
            );
          })}
        </nav>

        <div
          key={actif}
          className="animate-fadein rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 sm:p-10"
        >
          {panneau.contenu}
        </div>
      </div>
    </div>
  );
}
