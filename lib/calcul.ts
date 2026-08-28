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

export interface ResultatEcartMontant {
  montantCra: number;
  montantFactureHt: number;
  ecartMontant: number;
  anomalieDetectee: boolean;
}

export function analyserEcartMontant(
  montantCra: number,
  montantFactureHt: number,
  toleranceEuros = 5
): ResultatEcartMontant {
  const ecartMontant = montantCra - montantFactureHt;

  return {
    montantCra,
    montantFactureHt,
    ecartMontant,
    anomalieDetectee: Math.abs(ecartMontant) > toleranceEuros,
  };
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
