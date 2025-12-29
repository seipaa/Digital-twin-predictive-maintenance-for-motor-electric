// lib/expert-system/diagnosisEngine.ts

import { rules } from "./rules";
import { symptoms } from "./symptoms";
import { FuzzyLevel, fuzzyLevelToValue } from "./fuzzyMembership";

/* =======================
   TYPES
======================= */

export interface DiagnosisResult {
  level: "A" | "B" | "C";
  damage: string;
  solution: string;
  confidence: number; // 0.0 - 1.0
}

/**
 * Jawaban user:
 * Tidak | Jarang | Ya
 */
export type UserAnswer = FuzzyLevel;

/**
 * Mapping jawaban user per symptom
 * key = symptomId
 */
export type UserAnswers = Record<number, UserAnswer>;

/* =======================
   DIAGNOSIS ENGINE
======================= */

/**
 * Forward Chaining + Certainty Factor (MYCIN)
 */
export function diagnoseForward(
  answers: UserAnswers
): DiagnosisResult[] {

  /** 1️⃣ Hitung CF evidence */
  const evidenceCF = new Map<number, number>();

  for (const symptom of symptoms) {
    const answer = answers[symptom.id];
    if (!answer) continue;

    const cfUser = fuzzyLevelToValue(answer);   // 0.0 / 0.4 / 0.8
    const cfEvidence = cfUser * symptom.cfExpert;

    if (cfEvidence > 0) {
      evidenceCF.set(symptom.id, cfEvidence);
    }
  }

  /** 2️⃣ Forward chaining */
  const results: DiagnosisResult[] = [];

  for (const rule of rules) {
    const cfList: number[] = [];

    for (const sid of rule.symptoms) {
      if (evidenceCF.has(sid)) {
        cfList.push(evidenceCF.get(sid)!);
      }
    }

    let ruleCF = 0;

    // AND → sekuensial
    if (rule.operator === "AND" && cfList.length === rule.symptoms.length) {
      ruleCF = Math.min(...cfList);
    }

    // OR → paralel
    if (rule.operator === "OR" && cfList.length > 0) {
      ruleCF = Math.max(...cfList);
    }

    if (ruleCF > 0) {
      results.push({
        level: rule.level,
        damage: rule.damage,
        solution: rule.solution,
        confidence: Number(ruleCF.toFixed(3))
      });
    }
  }

  /** 3️⃣ Prioritas level: C > B > A */
  const priority = { C: 3, B: 2, A: 1 };
  results.sort((a, b) => priority[b.level] - priority[a.level]);

  return results;
}
