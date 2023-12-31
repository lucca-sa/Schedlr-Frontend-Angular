import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss',
})
export class NewTaskPopupComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<any>();

  createTaskForm!: FormGroup;
  

  taskNameControl!: AbstractControl;
  taskStatusControl!: AbstractControl;
  taskColorControl!: AbstractControl;

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    this.createTaskForm = this.formBuilder.group({
      taskName: ['', [Validators.required]],
      taskStatus: ['', [Validators.required]],
      taskColor: ['#ffffff', [Validators.required]],
    });

    this.taskNameControl = this.createTaskForm.get('taskName')!;
    this.taskStatusControl = this.createTaskForm.get('taskStatus')!;
    this.taskColorControl = this.createTaskForm.get('taskColor')!;
  }

  createNewTask() {
    if (this.createTaskForm.valid) {
      this.taskService.createTask(this.createTaskForm.value).subscribe(
        () => {
          // Emite o evento somente após a solicitação ser concluída com sucesso
          this.onSubmit.emit();
        },
        (error) => {
          // Lida com erros, se necessário
          console.error('Erro ao criar tarefa:', error);
        }
      );
    } else {
      console.log('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }


  hideNewTaskForm() {
    this.closePopup.emit()
  }
}
