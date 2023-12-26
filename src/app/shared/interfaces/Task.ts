export interface Task {
  id: number;
  title: string;
  status: 'todo' | 'inProgress' | 'done';
  color: string;
}
