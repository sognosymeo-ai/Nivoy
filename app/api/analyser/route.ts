import { NextRequest, NextResponse } from "next/server";
import { parseJoursTravailles, parseMontantCra } from "@/lib/csv";
import { extraireDonneesFacture } from "@/lib/facture";
import { analyserEcart, analyserEcartMontant, verifierCoherenceFacture } from "@/lib/calcul";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const craFile = formData.get("cra");
  const factureFile = formData.get("facture");

  if (!(craFile instanceof File) || !(factureFile instanceof File)) {
    return NextResponse.json(
      { error: "Les deux fichiers (CRA et facture) sont requis." },
      { status: 400 }
    );
  }

  let joursTravailles: number;
  let montantCra: number | null;
  try {
    const csvContent = await craFile.text();
    joursTravailles = parseJoursTravailles(csvContent);
    montantCra = parseMontantCra(csvContent);
  } catch (error) {
    return NextResponse.json(
      { error: `CRA invalide : ${(error as Error).message}` },
      { status: 400 }
    );
  }

  let donneesFacture;
  try {
    const pdfBuffer = Buffer.from(await factureFile.arrayBuffer());
    donneesFacture = await extraireDonneesFacture(pdfBuffer);
  } catch (error) {
    return NextResponse.json(
      { error: `Impossible d'extraire les données de la facture : ${(error as Error).message}` },
      { status: 500 }
    );
  }

  const { jours_factures, tjm, montant_total_ht } = donneesFacture;
  const resultat = analyserEcart(joursTravailles, jours_factures, tjm);
  const coherenceFacture = verifierCoherenceFacture(jours_factures, tjm, montant_total_ht);
  const ecartMontant = montantCra !== null ? analyserEcartMontant(montantCra, montant_total_ht) : null;

  return NextResponse.json({
    ...resultat,
    coherenceFacture,
    montantTotalHt: montant_total_ht,
    ecartMontant,
  });
}
