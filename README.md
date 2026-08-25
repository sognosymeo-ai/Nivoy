# Nivoy — Revenue Recovery (V0)

Prototype interne pour valider une hypothèse : détecter automatiquement l'écart entre les jours travaillés (CRA) et les jours facturés, pour les ESN facturant en régie.

## Ce que fait ce prototype

1. Upload d'un CRA (CSV)
2. Upload d'une facture (PDF)
3. Calcul de l'écart entre jours travaillés et jours facturés
4. Affichage du montant potentiellement non facturé

C'est un outil à usage interne, pas encore un produit. Pas d'authentification, pas de base de données, pas de multi-tenant.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- API Claude pour l'extraction des données de facture (PDF → JSON)
- Calcul de l'écart fait en code (jamais par le LLM)

## Setup

```bash
npm install
cp .env.example .env.local  # puis renseigner ANTHROPIC_API_KEY
npm run dev
```
