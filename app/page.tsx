import Link from "next/link";
import IndicateurSections from "@/components/IndicateurSections";
import MockupOutil from "@/components/MockupOutil";
import DetectionTabs from "@/components/DetectionTabs";

const etapes = [
  {
    numero: "1",
    titre: "Importer le CRA",
    description: "Le compte-rendu d'activité au format CSV, tel que vous le suivez déjà.",
  },
  {
    numero: "2",
    titre: "Importer la facture",
    description: "Le PDF de la facture envoyée au client. Nivoy en extrait les montants clés.",
  },
  {
    numero: "3",
    titre: "Vérifier le résultat",
    description: "Les écarts potentiels sont affichés avec le détail, prêts à être vérifiés.",
  },
];

const faq = [
  {
    question: "Mes fichiers sont-ils conservés ?",
    reponse:
      "Non. L'analyse se fait à la volée : vos fichiers ne sont ni stockés ni réutilisés au-delà du traitement de votre demande.",
  },
  {
    question: "Quels formats de fichiers sont acceptés ?",
    reponse:
      "Un CRA au format CSV (virgule ou point-virgule) et une facture au format PDF. Plusieurs variantes de nom de colonnes sont reconnues automatiquement.",
  },
  {
    question: "Nivoy calcule-t-il un montant garanti ?",
    reponse:
      "Non. Nivoy signale des écarts potentiels à vérifier manuellement — jamais un montant certain. C'est un outil d'aide à la détection, pas un audit automatique.",
  },
  {
    question: "Que se passe-t-il si l'extraction de la facture semble incorrecte ?",
    reponse:
      "Nivoy vérifie la cohérence des montants extraits et affiche un avertissement explicite si quelque chose ne correspond pas, plutôt que d'afficher un résultat erroné en silence.",
  },
];

const noeuds: [number, number][] = [
  [120, 80],
  [300, 170],
  [520, 90],
  [680, 220],
  [260, 360],
  [480, 400],
];

const liaisons: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 4],
  [2, 3],
  [4, 5],
  [5, 3],
];

