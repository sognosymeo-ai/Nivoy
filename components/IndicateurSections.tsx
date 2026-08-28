"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "constat", label: "Le constat" },
  { id: "pourquoi", label: "Pourquoi ça passe inaperçu" },
  { id: "comment-ca-marche", label: "Comment ça marche" },
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
    <div className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-label={section.label}
          title={section.label}
          className={`h-2 w-2 rounded-full transition-colors ${
            sectionActive === section.id ? "bg-indigo-600" : "bg-gray-300 hover:bg-gray-400"
          }`}
        />
      ))}
    </div>
  );
}
