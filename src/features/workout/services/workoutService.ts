import { supabase } from '@/lib/supabase';
import type { Workout, ExerciseConfig } from '../types';

interface WorkoutRow {
  id: string;
  user_id: string;
  name: string;
  muscle_group: string;
  muscle_group_name: string;
  exercises: ExerciseConfig[];
  created_at: string;
  last_performed: string | null;
  times_completed: number;
}

function mapRowToWorkout(row: WorkoutRow): Workout {
  return {
    id: row.id,
    name: row.name,
    muscleGroup: row.muscle_group,
    muscleGroupName: row.muscle_group_name,
    exercises: row.exercises,
    createdAt: row.created_at,
    lastPerformed: row.last_performed || undefined,
    timesCompleted: row.times_completed,
  };
}

function mapWorkoutToRow(workout: Workout, userId: string): Partial<WorkoutRow> {
  return {
    user_id: userId,
    name: workout.name,
    muscle_group: workout.muscleGroup,
    muscle_group_name: workout.muscleGroupName,
    exercises: workout.exercises,
    last_performed: workout.lastPerformed || null,
    times_completed: workout.timesCompleted,
  };
}

export const workoutService = {
  async saveWorkout(userId: string, workout: Workout): Promise<void> {
    try {
      const workoutData = mapWorkoutToRow(workout, userId);
      const { id, ...dataWithoutId } = workoutData as any;

      const { error } = await supabase
        .from('workouts')
        .insert(dataWithoutId);

      if (error) throw error;

      console.log('✅ Treino salvo:', workout.name);
    } catch (error) {
      console.error('❌ Erro ao salvar treino:', error);
      throw error;
    }
  },

  async getWorkouts(userId: string): Promise<Workout[]> {
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const workouts = (data || []).map(mapRowToWorkout);
      console.log(`✅ ${workouts.length} treinos carregados`);
      return workouts;
    } catch (error) {
      console.error('❌ Erro ao buscar treinos:', error);
      throw error;
    }
  },

  subscribeToWorkouts(
    userId: string,
    onUpdate: (workouts: Workout[]) => void
  ): () => void {
    console.log('👂 Ouvindo mudanças nos treinos...');

    const channel = supabase
      .channel('workouts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'workouts',
          filter: `user_id=eq.${userId}`,
        },
        async () => {
          const workouts = await workoutService.getWorkouts(userId);
          console.log(`🔄 Treinos atualizados: ${workouts.length} itens`);
          onUpdate(workouts);
        }
      )
      .subscribe();

    return () => {
      console.log('👋 Parando de ouvir mudanças nos treinos');
      supabase.removeChannel(channel);
    };
  },

  async updateWorkout(
    userId: string,
    workoutId: string,
    updates: Partial<Workout>
  ): Promise<void> {
    try {
      const updateData: Partial<WorkoutRow> = {
        ...(updates.name && { name: updates.name }),
        ...(updates.muscleGroup && { muscle_group: updates.muscleGroup }),
        ...(updates.muscleGroupName && { muscle_group_name: updates.muscleGroupName }),
        ...(updates.exercises && { exercises: updates.exercises }),
        ...(updates.lastPerformed !== undefined && {
          last_performed: updates.lastPerformed || null
        }),
        ...(updates.timesCompleted !== undefined && {
          times_completed: updates.timesCompleted
        }),
      };

      const { error } = await supabase
        .from('workouts')
        .update(updateData)
        .eq('id', workoutId)
        .eq('user_id', userId);

      if (error) throw error;

      console.log('✅ Treino atualizado:', workoutId);
    } catch (error) {
      console.error('❌ Erro ao atualizar treino:', error);
      throw error;
    }
  },

  async deleteWorkout(userId: string, workoutId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('workouts')
        .delete()
        .eq('id', workoutId)
        .eq('user_id', userId);

      if (error) throw error;

      console.log('✅ Treino deletado:', workoutId);
    } catch (error) {
      console.error('❌ Erro ao deletar treino:', error);
      throw error;
    }
  },

  async duplicateWorkout(userId: string, workout: Workout): Promise<Workout> {
    try {
      const newWorkout: Workout = {
        ...workout,
        id: '',
        name: `${workout.name} (Cópia)`,
        createdAt: '',
        lastPerformed: undefined,
        timesCompleted: 0,
      };

      await this.saveWorkout(userId, newWorkout);
      console.log('✅ Treino duplicado:', newWorkout.name);
      return newWorkout;
    } catch (error) {
      console.error('❌ Erro ao duplicar treino:', error);
      throw error;
    }
  },

  async markWorkoutAsCompleted(
    userId: string,
    workoutId: string
  ): Promise<void> {
    try {
      const { data: currentWorkout, error: fetchError } = await supabase
        .from('workouts')
        .select('times_completed')
        .eq('id', workoutId)
        .eq('user_id', userId)
        .single();

      if (fetchError) throw fetchError;

      const { error: updateError } = await supabase
        .from('workouts')
        .update({
          last_performed: new Date().toISOString(),
          times_completed: (currentWorkout?.times_completed || 0) + 1,
        })
        .eq('id', workoutId)
        .eq('user_id', userId);

      if (updateError) throw updateError;

      console.log('✅ Treino marcado como concluído:', workoutId);
    } catch (error) {
      console.error('❌ Erro ao marcar treino como concluído:', error);
      throw error;
    }
  },
};
