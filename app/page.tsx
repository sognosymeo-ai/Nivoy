import Link from "next/link";

const detections = [
  {
    titre: "Écart de jours",
    description:
      "Nivoy compare le nombre de jours travaillés (CRA) au nombre de jours facturés. Si vous avez travaillé plus que ce qui a été facturé, l'écart et le montant potentiel sont signalés.",
  },
  {
    titre: "Écart de chiffre d'affaires",
    description:
      "Quand votre CRA détaille un montant par ligne, Nivoy le compare au total HT de la facture. Toute différence — dans un sens ou dans l'autre — est signalée pour vérification.",
  },
];

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

export default function Accueil() {
  return (
    <main className="bg-white text-gray-900">
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold">Nivoy</span>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#tarifs" className="text-gray-600 hover:text-gray-900">
              Tarifs
            </a>
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Se connecter
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500"
            >
              Commencer gratuitement
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Le CRA et la facture racontent-ils vraiment la même histoire ?
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600">
          Pour les ESN facturant en régie : Nivoy compare automatiquement les jours travaillés et
          le chiffre d&apos;affaires facturé, et signale les écarts potentiels à vérifier — avant
          qu&apos;ils ne passent inaperçus.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Commencer gratuitement
          </Link>
          <a href="#comment-ca-marche" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Voir comment ça marche →
          </a>
        </div>
        <p className="mt-4 text-xs text-gray-400">Sans carte bancaire.</p>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Le constat
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold">
            Les sociétés de services déclarent en moyenne 4 à 5 % de chiffre d&apos;affaires
            jamais facturé.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-center text-gray-600">
            Selon les benchmarks du cabinet SPI Research (Service Performance Insight), qui suit
            ce chiffre depuis plusieurs années sur les sociétés de services professionnels
            (4,05 % en 2015, 4,3 % en 2016, 4,26 % en 2021, environ 4,5 % sur le benchmark 2026),
            ce &laquo; revenue leakage &raquo; inclut notamment les erreurs de facturation, les
            heures ou jours non facturés, et les écarts entre le travail réalisé et la
            facturation — exactement la catégorie que Nivoy aide à identifier.
          </p>

          <div className="mx-auto mt-8 grid max-w-md gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
              <p className="text-3xl font-semibold text-indigo-600">200 k€</p>
              <p className="mt-1 text-sm text-gray-500">
                à 4 % de fuite, pour une ESN à 5 M€ de CA annuel
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
              <p className="text-3xl font-semibold text-indigo-600">250 k€</p>
              <p className="mt-1 text-sm text-gray-500">
                à 5 % de fuite, pour une ESN à 5 M€ de CA annuel
              </p>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-gray-400">
            Illustration à partir des taux moyens déclarés par le secteur — pas une estimation
            de vos propres pertes.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Pourquoi ça passe inaperçu
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold">
            Un écart d&apos;un ou deux jours ne saute pas aux yeux. Répété chaque mois, il pèse.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-center text-gray-600">
            Un jour non facturé au TJM, ça reste un montant modeste isolément. Multiplié par
            plusieurs consultants et plusieurs mois, l&apos;addition peut devenir significative —
            sans qu&apos;aucune alerte ne se déclenche, puisque personne ne compare
            systématiquement les deux documents.
          </p>
        </div>
      </section>

      <section id="comment-ca-marche" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Comment ça marche
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold">Trois étapes, quelques secondes</p>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {etapes.map((etape) => (
              <div key={etape.numero} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                  {etape.numero}
                </div>
                <h3 className="mt-4 font-semibold">{etape.titre}</h3>
                <p className="mt-2 text-sm text-gray-600">{etape.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Ce que Nivoy détecte
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold">Deux vérifications, pas de fausse promesse</p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {detections.map((d) => (
              <div key={d.titre} className="rounded-2xl border border-gray-200 p-6">
                <h3 className="font-semibold">{d.titre}</h3>
                <p className="mt-2 text-sm text-gray-600">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-indigo-600">
            Exemple illustratif
          </h2>
          <p className="mt-4 text-center text-2xl font-semibold">
            23 jours travaillés, 20 jours facturés
          </p>

          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-8">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>CRA</span>
              <span>23 jours travaillés</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
              <span>Facture</span>
              <span>20 jours facturés × 700 €/jour</span>
            </div>
            <div className="mt-6 border-t border-gray-100 pt-6">
              <p className="font-medium text-amber-600">⚠️ 3 jour(s) potentiellement non facturé(s)</p>
              <p className="mt-1 text-sm text-gray-600">Montant potentiel à vérifier : 2 100 €</p>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-gray-400">
            Exemple à but illustratif — pas un cas réel.
          </p>
        </div>
      </section>

      <section id="tarifs" className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-2xl font-semibold">Tarifs</h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Tarifs indicatifs, susceptibles d&apos;évoluer.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-8">
              <h3 className="font-semibold">Gratuit</h3>
              <p className="mt-2 text-3xl font-semibold">0 €</p>
              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li>3 analyses par mois</li>
                <li>Détection des écarts de jours</li>
                <li>Détection des écarts de chiffre d&apos;affaires</li>
              </ul>
              <Link
                href="/login"
                className="mt-8 block rounded-lg border border-gray-900 px-4 py-2.5 text-center text-sm font-medium hover:bg-gray-50"
              >
                Commencer
              </Link>
            </div>

            <div className="rounded-2xl border-2 border-indigo-600 p-8">
              <h3 className="font-semibold">Pro</h3>
              <p className="mt-2 text-3xl font-semibold">29 € / mois</p>
              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li>Analyses illimitées</li>
                <li>Détection des écarts de jours</li>
                <li>Détection des écarts de chiffre d&apos;affaires</li>
                <li>Support par email</li>
              </ul>
              <Link
                href="/login"
                className="mt-8 block rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-500"
              >
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-center text-2xl font-semibold">Questions fréquentes</h2>
          <div className="mt-10 space-y-6">
            {faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-medium">{item.question}</h3>
                <p className="mt-1 text-sm text-gray-600">{item.reponse}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <h2 className="text-2xl font-semibold">Vérifiez votre prochaine mission en quelques secondes</h2>
        <div className="mt-8">
          <Link
            href="/login"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Commencer gratuitement
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-8">
        <div className="mx-auto max-w-5xl px-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Nivoy
        </div>
      </footer>
    </main>
  );
}
