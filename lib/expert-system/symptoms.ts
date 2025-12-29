export interface Symptom {
  id: number;
  question: string;
  cfExpert: number;
}

export const symptoms: Symptom[] = [
  { id: 1, question: "Motor tidak berputar", cfExpert: 1.0 },
  { id: 2, question: "Terdengar suara berdengung", cfExpert: 0.6 },
  { id: 3, question: "Putaran motor lambat", cfExpert: 0.8 },
  { id: 4, question: "Motor cepat panas", cfExpert: 0.7 },
  { id: 5, question: "Bau gosong dari motor", cfExpert: 1.0 },
  { id: 6, question: "MCB atau fuse sering trip", cfExpert: 0.9 },
  { id: 7, question: "Getaran berlebihan", cfExpert: 0.8 },
  { id: 8, question: "Terdengar suara kasar / tidak normal", cfExpert: 1.0 },
  { id: 9, question: "Kapasitor menggelembung", cfExpert: 0.9 },
  { id: 10, question: "Motor lemah meski tegangan normal", cfExpert: 1.0 }
];
