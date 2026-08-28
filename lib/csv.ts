// Alias non-ambigus en priorité : "jour" seul est ambigu (peut désigner le nom du jour,
// ex. "Lundi", dans certains CRA), donc on ne s'y résout qu'en dernier recours.
const ALIAS_JOURS_PRIORITAIRES = [
  "jours",
  "nbjours",
  "nbjour",
  "nombredejours",
  "nombrejours",
  "joursouvres",
  "days",
  "jrs",
];
const ALIAS_JOURS_SECONDAIRES = ["jour", "jr", "j", "d"];

// Colonne de montant : optionnelle, absente du format CSV imposé de base.
const ALIAS_MONTANT = [
  "montantht",
  "montanthteur",
  "montanttotal",
  "montanttotalht",
  "montant",
  "ca",
  "chiffredaffaires",
];

function normaliser(texte: string): string {
  return texte.trim().toLowerCase().replace(/[\s_-]+/g, "");
}

function detecterSeparateur(ligneEntete: string): string {
  const nbPointVirgule = (ligneEntete.match(/;/g) ?? []).length;
  const nbVirgule = (ligneEntete.match(/,/g) ?? []).length;
  return nbPointVirgule > nbVirgule ? ";" : ",";
}

function parseLignes(csvContent: string): { columns: string[]; rows: string[][] } {
  const lines = csvContent.trim().split(/\r?\n/).filter((line) => line.trim().length > 0);
  const [header, ...rawRows] = lines;
  const separateur = detecterSeparateur(header);
  const columns = header.split(separateur).map((c) => c.trim());
  const rows = rawRows.map((row) => row.split(separateur));
  return { columns, rows };
}

function trouverIndex(columnsNormalises: string[], ...groupesAlias: string[][]): number {
  for (const alias of groupesAlias.flat()) {
    const index = columnsNormalises.indexOf(alias);
    if (index !== -1) return index;
  }
  return -1;
}

function sommerColonne(rows: string[][], index: number): number {
  return rows.reduce((total, cells) => {
    const valeur = parseFloat(cells[index]);
    return total + (Number.isFinite(valeur) ? valeur : 0);
  }, 0);
}

export function parseJoursTravailles(csvContent: string): number {
  const { columns, rows } = parseLignes(csvContent);
  const normalises = columns.map(normaliser);
  const joursIndex = trouverIndex(normalises, ALIAS_JOURS_PRIORITAIRES, ALIAS_JOURS_SECONDAIRES);

  if (joursIndex === -1) {
    throw new Error("Colonne 'jours' introuvable dans le CSV");
  }

  return sommerColonne(rows, joursIndex);
}

// Optionnelle : renvoie null si le CRA ne contient pas de colonne de montant
// (c'est le cas normal pour le format CSV imposé de base).
export function parseMontantCra(csvContent: string): number | null {
  const { columns, rows } = parseLignes(csvContent);
  const normalises = columns.map(normaliser);
  const montantIndex = trouverIndex(normalises, ALIAS_MONTANT);

  if (montantIndex === -1) return null;

  return sommerColonne(rows, montantIndex);
}
