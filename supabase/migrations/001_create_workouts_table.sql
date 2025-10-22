-- Tabela de Treinos
CREATE TABLE IF NOT EXISTS workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  muscle_group TEXT NOT NULL,
  muscle_group_name TEXT NOT NULL,
  exercises JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  last_performed TIMESTAMP WITH TIME ZONE,
  times_completed INTEGER DEFAULT 0 NOT NULL
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS workouts_user_id_idx ON workouts(user_id);
CREATE INDEX IF NOT EXISTS workouts_created_at_idx ON workouts(created_at DESC);
CREATE INDEX IF NOT EXISTS workouts_muscle_group_idx ON workouts(muscle_group);

-- RLS (Row Level Security) - Cada usuário só vê seus próprios treinos
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

-- Policy: Usuários podem ver apenas seus próprios treinos
CREATE POLICY "Users can view own workouts"
  ON workouts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Usuários podem inserir seus próprios treinos
CREATE POLICY "Users can insert own workouts"
  ON workouts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Usuários podem atualizar seus próprios treinos
CREATE POLICY "Users can update own workouts"
  ON workouts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Usuários podem deletar seus próprios treinos
CREATE POLICY "Users can delete own workouts"
  ON workouts
  FOR DELETE
  USING (auth.uid() = user_id);

-- Comentários para documentação
COMMENT ON TABLE workouts IS 'Armazena os treinos criados pelos usuários';
COMMENT ON COLUMN workouts.exercises IS 'Array JSON com configuração de exercícios (id, name, sets, reps, rest)';
COMMENT ON COLUMN workouts.muscle_group IS 'ID do grupo muscular';
COMMENT ON COLUMN workouts.muscle_group_name IS 'Nome do grupo muscular';
