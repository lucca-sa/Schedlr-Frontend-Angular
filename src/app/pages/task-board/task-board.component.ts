import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DeleteTaskPopupComponent } from '../../shared/components/delete-task-popup/delete-task-popup.component';
import { NewTaskPopupComponent } from '../../shared/components/new-task-popup/new-task.component';
import { Task } from '../../shared/interfaces/Task';
import { TaskService } from '../../shared/services/task.service';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [CdkDropList, CdkDrag, CommonModule, NewTaskPopupComponent, DeleteTaskPopupComponent],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss',
})
export default class TaskBoardComponent {
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  isNewTaskPopupVisible: boolean = false;
  isDeleteTaskPopupVisible: boolean = false;
  taskToDeleteId: number = 0;

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

  hideDeleteTaskPopup() {
    this.isDeleteTaskPopupVisible = false;
  }

  hideNewTaskPopup() {
    this.isNewTaskPopupVisible = false;
  }

  showForm() {
    this.isNewTaskPopupVisible = true;
  }

  handleFormSubmission() {
    this.refreshTasks()
    this.hideNewTaskPopup()
  }

  refreshTasks() {
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


  deleteTask(taskId: number) {
    this.isDeleteTaskPopupVisible = true;
    this.taskToDeleteId = taskId; 
  }
  
}