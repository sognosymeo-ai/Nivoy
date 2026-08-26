export function parseJoursTravailles(csvContent: string): number {
  const lines = csvContent.trim().split(/\r?\n/).filter((line) => line.trim().length > 0);
  const [header, ...rows] = lines;
  const columns = header.split(",").map((c) => c.trim());
  const joursIndex = columns.findIndex((c) => c.toLowerCase() === "jours");

  if (joursIndex === -1) {
    throw new Error("Colonne 'jours' introuvable dans le CSV");
  }

  return rows.reduce((total, row) => {
    const cells = row.split(",");
    const valeur = parseFloat(cells[joursIndex]);
    return total + (Number.isFinite(valeur) ? valeur : 0);
  }, 0);
}
