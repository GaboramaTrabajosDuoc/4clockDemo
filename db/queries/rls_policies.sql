--TODO find a way to automate integration to supabase after MVP

--important:
-- this file contain policies for row level security (RLS) in the database
-- crucial for supabase integration and security


-- Habilitar RLS en tablas principales
ALTER TABLE Task ENABLE ROW LEVEL SECURITY;
ALTER TABLE Routine ENABLE ROW LEVEL SECURITY;
ALTER TABLE Session ENABLE ROW LEVEL SECURITY;
ALTER TABLE Habit ENABLE ROW LEVEL SECURITY;

-- Políticas para Task
CREATE POLICY "Users can manage their own tasks"
  ON Task
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Políticas para Routine
CREATE POLICY "Users can manage their own routines"
  ON Routine
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Políticas para Session
CREATE POLICY "Users can manage their own sessions"
  ON Session
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Políticas para Habit
CREATE POLICY "Users can manage their own habits"
  ON Habit
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
