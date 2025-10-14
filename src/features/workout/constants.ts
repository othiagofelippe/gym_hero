import type { MuscleGroup } from "./types";

export const STORAGE_KEY = "@gym_hero:workouts";

export const MUSCLE_GROUPS: MuscleGroup[] = [
  { id: "chest", name: "Peito", icon: "💪" },
  { id: "back", name: "Costas", icon: "🦾" },
  { id: "legs", name: "Pernas", icon: "🦵" },
  { id: "shoulders", name: "Ombros", icon: "💪" },
  { id: "biceps", name: "Bíceps", icon: "💪" },
  { id: "triceps", name: "Tríceps", icon: "💪" },
  { id: "abs", name: "Abdômen", icon: "🔥" },
];

export const MUSCLE_GROUP_EMOJIS: Record<string, string> = {
  chest: "💪",
  back: "🦾",
  legs: "🦵",
  shoulders: "💪",
  biceps: "💪",
  triceps: "💪",
  abs: "🔥",
};

export const MUSCLE_GROUP_NAMES: Record<string, string> = {
  chest: "Peito",
  back: "Costas",
  legs: "Pernas",
  shoulders: "Ombros",
  biceps: "Bíceps",
  triceps: "Tríceps",
  abs: "Abdômen",
};

export const EXERCISES_BY_GROUP: Record<string, { id: string; name: string }[]> = {
  chest: [
    { id: "bench-press", name: "Supino Reto" },
    { id: "incline-bench", name: "Supino Inclinado" },
    { id: "dumbbell-fly", name: "Crucifixo com Halteres" },
    { id: "push-ups", name: "Flexão de Braço" },
    { id: "cable-crossover", name: "Crossover" },
  ],
  back: [
    { id: "pull-up", name: "Barra Fixa" },
    { id: "barbell-row", name: "Remada com Barra" },
    { id: "lat-pulldown", name: "Puxada Alta" },
    { id: "dumbbell-row", name: "Remada com Halteres" },
    { id: "deadlift", name: "Levantamento Terra" },
  ],
  legs: [
    { id: "squat", name: "Agachamento" },
    { id: "leg-press", name: "Leg Press" },
    { id: "leg-extension", name: "Cadeira Extensora" },
    { id: "leg-curl", name: "Mesa Flexora" },
    { id: "lunges", name: "Afundo" },
  ],
  shoulders: [
    { id: "overhead-press", name: "Desenvolvimento" },
    { id: "lateral-raise", name: "Elevação Lateral" },
    { id: "front-raise", name: "Elevação Frontal" },
    { id: "rear-delt-fly", name: "Crucifixo Inverso" },
    { id: "arnold-press", name: "Arnold Press" },
  ],
  biceps: [
    { id: "barbell-curl", name: "Rosca Direta" },
    { id: "hammer-curl", name: "Rosca Martelo" },
    { id: "preacher-curl", name: "Rosca Scott" },
    { id: "concentration-curl", name: "Rosca Concentrada" },
    { id: "cable-curl", name: "Rosca no Cabo" },
  ],
  triceps: [
    { id: "tricep-dips", name: "Mergulho" },
    { id: "tricep-pushdown", name: "Tríceps Pulley" },
    { id: "overhead-extension", name: "Tríceps Testa" },
    { id: "close-grip-bench", name: "Supino Fechado" },
    { id: "kickback", name: "Coice com Halter" },
  ],
  abs: [
    { id: "crunches", name: "Abdominal Reto" },
    { id: "plank", name: "Prancha" },
    { id: "russian-twist", name: "Abdominal Russo" },
    { id: "leg-raises", name: "Elevação de Pernas" },
    { id: "bicycle-crunches", name: "Abdominal Bicicleta" },
  ],
};

export const AVERAGE_SET_TIME_SECONDS = 180;
export const DEFAULT_REST_TIME_SECONDS = 60;
