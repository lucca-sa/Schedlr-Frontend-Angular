import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss',
})
export class NewTaskComponent implements OnInit {
  createTaskForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createTaskForm = this.formBuilder.group({
      taskName: ['', [Validators.required]],
      taskStatus: ['', [Validators.required]],
      taskColor: ['', [Validators.required]],
    });
  }

  createNewTask() {
    console.log(this.createTaskForm.value.taskColor);
  }
}
