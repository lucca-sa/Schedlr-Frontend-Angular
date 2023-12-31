import { Component } from '@angular/core';

import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Task } from '../../shared/interfaces/Task';
import { TaskService } from '../../shared/services/task.service';
import { NewTaskComponent } from '../../shared/component/new-task/new-task.component';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CommonModule, NewTaskComponent],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss',
})
export default class TaskBoardComponent {
  allTasks: Task[] = [];
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.showAllTasks();
  }

  showAllTasks() {
    this.taskService.getAllTasks().subscribe((res: any) => {
      this.allTasks = res;

      this.allTasks.forEach((task) => {
        if (task.status === 'todo') {
          this.todo.push(task);
        } else if (task.status === 'inProgress') {
          this.inProgress.push(task);
        } else if (task.status === 'done') {
          this.done.push(task);
        }
      });
    });
  }

  drop(
    event: CdkDragDrop<Task[]>,
    targetStatus: 'todo' | 'inProgress' | 'done'
  ) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Atualiza o status da tarefa após mover para outra lista
      const movedTask = event.container.data[event.currentIndex];
      movedTask.status = targetStatus;

      // Chama a função para atualizar o status no servidor
      this.taskService
        .changeTaskStatusById(movedTask.id, targetStatus)
        .subscribe();
    }
  }
}
