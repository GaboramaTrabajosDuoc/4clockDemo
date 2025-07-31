--TODO find a way to automate integration to supabase after MVP

--important:
-- complete ER model for supabase integration


-- Tabla de usuarios
CREATE TABLE "User" (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    nickname TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- Tabla de categorías de hábito
CREATE TABLE Habit_category (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    purpose TEXT,
    icon TEXT,
    color TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

-- Tabla de hábitos
CREATE TABLE Habit (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    porpouse TEXT,
    priority TEXT CHECK (priority IN ('Must', 'Should', 'Could', 'Would', 'None')),
    habit_points INTEGER DEFAULT 0,
    user_id UUID REFERENCES "User"(id)
);

-- Tabla de tareas
CREATE TABLE Task (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    list_pos INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT CHECK (priority IN ('Must', 'Should', 'Could', 'Would', 'None')),
    habit_category_id BIGINT REFERENCES Habit_category(id),
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    habit_id UUID REFERENCES Habit(id),
    habit_list_pos INTEGER,
    user_id UUID REFERENCES "User"(id)
);

-- Tabla de rutinas
CREATE TABLE Routine (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT CHECK (priority IN ('Must', 'Should', 'Could', 'Would', 'None')),
    habit_category_id BIGINT REFERENCES Habit_category(id),
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    task_id BIGINT REFERENCES Task(id),
    task_list_pos INTEGER,
    user_id UUID REFERENCES "User"(id)
);

-- Tabla de sesiones
CREATE TABLE Session (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    routine_id UUID REFERENCES Routine(id),
    routine_list_pos INTEGER,
    user_id UUID REFERENCES "User"(id)
);

-- Tabla intermedia Routine_Task
CREATE TABLE Routine_Task (
    id UUID PRIMARY KEY,
    routine_id UUID REFERENCES Routine(id) ON DELETE CASCADE,
    task_id BIGINT REFERENCES Task(id) ON DELETE CASCADE,
    position INTEGER
);

-- Tabla intermedia Routine_Session
CREATE TABLE Routine_Session (
    id UUID PRIMARY KEY,
    routine_id UUID REFERENCES Routine(id) ON DELETE CASCADE,
    session_id UUID REFERENCES Session(id) ON DELETE CASCADE,
    position INTEGER
);
