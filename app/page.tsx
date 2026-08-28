import Link from "next/link";

export default function Accueil() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <header className="flex items-center justify-between">
        <span className="text-lg font-semibold">Nivoy</span>
        <Link href="/login" className="text-sm underline">
          Se connecter
        </Link>
      </header>

      <section className="mt-16 text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Détectez les écarts entre travail réalisé et facturation
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-600">
          Pour les ESN facturant en régie : uploadez votre CRA et votre facture, Nivoy compare
          automatiquement les jours travaillés et le chiffre d&apos;affaires facturé, et vous
          signale les écarts potentiels à vérifier.
        </p>
        <div className="mt-8">
          <Link
            href="/login"
            className="inline-block rounded bg-gray-900 px-6 py-3 text-sm font-medium text-white"
          >
            Commencer gratuitement
          </Link>
        </div>
      </section>

      <section className="mt-24">
        <h2 className="text-center text-2xl font-semibold">Tarifs</h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Tarifs indicatifs, susceptibles d&apos;évoluer.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded border border-gray-200 p-6">
            <h3 className="font-semibold">Gratuit</h3>
            <p className="mt-1 text-2xl font-semibold">0 €</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>3 analyses par mois</li>
              <li>Détection des écarts de jours</li>
              <li>Détection des écarts de chiffre d&apos;affaires</li>
            </ul>
            <Link
              href="/login"
              className="mt-6 block rounded border border-gray-900 px-4 py-2 text-center text-sm font-medium"
            >
              Commencer
            </Link>
          </div>

          <div className="rounded border border-gray-900 p-6">
            <h3 className="font-semibold">Pro</h3>
            <p className="mt-1 text-2xl font-semibold">29 € / mois</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>Analyses illimitées</li>
              <li>Détection des écarts de jours</li>
              <li>Détection des écarts de chiffre d&apos;affaires</li>
              <li>Support par email</li>
            </ul>
            <Link
              href="/login"
              className="mt-6 block rounded bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white"
            >
              Commencer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
