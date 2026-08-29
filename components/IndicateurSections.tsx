"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "constat", label: "Le constat" },
  { id: "pourquoi", label: "Pourquoi ça passe inaperçu" },
  { id: "comment-ca-marche", label: "Comment ça marche" },
  { id: "demo", label: "Voir l'outil" },
  { id: "detection", label: "Ce que Nivoy détecte" },
  { id: "exemple", label: "Exemple illustratif" },
  { id: "tarifs", label: "Tarifs" },
  { id: "faq", label: "Questions fréquentes" },
];

export default function IndicateurSections() {
  const [sectionActive, setSectionActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionActive(entry.target.id);
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
    <div className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 xl:flex">
      {sections.map((section) => {
        const active = sectionActive === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-3"
          >
            <span
              className={`h-2 w-2 flex-shrink-0 rounded-full transition-colors ${
                active ? "bg-indigo-600" : "bg-slate-300 group-hover:bg-slate-400"
              }`}
            />
            <span
              className={`whitespace-nowrap text-xs transition-colors ${
                active ? "font-medium text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
              }`}
            >
              {section.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
