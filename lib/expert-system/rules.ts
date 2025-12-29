// lib/expert-system/rules.ts

/**
 * Damage Level:
 * A = Ringan
 * B = Sedang
 * C = Berat
 */
export type DamageLevel = "A" | "B" | "C";

/**
 * Rule interface untuk Forward Chaining
 */
export interface Rule {
  id: string;
  symptoms: number[];
  operator: "AND" | "OR";
  level: DamageLevel;
  damage: string;
  solution: string;
}

/**
 * RULE BASE
 * - OR  : aturan paralel (satu gejala cukup)
 * - AND : aturan sekuensial (kombinasi gejala)
 */
export const rules: Rule[] = [
  {
    id: "R1",
    symptoms: [1],
    operator: "OR",
    level: "A",
    damage: "Kapasitor / Gulungan / Supply Listrik",
    solution: "Ganti kapasitor, cek kontinuitas gulungan, ukur supply listrik"
  },
  {
    id: "R2",
    symptoms: [2],
    operator: "OR",
    level: "B",
    damage: "Kapasitor",
    solution: "Ganti kapasitor sesuai spesifikasi"
  },
  {
    id: "R3",
    symptoms: [3],
    operator: "OR",
    level: "A",
    damage: "Supply Listrik / Kapasitor",
    solution: "Ukur tegangan, ganti kapasitor"
  },
  {
    id: "R4",
    symptoms: [4],
    operator: "OR",
    level: "B",
    damage: "Gulungan",
    solution: "Kurangi beban, lakukan rewinding"
  },
  {
    id: "R5",
    symptoms: [5],
    operator: "OR",
    level: "C",
    damage: "Gulungan terbakar",
    solution: "Rewinding, cek cooling fan"
  },
  {
    id: "R6",
    symptoms: [6],
    operator: "OR",
    level: "B",
    damage: "Kelistrikan (Supply)",
    solution: "Ukur arus, perbaiki instalasi"
  },
  {
    id: "R7",
    symptoms: [7],
    operator: "OR",
    level: "B",
    damage: "Bearing",
    solution: "Alignment, greasing, atau ganti bearing"
  },
  {
    id: "R8",
    symptoms: [8],
    operator: "OR",
    level: "C",
    damage: "Mekanis",
    solution: "Cek komponen motor terutama bagian yang bergerak"
  },
  {
    id: "R9",
    symptoms: [9],
    operator: "OR",
    level: "C",
    damage: "Kapasitor",
    solution: "Ganti kapasitor"
  },
  {
    id: "R10",
    symptoms: [10],
    operator: "OR",
    level: "B",
    damage: "Kapasitor / Gulungan",
    solution: "Ukur kapasitor dan resistansi gulungan"
  },

  /* ===============================
     ATURAN SEKUENSIAL (AND RULES)
     =============================== */

  {
    id: "R11",
    symptoms: [10, 5],
    operator: "AND",
    level: "C",
    damage: "Kapasitor terbakar",
    solution: "Ganti kapasitor"
  },
  {
    id: "R12",
    symptoms: [7, 2],
    operator: "AND",
    level: "C",
    damage: "Gearbox miring",
    solution: "Benarkan posisi gearbox"
  }
];
