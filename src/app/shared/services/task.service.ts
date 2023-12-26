import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Task } from '../interfaces/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  createTask() {}

  getAllTasks() {
    return this.http.get<Task[]>(`${environment.baseApiUrl}/tasks`);
  }

  changeTaskStatusById(taskId: number, taskStatus: string): Observable<any> {
    const url = `${environment.baseApiUrl}/tasks/${taskId}`;
    const body = { status: `${taskStatus}` };

    return this.http.patch(url, body);
  }
}
