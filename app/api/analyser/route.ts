import { NextRequest, NextResponse } from "next/server";
import { parseJoursTravailles, parseMontantCra } from "@/lib/csv";
import { extraireDonneesFacture } from "@/lib/facture";
import { analyserEcart, analyserEcartMontant, verifierCoherenceFacture } from "@/lib/calcul";

const TAILLE_MAX_CSV = 5 * 1024 * 1024; // 5 Mo
const TAILLE_MAX_PDF = 15 * 1024 * 1024; // 15 Mo

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const craFile = formData.get("cra");
    const factureFile = formData.get("facture");

    if (!(craFile instanceof File) || !(factureFile instanceof File)) {
      return NextResponse.json(
        { error: "Les deux fichiers (CRA et facture) sont requis." },
        { status: 400 }
      );
    }

    if (craFile.size === 0) {
      return NextResponse.json({ error: "Le fichier CRA est vide." }, { status: 400 });
    }
    if (factureFile.size === 0) {
      return NextResponse.json({ error: "Le fichier facture est vide." }, { status: 400 });
    }

    if (!craFile.name.toLowerCase().endsWith(".csv")) {
      return NextResponse.json(
        { error: "Le fichier CRA doit être un CSV (.csv) — les deux fichiers sont peut-être inversés." },
        { status: 400 }
      );
    }
    if (!factureFile.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Le fichier facture doit être un PDF (.pdf) — les deux fichiers sont peut-être inversés." },
        { status: 400 }
      );
    }

    if (craFile.size > TAILLE_MAX_CSV) {
      return NextResponse.json({ error: "Le fichier CRA est trop volumineux (max 5 Mo)." }, { status: 400 });
    }
    if (factureFile.size > TAILLE_MAX_PDF) {
      return NextResponse.json({ error: "Le fichier facture est trop volumineux (max 15 Mo)." }, { status: 400 });
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
  } catch (error) {
    return NextResponse.json(
      { error: `Erreur inattendue : ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
