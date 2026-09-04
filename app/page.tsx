import Link from "next/link";
import Sommaire from "@/components/Sommaire";
import MockupOutil from "@/components/MockupOutil";
import DetectionTabs from "@/components/DetectionTabs";
import AnimatedNetwork from "@/components/AnimatedNetwork";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  IconUpload,
  IconDocument,
  IconSearch,
  IconCheckCircle,
  IconQuestion,
} from "@/components/Icons";

const etapes = [
  {
    icon: IconUpload,
    titre: "Importer le CRA",
    description: "Votre suivi d'activité, au format CSV.",
  },
  {
    icon: IconDocument,
    titre: "Importer la facture",
    description: "Le PDF envoyé au client.",
  },
  {
    icon: IconSearch,
    titre: "Vérifier le résultat",
    description: "Les écarts potentiels, en clair.",
  },
];

const faq = [
  {
    question: "Mes fichiers sont-ils conservés ?",
    reponse: "Non. L'analyse se fait à la volée, rien n'est stocké.",
  },
  {
    question: "Quels formats sont acceptés ?",
    reponse:
      "CSV (virgule ou point-virgule) pour le CRA, PDF pour la facture. Plusieurs noms de colonnes sont reconnus automatiquement.",
  },
  {
    question: "Nivoy garantit-il un montant ?",
    reponse: "Non. Nivoy signale des écarts à vérifier — jamais un montant certain.",
  },
  {
    question: "Et si l'extraction semble fausse ?",
    reponse: "Un avertissement explicite s'affiche plutôt qu'un résultat erroné en silence.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-xs font-semibold uppercase tracking-widest text-indigo-600">
      {children}
    </p>
  );
}

