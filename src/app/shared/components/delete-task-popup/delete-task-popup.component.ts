import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-delete-task-popup',
  standalone: true,
  imports: [],
  templateUrl: './delete-task-popup.component.html',
  styleUrl: './delete-task-popup.component.scss'
})
export class DeleteTaskPopupComponent {
  @Output() closeDeletePopup = new EventEmitter<any>();
  @Output() refreshTasks = new EventEmitter<any>();
  @Input() taskId!: number; 
  
  constructor(private taskService: TaskService){}

  deleteTask() {
    this.taskService.deleteTaskById(this.taskId).subscribe(() => {
      this.refreshTasks.emit()
      this.closeDeletePopup.emit();
    });
  }
  
  hideDeleteTaskPopup() {
    this.closeDeletePopup.emit()
  }
}
