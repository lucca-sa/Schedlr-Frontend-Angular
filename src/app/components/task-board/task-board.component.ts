import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NewTaskComponent } from '../../shared/component/new-task/new-task.component';
import { Task } from '../../shared/interfaces/Task';
import { TaskService } from '../../shared/services/task.service';

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

  isNewTaskFormVisible: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasksByStatus('todo').subscribe((tasks) => {
      this.todo = tasks;
    });

    this.taskService.getTasksByStatus('inProgress').subscribe((tasks) => {
      this.inProgress = tasks;
    });

    this.taskService.getTasksByStatus('done').subscribe((tasks) => {
      this.done = tasks;
    });
  }

  drop(event: CdkDragDrop<Task[]>, targetStatus: 'todo' | 'inProgress' | 'done') {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.previousContainer.data && event.container.data) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );

        const movedTask = event.container.data[event.currentIndex];
        movedTask.status = targetStatus;

        this.taskService.changeTaskStatusById(movedTask.id, targetStatus).subscribe();
      }
    }
  }

  

  hideForm() {
    this.isNewTaskFormVisible = false;
  }

  showForm() {
    console.log('clico');
    this.isNewTaskFormVisible = true;
  }

  handleFormSubmission() {
    this.taskService.getTasksByStatus('todo').subscribe((tasks) => {
      this.todo = tasks;
    });

    this.taskService.getTasksByStatus('inProgress').subscribe((tasks) => {
      this.inProgress = tasks;
    });

    this.taskService.getTasksByStatus('done').subscribe((tasks) => {
      this.done = tasks;
    });

    this.hideForm()
  }
}