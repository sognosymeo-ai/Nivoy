"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "probleme", label: "Le problème" },
  { id: "comment", label: "Comment ça marche" },
  { id: "detection", label: "Détection" },
  { id: "tarifs", label: "Tarifs" },
  { id: "faq", label: "FAQ" },
];

export default function Sommaire() {
  const [actif, setActif] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActif(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sommaire de la page"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 xl:flex"
    >
      {sections.map((section) => {
        const estActif = actif === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={estActif ? "true" : undefined}
            className="group flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <span
              aria-hidden="true"
              className={`h-2 w-2 flex-shrink-0 rounded-full transition-colors ${
                estActif ? "bg-indigo-600" : "bg-slate-300 group-hover:bg-slate-400"
              }`}
            />
            <span
              className={`whitespace-nowrap text-xs transition-colors ${
                estActif ? "font-medium text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
              }`}
            >
              {section.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
