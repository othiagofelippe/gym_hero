import { supabase } from '@/lib/supabase';

export interface Exercise {
  id: string;
  name: string;
  nameEn?: string;
  muscleGroupId: string;
  description?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  equipment?: string[];
  displayOrder: number;
  isActive: boolean;
}

interface ExerciseRow {
  id: string;
  name: string;
  name_en?: string;
  muscle_group_id: string;
  description?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  equipment?: string[];
  display_order: number;
  is_active: boolean;
}

function mapRowToExercise(row: ExerciseRow): Exercise {
  return {
    id: row.id,
    name: row.name,
    nameEn: row.name_en,
    muscleGroupId: row.muscle_group_id,
    description: row.description,
    difficulty: row.difficulty,
    equipment: row.equipment,
    displayOrder: row.display_order,
    isActive: row.is_active,
  };
}

export const exerciseService = {
  async getExercises(): Promise<Exercise[]> {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('is_active', true)
        .order('muscle_group_id')
        .order('display_order', { ascending: true });

      if (error) throw error;

      const exercises = (data || []).map(mapRowToExercise);
      console.log(`✅ ${exercises.length} exercícios carregados`);
      return exercises;
    } catch (error) {
      console.error('❌ Erro ao buscar exercícios:', error);
      throw error;
    }
  },

  async getExercisesByMuscleGroup(muscleGroupId: string): Promise<Exercise[]> {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('muscle_group_id', muscleGroupId)
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;

      const exercises = (data || []).map(mapRowToExercise);
      console.log(`✅ ${exercises.length} exercícios carregados para ${muscleGroupId}`);
      return exercises;
    } catch (error) {
      console.error('❌ Erro ao buscar exercícios por grupo:', error);
      throw error;
    }
  },

  async getExerciseById(id: string): Promise<Exercise | null> {
    try {
      const { data, error } = await supabase
        .from('exercises')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) throw error;

      return data ? mapRowToExercise(data) : null;
    } catch (error) {
      console.error('❌ Erro ao buscar exercício:', error);
      return null;
    }
  },

  subscribeToExercises(
    muscleGroupId: string | null,
    onUpdate: (exercises: Exercise[]) => void
  ): () => void {
    console.log('👂 Ouvindo mudanças nos exercícios...');

    const channel = supabase
      .channel('exercises-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'exercises',
          ...(muscleGroupId && { filter: `muscle_group_id=eq.${muscleGroupId}` }),
        },
        async () => {
          const exercises = muscleGroupId
            ? await exerciseService.getExercisesByMuscleGroup(muscleGroupId)
            : await exerciseService.getExercises();
          console.log(`🔄 Exercícios atualizados: ${exercises.length} itens`);
          onUpdate(exercises);
        }
      )
      .subscribe();

    return () => {
      console.log('👋 Parando de ouvir mudanças nos exercícios');
      supabase.removeChannel(channel);
    };
  },
};
