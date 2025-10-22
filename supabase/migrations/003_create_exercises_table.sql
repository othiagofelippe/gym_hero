-- Tabela de Exercícios
CREATE TABLE IF NOT EXISTS exercises (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  muscle_group_id TEXT NOT NULL REFERENCES muscle_groups(id) ON DELETE CASCADE,
  description TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  equipment TEXT[],
  display_order INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS exercises_muscle_group_id_idx ON exercises(muscle_group_id);
CREATE INDEX IF NOT EXISTS exercises_display_order_idx ON exercises(display_order);
CREATE INDEX IF NOT EXISTS exercises_is_active_idx ON exercises(is_active);

-- Seed data - Exercícios padrão
INSERT INTO exercises (id, name, muscle_group_id, difficulty, display_order) VALUES
  -- Peito (Chest)
  ('bench-press', 'Supino Reto', 'chest', 'intermediate', 1),
  ('incline-bench', 'Supino Inclinado', 'chest', 'intermediate', 2),
  ('dumbbell-fly', 'Crucifixo com Halteres', 'chest', 'intermediate', 3),
  ('push-ups', 'Flexão de Braço', 'chest', 'beginner', 4),
  ('cable-crossover', 'Crossover', 'chest', 'intermediate', 5),

  -- Costas (Back)
  ('pull-up', 'Barra Fixa', 'back', 'intermediate', 1),
  ('barbell-row', 'Remada com Barra', 'back', 'intermediate', 2),
  ('lat-pulldown', 'Puxada Alta', 'back', 'beginner', 3),
  ('dumbbell-row', 'Remada com Halteres', 'back', 'beginner', 4),
  ('deadlift', 'Levantamento Terra', 'back', 'advanced', 5),

  -- Ombros (Shoulders)
  ('overhead-press', 'Desenvolvimento', 'shoulders', 'intermediate', 1),
  ('lateral-raise', 'Elevação Lateral', 'shoulders', 'beginner', 2),
  ('front-raise', 'Elevação Frontal', 'shoulders', 'beginner', 3),
  ('rear-delt-fly', 'Crucifixo Inverso', 'shoulders', 'intermediate', 4),
  ('arnold-press', 'Arnold Press', 'shoulders', 'intermediate', 5),

  -- Bíceps (Biceps)
  ('barbell-curl', 'Rosca Direta', 'biceps', 'beginner', 1),
  ('hammer-curl', 'Rosca Martelo', 'biceps', 'beginner', 2),
  ('preacher-curl', 'Rosca Scott', 'biceps', 'intermediate', 3),
  ('concentration-curl', 'Rosca Concentrada', 'biceps', 'beginner', 4),
  ('cable-curl', 'Rosca no Cabo', 'biceps', 'beginner', 5),

  -- Tríceps (Triceps)
  ('tricep-dips', 'Mergulho', 'triceps', 'intermediate', 1),
  ('tricep-pushdown', 'Tríceps Pulley', 'triceps', 'beginner', 2),
  ('overhead-extension', 'Tríceps Testa', 'triceps', 'beginner', 3),
  ('close-grip-bench', 'Supino Fechado', 'triceps', 'intermediate', 4),
  ('kickback', 'Coice com Halter', 'triceps', 'beginner', 5),

  -- Antebraço (Forearms)
  ('wrist-curl', 'Rosca de Punho', 'forearms', 'beginner', 1),
  ('reverse-wrist-curl', 'Rosca de Punho Inversa', 'forearms', 'beginner', 2),
  ('farmers-walk', 'Caminhada do Fazendeiro', 'forearms', 'intermediate', 3),
  ('plate-pinch', 'Pinça de Anilha', 'forearms', 'beginner', 4),
  ('reverse-curl', 'Rosca Inversa', 'forearms', 'intermediate', 5),

  -- Pernas/Quadríceps (Legs/Quads)
  ('squat', 'Agachamento', 'legs', 'intermediate', 1),
  ('leg-press', 'Leg Press', 'legs', 'beginner', 2),
  ('leg-extension', 'Cadeira Extensora', 'legs', 'beginner', 3),
  ('lunges', 'Afundo', 'legs', 'beginner', 4),
  ('bulgarian-split-squat', 'Agachamento Búlgaro', 'legs', 'intermediate', 5),

  -- Posterior (Hamstrings)
  ('leg-curl', 'Mesa Flexora', 'hamstrings', 'beginner', 1),
  ('romanian-deadlift', 'Levantamento Terra Romeno', 'hamstrings', 'intermediate', 2),
  ('good-morning', 'Good Morning', 'hamstrings', 'intermediate', 3),
  ('nordic-curl', 'Nordic Curl', 'hamstrings', 'advanced', 4),
  ('single-leg-deadlift', 'Levantamento Terra Unilateral', 'hamstrings', 'intermediate', 5),

  -- Glúteos (Glutes)
  ('hip-thrust', 'Elevação de Quadril', 'glutes', 'beginner', 1),
  ('glute-bridge', 'Ponte de Glúteo', 'glutes', 'beginner', 2),
  ('cable-kickback', 'Coice no Cabo', 'glutes', 'beginner', 3),
  ('sumo-squat', 'Agachamento Sumo', 'glutes', 'intermediate', 4),
  ('step-up', 'Step Up', 'glutes', 'beginner', 5),

  -- Panturrilha (Calves)
  ('standing-calf-raise', 'Elevação de Panturrilha em Pé', 'calves', 'beginner', 1),
  ('seated-calf-raise', 'Elevação de Panturrilha Sentado', 'calves', 'beginner', 2),
  ('donkey-calf-raise', 'Elevação de Panturrilha Burro', 'calves', 'intermediate', 3),
  ('jump-rope', 'Pular Corda', 'calves', 'beginner', 4),
  ('box-jump', 'Salto na Caixa', 'calves', 'intermediate', 5),

  -- Abdômen (Abs)
  ('crunches', 'Abdominal Reto', 'abs', 'beginner', 1),
  ('plank', 'Prancha', 'abs', 'beginner', 2),
  ('russian-twist', 'Abdominal Russo', 'abs', 'intermediate', 3),
  ('leg-raises', 'Elevação de Pernas', 'abs', 'intermediate', 4),
  ('bicycle-crunches', 'Abdominal Bicicleta', 'abs', 'beginner', 5),

  -- Full Body
  ('burpees', 'Burpees', 'fullbody', 'intermediate', 1),
  ('clean-and-press', 'Arranque e Desenvolvimento', 'fullbody', 'advanced', 2),
  ('thrusters', 'Thrusters', 'fullbody', 'intermediate', 3),
  ('mountain-climbers', 'Escalador', 'fullbody', 'beginner', 4),
  ('kettlebell-swing', 'Balanço com Kettlebell', 'fullbody', 'intermediate', 5),

  -- Cardio
  ('running', 'Corrida', 'cardio', 'beginner', 1),
  ('cycling', 'Ciclismo', 'cardio', 'beginner', 2),
  ('rowing', 'Remada (Cardio)', 'cardio', 'intermediate', 3),
  ('swimming', 'Natação', 'cardio', 'intermediate', 4),
  ('jump-rope-cardio', 'Pular Corda', 'cardio', 'beginner', 5)
ON CONFLICT (id) DO NOTHING;

-- Tabela é pública (read-only para todos)
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- Policy: Todos podem ler exercícios ativos
CREATE POLICY "Anyone can view active exercises"
  ON exercises
  FOR SELECT
  USING (is_active = true);

-- Function para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_exercises_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
CREATE TRIGGER update_exercises_updated_at_trigger
  BEFORE UPDATE ON exercises
  FOR EACH ROW
  EXECUTE FUNCTION update_exercises_updated_at();

-- Comentários para documentação
COMMENT ON TABLE exercises IS 'Exercícios disponíveis no app';
COMMENT ON COLUMN exercises.id IS 'Identificador único (em inglês)';
COMMENT ON COLUMN exercises.name IS 'Nome em português';
COMMENT ON COLUMN exercises.name_en IS 'Nome em inglês (opcional)';
COMMENT ON COLUMN exercises.muscle_group_id IS 'Referência ao grupo muscular';
COMMENT ON COLUMN exercises.description IS 'Descrição ou instruções do exercício';
COMMENT ON COLUMN exercises.difficulty IS 'Nível de dificuldade';
COMMENT ON COLUMN exercises.equipment IS 'Equipamentos necessários (array)';
COMMENT ON COLUMN exercises.display_order IS 'Ordem de exibição na lista';
COMMENT ON COLUMN exercises.is_active IS 'Se o exercício está ativo/visível no app';
