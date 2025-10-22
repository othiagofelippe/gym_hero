import { supabase } from '@/lib/supabase';

export interface MuscleGroup {
  id: string;
  name: string;
  nameEn: string;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
}

interface MuscleGroupRow {
  id: string;
  name: string;
  name_en: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

function mapRowToMuscleGroup(row: MuscleGroupRow): MuscleGroup {
  return {
    id: row.id,
    name: row.name,
    nameEn: row.name_en,
    imageUrl: row.image_url,
    displayOrder: row.display_order,
    isActive: row.is_active,
  };
}

export const muscleGroupService = {
  async getMuscleGroups(): Promise<MuscleGroup[]> {
    try {
      const { data, error } = await supabase
        .from('muscle_groups')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;

      const muscleGroups = (data || []).map(mapRowToMuscleGroup);
      console.log(`✅ ${muscleGroups.length} grupos musculares carregados`);
      return muscleGroups;
    } catch (error) {
      console.error('❌ Erro ao buscar grupos musculares:', error);
      throw error;
    }
  },

  async getMuscleGroupById(id: string): Promise<MuscleGroup | null> {
    try {
      const { data, error } = await supabase
        .from('muscle_groups')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) throw error;

      return data ? mapRowToMuscleGroup(data) : null;
    } catch (error) {
      console.error('❌ Erro ao buscar grupo muscular:', error);
      return null;
    }
  },

  subscribeToMuscleGroups(
    onUpdate: (muscleGroups: MuscleGroup[]) => void
  ): () => void {
    console.log('👂 Ouvindo mudanças nos grupos musculares...');

    const channel = supabase
      .channel('muscle-groups-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'muscle_groups',
        },
        async () => {
          const muscleGroups = await muscleGroupService.getMuscleGroups();
          console.log(`🔄 Grupos musculares atualizados: ${muscleGroups.length} itens`);
          onUpdate(muscleGroups);
        }
      )
      .subscribe();

    return () => {
      console.log('👋 Parando de ouvir mudanças nos grupos musculares');
      supabase.removeChannel(channel);
    };
  },
};
