export default function MockupOutil() {
  return (
    <div className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="ml-3 rounded-md bg-white px-3 py-1 text-xs text-slate-400">
          nivoy.app/app
        </span>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900">Analyser une mission</span>
          <span className="text-xs text-slate-400">vous@esn.fr</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs">
            <span className="text-slate-500">CRA (CSV)</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-500">
              cra_juin.csv
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs">
            <span className="text-slate-500">Facture (PDF)</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-500">
              facture_juin.pdf
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-800">
            ⚠️ 3 jour(s) potentiellement non facturé(s)
          </p>
          <p className="mt-1 text-xs text-amber-700">Montant potentiel à vérifier : 2 100 €</p>
          <div className="mt-3 space-y-0.5 border-t border-amber-200 pt-3 text-xs text-amber-700/80">
            <p>CRA : 23 jours travaillés</p>
            <p>Facture : 20 jours facturés × 700 €/jour</p>
          </div>
        </div>
      </div>
    </div>
  );
}
