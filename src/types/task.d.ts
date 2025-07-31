export type Priority = 'Should' | 'Must' | 'Could' | 'Would' | 'None';

//actually theres no need for an array of default habits, but it can be useful for testing
export const defaultHabits: string[] = [
  'Read',
  'Exercise',
  'Socialize',
  'Mindfulness',
  'Sleep',
  'Healthy Eating',
  'Profesional Life',
  'Personal Projects',
];

export interface User {
  id: string; // unique identifier
  email: string; // user email
  nickname?: string | null; // obligatory nickname
  created_at: string; // timestamp when the user was created
  updated_at: string; // timestamp when the user was last updated
  // TODO user-related fields after MVP
}

export interface Task {
  id: number; // unique identifier
  list_pos: number; // position in the tasklist
  title: string; //task title
  description?: string | null; //task description
  priority: Priority | null; // priority category | must, should, could, would, none(null)
  habit_category_id: number | null // FK a Habit_category
  completed: boolean; // indicates if the task is completed
  completed_at?: string | null; // timestamp when the task was completed, null if not completed
  created_at: string; // timestamp when the task was created
  updated_at: string; // timestamp when the task was last updated
  habit_id?: number | null; // optional, if the task is linked to a habit | forean key to Habit table
  habit_list_pos?: number | null; // position in the habit list, if applicable | forean key to Habit table
  user_id?: string; // optional, if the task is linked to a user | foreign key to User table
}

export interface Routine { //list of tasks
  id: string; // unique identifier
  title: string; //routine title
  description?: string | null; //routine description
  priority: Priority | null; // priority category | must, should, could, would, none(null )
  habit_category_id: number | null // FK a Habit_category
  completed: boolean; // bonus points if the routine is completed
  completed_at?: string | null; // timestamp when the habit was completed, null if not completed
  created_at: string; // timestamp when the habit was created
  updated_at: string; // timestamp when the habit was last updated
  task_id: string | null; //the habit must be linked to a task | foreign key to Task table
  task_list_pos: number | null; // position in the task list, if applicable | foreign key to Task table 
  user_id?: string; // optional, if the routine is linked to a user | foreign key to User table
}

export interface Session { //list of routines that can be completed in a morning, afternoon, evening
  id: string; // unique identifier
  title: string; // session title morning, afternoon, evening
  completed: boolean; // indicates if the session is completed
  completed_at?: string | null; // timestamp when the session was completed, null if not completed
  created_at: string; // timestamp when the session was created
  updated_at: string; // timestamp when the session was last updated
  routine_id: string | null; // the session must be linked to a routine | foreign key to Routine table
  routine_list_pos: number | null; // position in the routine list, if applicable | foreign key to Routine table
  user_id?: string; // foreign key to User table
}

export interface Habit {
  id: string; // unique identifier
  title: string; // habit title
  porpouse?: string | null; // habit description
  priority: Priority | null; // priority category | must, should, could, would, none(null)
  habit_points: number; // points awarded for completing tasks related to this habit | a habit is never completed, only progress is tracked 
  user_id?: string; // foreign key to User table
}

//secondary types 
export interface Routine_Task { //agrup tasks in a routine | avoids conflicts
  id: string,
  routine_id: string,  // FK a Routine
  task_id: string,     // FK a Task
  position: number     // orden dentro de la rutina
}

export interface Routine_session { //agrup sessions in a routine | avoids conflicts
  id: string,
  routine_id: string,  // FK a Routine
  session_id: string,  // FK a Session 
  position: number     // orden dentro de la rutina
}

export interface Habit_category {
  id: number,
  name: string,              // e.g., "Health", "Work"
  purpose?: string | null,   // optional description
  icon?: string | null,      // optional UI icon name
  color?: string | null,     // optional color (hex o nombre)
  created_at: string,
  updated_at: string
}

export type NewTask = Pick<Task, 'title' | 'description' | 'priority' | 'list_pos'>;