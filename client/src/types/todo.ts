export type TodoCategory = 'work' | 'personal' | 'study';

export interface Todo {
  _id: string;
  title: string;
  description: string;
  category: TodoCategory;
  completed: boolean;
  dueDate: string;
  createdAt?: string;
  updatedAt?: string;
  user?: string;
}

export interface CreateTodoInput {
  title: string;
  description: string;
  category: TodoCategory;
  dueDate: string;
}

export interface UpdateTodoInput extends Partial<CreateTodoInput> {
  completed?: boolean;
} 