function FondHero() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 top-10 h-[400px] w-[400px] rounded-full bg-indigo-200/30 blur-[120px]" />
      <div className="absolute -right-16 bottom-0 h-[300px] w-[300px] rounded-full bg-indigo-100/50 blur-[100px]" />
      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox="0 0 800 500"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="#6366f1" strokeOpacity="0.15">
          {liaisons.map(([a, b], i) => {
            const [x1, y1] = noeuds[a];
            const [x2, y2] = noeuds[b];
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
        {noeuds.map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={5}
            fill="#4f46e5"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.3}s`, animationDuration: "3s" }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function Accueil() {
  return (
    <main className="bg-white text-slate-900">
      <IndicateurSections />

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

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-slate-50">
        <FondHero />
        <div className="relative mx-auto max-w-3xl px-6 py-32 text-center">
          <span className="inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
            Pour les ESN facturant en régie
          </span>
          <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-slate-900">
            Le CRA et la facture racontent-ils vraiment la même histoire&nbsp;?
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600">
            Nivoy compare automatiquement les jours travaillés et le chiffre d&apos;affaires
            facturé, et signale les écarts potentiels à vérifier — avant qu&apos;ils ne passent
            inaperçus.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/login"
              className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Commencer gratuitement
            </Link>
            <a
              href="#comment-ca-marche"
              className="rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Voir comment ça marche
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-400">Sans carte bancaire.</p>
        </div>
      </section>

      <section id="constat" className="bg-slate-50 py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Le constat
          </h2>
          <p className="mt-4 text-center text-3xl font-bold tracking-tight">
            Les sociétés de services déclarent en moyenne 4 à 5&nbsp;% de chiffre d&apos;affaires
            jamais facturé<sup className="text-base font-normal text-indigo-600">1</sup>.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-600">
            Ce &laquo;&nbsp;revenue leakage&nbsp;&raquo; inclut notamment les erreurs de
            facturation, les heures ou jours non facturés, et les écarts entre le travail réalisé
            et la facturation — exactement la catégorie que Nivoy aide à identifier.
          </p>

          <div className="mx-auto mt-10 grid max-w-md gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-indigo-600">200&nbsp;k€</p>
              <p className="mt-1 text-sm text-slate-500">
                à 4&nbsp;% de fuite, pour une ESN à 5&nbsp;M€ de CA annuel
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-3xl font-bold text-indigo-600">250&nbsp;k€</p>
              <p className="mt-1 text-sm text-slate-500">
                à 5&nbsp;% de fuite, pour une ESN à 5&nbsp;M€ de CA annuel
              </p>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">
            Illustration à partir des taux moyens déclarés par le secteur — pas une estimation de
            vos propres pertes.
          </p>
          <p className="mx-auto mt-8 max-w-xl text-center text-xs text-slate-400">
            1&nbsp;Benchmarks du cabinet Service Performance Insight (SPI Research) sur les
            sociétés de services professionnels : 4,05&nbsp;% en 2015, 4,3&nbsp;% en 2016, 4,26&nbsp;%
            en 2021, environ 4,5&nbsp;% sur le benchmark 2026.
          </p>
        </div>
      </section>

      <section id="pourquoi" className="py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Pourquoi ça passe inaperçu
          </h2>
          <p className="mt-4 text-center text-3xl font-bold tracking-tight">
            Un écart d&apos;un ou deux jours ne saute pas aux yeux. Répété chaque mois, il pèse.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-600">
            Un jour non facturé au TJM, ça reste un montant modeste isolément. Multiplié par
            plusieurs consultants et plusieurs mois, l&apos;addition peut devenir significative —
            sans qu&apos;aucune alerte ne se déclenche, puisque personne ne compare
            systématiquement les deux documents.
          </p>
        </div>
      </section>

      <section id="comment-ca-marche" className="bg-slate-50 py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Comment ça marche
          </h2>
          <p className="mt-4 text-center text-3xl font-bold tracking-tight">
            Trois étapes, quelques secondes
          </p>

          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {etapes.map((etape) => (
              <div key={etape.numero} className="text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white shadow-sm">
                  {etape.numero}
                </div>
                <h3 className="mt-4 font-semibold">{etape.titre}</h3>
                <p className="mt-2 text-sm text-slate-600">{etape.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Voir l&apos;outil
          </h2>
          <p className="mt-4 text-center text-3xl font-bold tracking-tight">
            Un résultat clair, en un coup d&apos;œil
          </p>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-600">
            Voici à quoi ressemble Nivoy une fois le CRA et la facture importés — reproduction
            fidèle de l&apos;interface réelle, avec l&apos;exemple de référence.
          </p>

          <div className="mt-12">
            <MockupOutil />
          </div>
        </div>
      </section>

      <section id="detection" className="bg-slate-50 py-28">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Ce que Nivoy détecte
          </h2>
          <p className="mt-4 text-center text-3xl font-bold tracking-tight">
            Deux vérifications, pas de fausse promesse
          </p>

          <DetectionTabs />
        </div>
      </section>

      <section id="exemple" className="py-28">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Exemple illustratif
          </h2>
          <p className="mt-4 text-center text-3xl font-bold tracking-tight">
            23 jours travaillés, 20 jours facturés
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>CRA</span>
              <span>23 jours travaillés</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
              <span>Facture</span>
              <span>20 jours facturés × 700 €/jour</span>
            </div>
            <div className="mt-6 border-t border-slate-100 pt-6">
              <p className="font-medium text-amber-600">⚠️ 3 jour(s) potentiellement non facturé(s)</p>
              <p className="mt-1 text-sm text-slate-600">Montant potentiel à vérifier : 2 100 €</p>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">
            Exemple à but illustratif — pas un cas réel.
          </p>
        </div>
      </section>

      <section id="tarifs" className="bg-slate-50 py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight">Tarifs</h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Tarifs indicatifs, susceptibles d&apos;évoluer.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h3 className="font-semibold">Gratuit</h3>
              <p className="mt-2 text-3xl font-bold">0 €</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li>3 analyses par mois</li>
                <li>Détection des écarts de jours</li>
                <li>Détection des écarts de chiffre d&apos;affaires</li>
              </ul>
              <Link
                href="/login"
                className="mt-8 block rounded-full border border-slate-900 px-4 py-2.5 text-center text-sm font-semibold hover:bg-slate-50"
              >
                Commencer
              </Link>
            </div>

            <div className="rounded-2xl border-2 border-indigo-600 bg-white p-8 shadow-sm">
              <h3 className="font-semibold">Pro</h3>
              <p className="mt-2 text-3xl font-bold">29 € / mois</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li>Analyses illimitées</li>
                <li>Détection des écarts de jours</li>
                <li>Détection des écarts de chiffre d&apos;affaires</li>
                <li>Support par email</li>
              </ul>
              <Link
                href="/login"
                className="mt-8 block rounded-full bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-28">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight">Questions fréquentes</h2>
          <div className="mt-10 space-y-6">
            {faq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="font-medium">{item.question}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.reponse}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Vérifiez votre prochaine mission en quelques secondes
        </h2>
        <div className="mt-8">
          <Link
            href="/login"
            className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
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
