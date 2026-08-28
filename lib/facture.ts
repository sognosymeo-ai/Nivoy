import Anthropic from "@anthropic-ai/sdk";

export interface DonneesFacture {
  jours_factures: number;
  tjm: number;
  montant_total_ht: number;
}

const PROMPT_EXTRACTION = `Analyse cette facture et extrait exactement ces trois valeurs numériques : le nombre de jours facturés, le TJM (taux journalier moyen, en euros), et le montant total HT (en euros).

Si le document contient plusieurs factures, ne considère que la première.

Réponds STRICTEMENT avec un JSON valide, sans aucun texte avant ou après, au format suivant :
{"jours_factures": number, "tjm": number, "montant_total_ht": number}`;

export async function extraireDonneesFacture(pdfBuffer: Buffer): Promise<DonneesFacture> {
  if (pdfBuffer.length === 0) {
    throw new Error("le fichier facture est vide");
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  let message;
  try {
    message = await anthropic.messages.create({
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
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      throw new Error("clé API Anthropic invalide ou manquante");
    }
    if (error instanceof Anthropic.RateLimitError) {
      throw new Error("limite de requêtes Claude atteinte, réessaie dans quelques instants");
    }
    if (error instanceof Anthropic.APIError) {
      throw new Error(`erreur de l'API Claude (${error.status ?? "?"}) : ${error.message}`);
    }
    throw error;
  }

  const blocTexte = message.content.find((bloc) => bloc.type === "text");
  if (!blocTexte || blocTexte.type !== "text") {
    throw new Error("réponse de Claude sans contenu texte");
  }

  const correspondanceJson = blocTexte.text.match(/\{[\s\S]*\}/);
  if (!correspondanceJson) {
    throw new Error("impossible de lire des données structurées dans la réponse — la facture est peut-être illisible");
  }

  let donnees;
  try {
    donnees = JSON.parse(correspondanceJson[0]);
  } catch {
    throw new Error("la réponse de Claude n'est pas un JSON valide");
  }

  const { jours_factures, tjm, montant_total_ht } = donnees;

  if (
    typeof jours_factures !== "number" ||
    typeof tjm !== "number" ||
    typeof montant_total_ht !== "number" ||
    !Number.isFinite(jours_factures) ||
    !Number.isFinite(tjm) ||
    !Number.isFinite(montant_total_ht)
  ) {
    throw new Error("format de données de facture invalide");
  }

  if (jours_factures < 0 || tjm < 0 || montant_total_ht < 0) {
    throw new Error("valeurs négatives détectées dans la facture extraite, extraction probablement incorrecte");
  }

  return { jours_factures, tjm, montant_total_ht };
}
