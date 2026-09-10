import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nivoy.app";
const TITRE = "Nivoy — Le CRA et la facture racontent-ils la même histoire ?";
const DESCRIPTION =
  "Nivoy compare votre CRA et votre facture pour repérer les écarts à vérifier avant l'envoi — pour les ESN facturant en régie.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITRE,
    template: "%s — Nivoy",
  },
  description: DESCRIPTION,
  keywords: ["ESN", "régie", "CRA", "facturation", "détection d'écarts", "revenue recovery"],
  openGraph: {
    title: TITRE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: "Nivoy",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITRE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={GeistSans.variable}>
      <body className="bg-white font-sans text-slate-900 antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-indigo-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
