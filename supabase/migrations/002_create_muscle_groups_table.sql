-- Tabela de Grupos Musculares
CREATE TABLE IF NOT EXISTS muscle_groups (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Índice para ordenação
CREATE INDEX IF NOT EXISTS muscle_groups_display_order_idx ON muscle_groups(display_order);
CREATE INDEX IF NOT EXISTS muscle_groups_is_active_idx ON muscle_groups(is_active);

-- Seed data - Grupos musculares padrão
INSERT INTO muscle_groups (id, name, name_en, image_url, display_order) VALUES
  ('chest', 'Peito', 'Chest', 'https://izkgymyqqmolnzuzovhr.supabase.co/storage/v1/object/public/muscle-groups/chest.png', 1),
  ('back', 'Costas', 'Back', 'https://izkgymyqqmolnzuzovhr.supabase.co/storage/v1/object/public/muscle-groups/back.png', 2),
  ('shoulders', 'Ombros', 'Shoulders', 'https://izkgymyqqmolnzuzovhr.supabase.co/storage/v1/object/public/muscle-groups/shoulder.png', 3),
  ('biceps', 'Bíceps', 'Biceps', 'https://izkgymyqqmolnzuzovhr.supabase.co/storage/v1/object/public/muscle-groups/biceps.png', 4),
  ('triceps', 'Tríceps', 'Triceps', 'https://izkgymyqqmolnzuzovhr.supabase.co/storage/v1/object/public/muscle-groups/triceps.png', 5),
  ('forearms', 'Antebraço', 'Forearms', 'https://izkgymyqqmolnzuzovhr.supabase.co/storage/v1/object/public/muscle-groups/forearms.png', 6),
  ('legs', 'Quadríceps', 'Quadriceps', 'https://izkgymyqqmolnzuzovhr.supabase.co/storage/v1/object/public/muscle-groups/legs.png', 7),
  ('hamstrings', 'Posterior', 'Hamstrings', 'https://izkgymyqqmolnzuzovhr.supabase.co/storage/v1/object/public/muscle-groups/hamstrings.png', 8),
  ('glutes', 'Glúteos', 'Glutes', 'https://izkgymyqqmolnzuzovhr.supabase.co/storage/v1/object/public/muscle-groups/glutes.png', 9),
  ('calves', 'Panturrilha', 'Calves', 'https://izkgymyqqmolnzuzovhr.supabase.co/storage/v1/object/public/muscle-groups/calves.png', 10),
  ('abs', 'Abdômen', 'Abs', 'https://izkgymyqqmolnzuzovhr.supabase.co/storage/v1/object/public/muscle-groups/abs.png', 11),
  ('fullbody', 'Corpo Inteiro', 'Full Body', 'https://izkgymyqqmolnzuzovhr.supabase.co/storage/v1/object/public/muscle-groups/fullbody.png', 12),
  ('cardio', 'Cardio', 'Cardio', 'https://izkgymyqqmolnzuzovhr.supabase.co/storage/v1/object/public/muscle-groups/cardio.png', 13)
ON CONFLICT (id) DO NOTHING;

-- Tabela é pública (read-only para todos)
ALTER TABLE muscle_groups ENABLE ROW LEVEL SECURITY;

-- Policy: Todos podem ler grupos musculares ativos
CREATE POLICY "Anyone can view active muscle groups"
  ON muscle_groups
  FOR SELECT
  USING (is_active = true);

-- Function para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_muscle_groups_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
CREATE TRIGGER update_muscle_groups_updated_at_trigger
  BEFORE UPDATE ON muscle_groups
  FOR EACH ROW
  EXECUTE FUNCTION update_muscle_groups_updated_at();

-- Comentários para documentação
COMMENT ON TABLE muscle_groups IS 'Grupos musculares disponíveis no app';
COMMENT ON COLUMN muscle_groups.id IS 'Identificador único (em inglês)';
COMMENT ON COLUMN muscle_groups.name IS 'Nome em português';
COMMENT ON COLUMN muscle_groups.name_en IS 'Nome em inglês';
COMMENT ON COLUMN muscle_groups.image_url IS 'URL pública da imagem no Supabase Storage';
COMMENT ON COLUMN muscle_groups.display_order IS 'Ordem de exibição na interface';
COMMENT ON COLUMN muscle_groups.is_active IS 'Se o grupo está ativo/visível no app';
