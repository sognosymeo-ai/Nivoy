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

const JOURS_VALEUR_MAX = 366; // garde-fou anti fautes de frappe (ex: 20000 au lieu de 2)

function normaliser(texte: string): string {
  return texte.trim().toLowerCase().replace(/[\s_-]+/g, "");
}

function detecterSeparateur(ligneEntete: string): string {
  const nbPointVirgule = (ligneEntete.match(/;/g) ?? []).length;
  const nbVirgule = (ligneEntete.match(/,/g) ?? []).length;
  return nbPointVirgule > nbVirgule ? ";" : ",";
}

// Découpe une ligne CSV en respectant les champs entre guillemets
// (ex: "Dupont, Jean" ne doit pas être coupé sur la virgule qu'il contient).
function parserLigneCsv(ligne: string, separateur: string): string[] {
  const cellules: string[] = [];
  let cellule = "";
  let dansGuillemets = false;

  for (let i = 0; i < ligne.length; i++) {
    const caractere = ligne[i];

    if (dansGuillemets) {
      if (caractere === '"') {
        if (ligne[i + 1] === '"') {
          cellule += '"';
          i++;
        } else {
          dansGuillemets = false;
        }
      } else {
        cellule += caractere;
      }
    } else if (caractere === '"') {
      dansGuillemets = true;
    } else if (caractere === separateur) {
      cellules.push(cellule.trim());
      cellule = "";
    } else {
      cellule += caractere;
    }
  }
  cellules.push(cellule.trim());
  return cellules;
}

// Accepte la virgule comme séparateur décimal (ex: "1,5") quand elle n'est pas
// déjà utilisée comme séparateur de colonnes et qu'il n'y a pas de point.
function parserNombre(valeurBrute: string, separateurColonnes: string): number {
  const valeur = valeurBrute.trim();
  if (valeur === "") return NaN;

  const virguleEstDecimale = separateurColonnes !== "," && valeur.includes(",") && !valeur.includes(".");
  return parseFloat(virguleEstDecimale ? valeur.replace(",", ".") : valeur);
}

function estLigneTotal(cells: string[]): boolean {
  return cells.some((cell) => normaliser(cell) === "total");
}

function parseLignes(csvContent: string): { columns: string[]; rows: string[][]; separateur: string } {
  // Certains exports Excel ajoutent un BOM UTF-8 en tête de fichier.
  const contenuNettoye = csvContent.replace(/^﻿/, "");
  const lines = contenuNettoye.trim().split(/\r?\n/).filter((line) => line.trim().length > 0);

  if (lines.length === 0) {
    throw new Error("le fichier est vide");
  }

  const [header, ...rawRows] = lines;
  const separateur = detecterSeparateur(header);
  const columns = parserLigneCsv(header, separateur);
  // Certains exports CRA ajoutent une ligne récapitulative ("TOTAL") en bas du fichier,
  // qui contiendrait déjà la somme et fausserait le calcul si on l'incluait.
  const rows = rawRows
    .map((row) => parserLigneCsv(row, separateur))
    .filter((cells) => !estLigneTotal(cells));

  return { columns, rows, separateur };
}

function trouverIndex(columnsNormalises: string[], ...groupesAlias: string[][]): number {
  for (const alias of groupesAlias.flat()) {
    const index = columnsNormalises.indexOf(alias);
    if (index !== -1) return index;
  }
  return -1;
}

function sommerColonne(rows: string[][], index: number, separateur: string): number {
  return rows.reduce((total, cells) => {
    const valeur = parserNombre(cells[index] ?? "", separateur);
    return total + (Number.isFinite(valeur) ? valeur : 0);
  }, 0);
}

export function parseJoursTravailles(csvContent: string): number {
  const { columns, rows, separateur } = parseLignes(csvContent);
  const normalises = columns.map(normaliser);
  const joursIndex = trouverIndex(normalises, ALIAS_JOURS_PRIORITAIRES, ALIAS_JOURS_SECONDAIRES);

  if (joursIndex === -1) {
    throw new Error("Colonne 'jours' introuvable dans le CSV");
  }

  let total = 0;
  for (const cells of rows) {
    const brut = cells[joursIndex] ?? "";
    if (brut.trim() === "") continue;

    const valeur = parserNombre(brut, separateur);
    if (!Number.isFinite(valeur)) continue; // texte inattendu dans la cellule : ignoré plutôt que de bloquer tout le fichier

    if (valeur < 0 || valeur > JOURS_VALEUR_MAX) {
      throw new Error(`valeur de jours suspecte : "${brut}" (doit être un nombre entre 0 et ${JOURS_VALEUR_MAX})`);
    }

    total += valeur;
  }

  return total;
}

// Optionnelle : renvoie null si le CRA ne contient pas de colonne de montant
// (c'est le cas normal pour le format CSV imposé de base).
export function parseMontantCra(csvContent: string): number | null {
  const { columns, rows, separateur } = parseLignes(csvContent);
  const normalises = columns.map(normaliser);
  const montantIndex = trouverIndex(normalises, ALIAS_MONTANT);

  if (montantIndex === -1) return null;

  return sommerColonne(rows, montantIndex, separateur);
}
