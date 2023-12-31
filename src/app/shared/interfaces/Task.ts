export interface Task {
  id: number;
  title: string;
  status: 'todo' | 'inProgress' | 'done';
  color: string;
}

export interface NewTask {
  title: string;
  status: 'todo' | 'inProgress' | 'done';
  color: string;
}

export interface NewTaskFromForm {
  taskName: string;
  taskStatus: 'todo' | 'inProgress' | 'done';
  taskColor: string;
}
