// Alias non-ambigus en priorité : "jour" seul est ambigu (peut désigner le nom du jour,
// ex. "Lundi", dans certains CRA), donc on ne s'y résout qu'en dernier recours.
const ALIAS_PRIORITAIRES = [
  "jours",
  "nbjours",
  "nbjour",
  "nombredejours",
  "nombrejours",
  "joursouvres",
  "days",
  "jrs",
];
const ALIAS_SECONDAIRES = ["jour", "jr", "j", "d"];

function normaliser(texte: string): string {
  return texte.trim().toLowerCase().replace(/[\s_-]+/g, "");
}

function trouverIndexColonneJours(columns: string[]): number {
  const normalises = columns.map(normaliser);

  for (const alias of ALIAS_PRIORITAIRES) {
    const index = normalises.indexOf(alias);
    if (index !== -1) return index;
  }

  for (const alias of ALIAS_SECONDAIRES) {
    const index = normalises.indexOf(alias);
    if (index !== -1) return index;
  }

  return -1;
}

function detecterSeparateur(ligneEntete: string): string {
  const nbPointVirgule = (ligneEntete.match(/;/g) ?? []).length;
  const nbVirgule = (ligneEntete.match(/,/g) ?? []).length;
  return nbPointVirgule > nbVirgule ? ";" : ",";
}

export function parseJoursTravailles(csvContent: string): number {
  const lines = csvContent.trim().split(/\r?\n/).filter((line) => line.trim().length > 0);
  const [header, ...rows] = lines;
  const separateur = detecterSeparateur(header);
  const columns = header.split(separateur).map((c) => c.trim());
  const joursIndex = trouverIndexColonneJours(columns);

  if (joursIndex === -1) {
    throw new Error("Colonne 'jours' introuvable dans le CSV");
  }

  return rows.reduce((total, row) => {
    const cells = row.split(separateur);
    const valeur = parseFloat(cells[joursIndex]);
    return total + (Number.isFinite(valeur) ? valeur : 0);
  }, 0);
}
