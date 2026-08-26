import Anthropic from "@anthropic-ai/sdk";

export interface DonneesFacture {
  jours_factures: number;
  tjm: number;
  montant_total_ht: number;
}

const PROMPT_EXTRACTION = `Analyse cette facture et extrait exactement ces trois valeurs numériques : le nombre de jours facturés, le TJM (taux journalier moyen, en euros), et le montant total HT (en euros).

Réponds STRICTEMENT avec un JSON valide, sans aucun texte avant ou après, au format suivant :
{"jours_factures": number, "tjm": number, "montant_total_ht": number}`;

export async function extraireDonneesFacture(pdfBuffer: Buffer): Promise<DonneesFacture> {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await anthropic.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: pdfBuffer.toString("base64"),
            },
          },
          { type: "text", text: PROMPT_EXTRACTION },
        ],
      },
    ],
  });

  const blocTexte = message.content.find((bloc) => bloc.type === "text");
  if (!blocTexte || blocTexte.type !== "text") {
    throw new Error("Réponse de Claude sans contenu texte");
  }

  const correspondanceJson = blocTexte.text.match(/\{[\s\S]*\}/);
  if (!correspondanceJson) {
    throw new Error("Impossible de trouver du JSON dans la réponse de Claude");
  }

  const donnees = JSON.parse(correspondanceJson[0]);

  if (
    typeof donnees.jours_factures !== "number" ||
    typeof donnees.tjm !== "number" ||
    typeof donnees.montant_total_ht !== "number"
  ) {
    throw new Error("Format de données de facture invalide");
  }

  return donnees;
}
