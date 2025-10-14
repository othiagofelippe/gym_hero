import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../constants";
import type { Workout } from "../types";

export const workoutStorage = {
  async getAll(): Promise<Workout[]> {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  },

  async save(workouts: Workout[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
  },

  async duplicate(workoutId: string): Promise<Workout | null> {
    const workouts = await this.getAll();
    const workout = workouts.find((w) => w.id === workoutId);

    if (!workout) return null;

    const duplicated: Workout = {
      ...workout,
      id: Date.now().toString(),
      name: `${workout.name} (Cópia)`,
      createdAt: new Date().toISOString(),
      lastPerformed: undefined,
      timesCompleted: 0,
    };

    await this.save([...workouts, duplicated]);
    return duplicated;
  },

  async delete(workoutId: string): Promise<void> {
    const workouts = await this.getAll();
    const filtered = workouts.filter((w) => w.id !== workoutId);
    await this.save(filtered);
  },

  async updateLastPerformed(workoutId: string): Promise<void> {
    const workouts = await this.getAll();
    const updated = workouts.map((w) =>
      w.id === workoutId
        ? {
            ...w,
            lastPerformed: new Date().toISOString(),
            timesCompleted: w.timesCompleted + 1,
          }
        : w
    );
    await this.save(updated);
  },
};