export default function Accueil() {
  return (
    <main className="bg-white text-slate-900">
      <Sommaire />

      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <span className="flex-shrink-0 text-lg font-semibold">Nivoy</span>
          <div className="flex items-center gap-4 text-sm sm:gap-6">
            <a href="#tarifs" className="hidden text-slate-600 hover:text-slate-900 sm:inline">
              Tarifs
            </a>
            <a href="#faq" className="hidden text-slate-600 hover:text-slate-900 sm:inline">
              FAQ
            </a>
            <Link href="/login" className="hidden text-slate-600 hover:text-slate-900 sm:inline">
              Se connecter
            </Link>
            <Link
              href="/login"
              className="whitespace-nowrap rounded-full bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 sm:px-4"
            >
              <span className="sm:hidden">Commencer</span>
              <span className="hidden sm:inline">Commencer gratuitement</span>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-slate-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-10 h-[420px] w-[420px] rounded-full bg-indigo-300/30 blur-[120px]" />
          <div className="absolute -right-16 bottom-0 h-[320px] w-[320px] rounded-full bg-indigo-200/40 blur-[100px]" />
          <AnimatedNetwork />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center">
          <span className="inline-block rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-xs font-medium text-indigo-700 shadow-sm">
            Pour les ESN facturant en régie
          </span>
          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900">
            Le CRA et la facture racontent-ils vraiment la même histoire&nbsp;?
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600">
            Importez votre CRA et votre facture. Nivoy repère les écarts à vérifier en quelques
            secondes.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/login"
              className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-md"
            >
              Commencer gratuitement
            </Link>
            <a
              href="#comment"
              className="rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md"
            >
              Voir comment ça marche
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-400">Sans carte bancaire.</p>
        </div>
      </section>

      <section id="probleme" className="bg-slate-50 py-24">
        <RevealOnScroll className="mx-auto max-w-3xl px-6">
          <Eyebrow>Le constat</Eyebrow>
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            4 à 5&nbsp;% du chiffre d&apos;affaires jamais facturé
            <sup className="text-sm font-normal text-indigo-600">1</sup>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-600">
            Un jour non facturé passe inaperçu. Répété sur plusieurs missions, l&apos;addition
            devient réelle — sans qu&apos;aucune alerte ne se déclenche.
          </p>

          <div className="mx-auto mt-8 grid max-w-md gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-indigo-600 p-6 text-center text-white transition hover:-translate-y-1 hover:shadow-lg">
              <p className="text-3xl font-bold">200&nbsp;k€</p>
              <p className="mt-1 text-sm text-indigo-100">à 4&nbsp;% de fuite, ESN à 5&nbsp;M€ de CA</p>
            </div>
            <div className="rounded-2xl bg-indigo-600 p-6 text-center text-white transition hover:-translate-y-1 hover:shadow-lg">
              <p className="text-3xl font-bold">250&nbsp;k€</p>
              <p className="mt-1 text-sm text-indigo-100">à 5&nbsp;% de fuite, ESN à 5&nbsp;M€ de CA</p>
            </div>
          </div>

          <div className="mx-auto mt-6 grid max-w-2xl overflow-hidden rounded-2xl border border-slate-200 sm:grid-cols-2">
            <div className="border-b border-slate-200 p-6 text-center sm:border-b-0 sm:border-r">
              <p className="text-xs font-semibold uppercase tracking-wide text-red-500">Sans Nivoy</p>
              <p className="mt-2 text-sm text-slate-600">
                L&apos;écart reste invisible jusqu&apos;au bilan annuel — si quelqu&apos;un le
                remarque.
              </p>
            </div>
            <div className="bg-indigo-50/60 p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Avec Nivoy</p>
              <p className="mt-2 text-sm text-slate-700">
                L&apos;écart est signalé avant l&apos;envoi de la facture, pendant qu&apos;il est
                encore temps de vérifier.
              </p>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-xl text-center text-xs text-slate-400">
            1&nbsp;Benchmarks SPI Research (Service Performance Insight) sur les sociétés de
            services professionnels : 4,05&nbsp;% en 2015, 4,3&nbsp;% en 2016, 4,26&nbsp;% en 2021,
            ~4,5&nbsp;% en 2026. Illustration à partir des moyennes du secteur, pas une estimation
            de vos pertes.
          </p>
        </RevealOnScroll>
      </section>

      <section id="comment" className="py-24">
        <RevealOnScroll className="mx-auto max-w-4xl px-6">
          <Eyebrow>La méthode</Eyebrow>
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Trois étapes, un résultat net
          </h2>
          <div className="mt-10 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {etapes.flatMap((etape, i) => {
              const derniere = i === etapes.length - 1;
              const carte = (
                <div
                  key={`carte-${etape.titre}`}
                  className={`relative overflow-hidden rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-lg ${
                    derniere ? "border-indigo-200 bg-indigo-50/60 shadow-md" : "border-slate-200 bg-white"
                  }`}
                >
                  <span className="pointer-events-none absolute right-4 top-2 text-4xl font-bold text-slate-100">
                    {`0${i + 1}`}
                  </span>
                  <div
                    className={`relative flex h-10 w-10 items-center justify-center rounded-xl ${
                      derniere ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600"
                    }`}
                  >
                    <etape.icon className="h-5 w-5" />
                  </div>
                  <h3 className="relative mt-4 font-semibold">{etape.titre}</h3>
                  <p className="relative mt-1 text-sm text-slate-600">{etape.description}</p>
                </div>
              );
              if (derniere) return [carte];
              return [
                carte,
                <div key={`fleche-${i}`} className="hidden items-center justify-center sm:flex">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    →
                  </span>
                </div>,
              ];
            })}
          </div>
          <p className="mt-10 text-center text-sm text-slate-500">
            Aperçu fidèle du résultat, avec l&apos;exemple de référence :
          </p>
          <div className="mt-4">
            <MockupOutil />
          </div>
        </RevealOnScroll>
      </section>

      <section id="detection" className="bg-slate-50 py-24">
        <RevealOnScroll className="mx-auto max-w-4xl px-6">
          <Eyebrow>La vérification</Eyebrow>
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Deux vérifications, aucune promesse en l&apos;air
          </h2>
          <div className="mt-10">
            <DetectionTabs />
          </div>
        </RevealOnScroll>
      </section>

      <section id="tarifs" className="py-24">
        <RevealOnScroll className="mx-auto max-w-3xl px-6">
          <Eyebrow>Les tarifs</Eyebrow>
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight sm:text-3xl">Un tarif simple</h2>
          <p className="mt-1 text-center text-sm text-slate-500">Tarifs indicatifs.</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="font-semibold">Gratuit</h3>
              <p className="mt-2 text-3xl font-bold">0 €</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {["3 analyses par mois", "Écart de jours", "Écart de chiffre d'affaires"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <IconCheckCircle className="h-4 w-4 flex-shrink-0 text-indigo-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="mt-8 block rounded-full border border-slate-900 px-4 py-2.5 text-center text-sm font-semibold hover:bg-slate-50"
              >
                Commencer
              </Link>
            </div>

            <div className="rounded-2xl bg-indigo-600 p-6 text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-1 hover:shadow-xl">
              <h3 className="font-semibold">Pro</h3>
              <p className="mt-2 text-3xl font-bold">29 € / mois</p>
              <ul className="mt-6 space-y-3 text-sm text-indigo-100">
                {["Analyses illimitées", "Écart de jours", "Écart de chiffre d'affaires", "Support par email"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2">
                      <IconCheckCircle className="h-4 w-4 flex-shrink-0 text-white" />
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
              <Link
                href="/login"
                className="mt-8 block rounded-full bg-white px-4 py-2.5 text-center text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
              >
                Commencer
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <section id="faq" className="bg-slate-50 py-24">
        <RevealOnScroll className="mx-auto max-w-2xl px-6">
          <Eyebrow>Besoin d&apos;aide ?</Eyebrow>
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight sm:text-3xl">Questions fréquentes</h2>
          <div className="mt-10 space-y-5">
            {faq.map((item) => (
              <div
                key={item.question}
                className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <IconQuestion className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-400" />
                <div>
                  <h3 className="font-medium">{item.question}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.reponse}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      <section className="bg-indigo-600 py-20 text-center text-white">
        <h2 className="text-3xl font-bold tracking-tight">Vérifiez votre prochaine mission</h2>
        <p className="mt-2 text-indigo-100">En quelques secondes, sans carte bancaire.</p>
        <div className="mt-8">
          <Link
            href="/login"
            className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-50 hover:shadow-md"
          >
            Commencer gratuitement
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-10">
        <div className="mx-auto max-w-5xl px-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Nivoy
        </div>
      </footer>
    </main>
  );
}
