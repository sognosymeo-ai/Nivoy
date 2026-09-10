import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <span className="text-lg font-semibold">Nivoy</span>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">Page introuvable</h1>
      <p className="mt-2 max-w-sm text-slate-500">
        Cette page n&apos;existe pas ou plus.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
