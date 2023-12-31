import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { NewTask, NewTaskFromForm, Task } from '../interfaces/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  createTask(taskDetails: NewTaskFromForm) {
    const body: NewTask = {title: taskDetails.taskName, status: taskDetails.taskStatus, color: taskDetails.taskColor}
    console.log(body)
    return this.http.post<Task>(`${environment.baseApiUrl}/tasks`, body)
  }

  getAllTasks() {
    return this.http.get<Task[]>(`${environment.baseApiUrl}/tasks`);
  }

  getTasksByStatus(taskStatus: string){
    return this.http.get<Task[]>(`${environment.baseApiUrl}/tasks?status=${taskStatus}`)
  }

  changeTaskStatusById(taskId: number, taskStatus: string){
    const url = `${environment.baseApiUrl}/tasks/${taskId}`;
    const body = { status: `${taskStatus}` };

    return this.http.patch(url, body);
  }
}
