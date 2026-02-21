// src/lib/constants.ts

// Interface de la Noticia que ambos usaréis para el Proof of Concept [cite: 77, 78]
export interface FinancialNews {
  id: string;
  title: string;
  technical_content: string; // El texto complejo original de "Wall Street" [cite: 10]
  category: 'crypto' | 'stocks' | 'macro';
  eli10_content?: string;    // Aquí Persona 2 guardará la versión simplificada [cite: 21]
}

// Estructura del Usuario basada en vuestro boceto
export const userProfile = {
  name: "Pepe",
  interests: ['crypto', 'stocks'],
  assets: { 
    gold: 530,      // Datos de vuestra pizarra: Gold 530€
    bitcoin: 930,   // Datos de vuestra pizarra: Bitcoin 930€
    microsoft: 300  // Datos de vuestra pizarra: Microsoft 300€
  }
};