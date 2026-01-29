import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../model/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  private readonly apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  loadTasks() {
    this.http.get<Task[]>(this.apiUrl)
      .subscribe(tasks => this.tasksSubject.next(tasks));
  }
}
