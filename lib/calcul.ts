export interface ResultatAnalyse {
  joursTravailles: number;
  joursFactures: number;
  tjm: number;
  ecartJours: number;
  montantPotentiel: number | null;
}

export function verifierCoherenceFacture(
  joursFactures: number,
  tjm: number,
  montantTotalHt: number,
  toleranceEuros = 5
): boolean {
  return Math.abs(joursFactures * tjm - montantTotalHt) <= toleranceEuros;
}

export function analyserEcart(
  joursTravailles: number,
  joursFactures: number,
  tjm: number
): ResultatAnalyse {
  const ecartJours = joursTravailles - joursFactures;
  const montantPotentiel = ecartJours > 0 ? ecartJours * tjm : null;

  return { joursTravailles, joursFactures, tjm, ecartJours, montantPotentiel };
}
