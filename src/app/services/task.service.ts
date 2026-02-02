import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Task } from '../model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly apiUrl = 'http://localhost:3000/tasks';

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  /** Charge toutes les tâches depuis le backend */
  loadTasks(): void {
    this.http.get<Task[]>(this.apiUrl)
      .subscribe(tasks => this.tasksSubject.next(tasks));
  }

  /** Ajoute une tâche */
  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(newTask => {
        const current = this.tasksSubject.value;
        this.tasksSubject.next([...current, newTask]);
      })
    );
  }

  /** Met à jour une tâche */
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).pipe(
      tap(updated => {
        const current = this.tasksSubject.value;
        const updatedList = current.map(t => t.id === updated.id ? updated : t);
        this.tasksSubject.next(updatedList);
      })
    );
  }

  /** Supprime une tâche */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const current = this.tasksSubject.value;
        this.tasksSubject.next(current.filter(t => t.id !== id));
      })
    );
  }

  /** Change le statut d’une tâche */
  moveTask(id: number, status: Task['status']): Observable<Task> {
    const task = this.tasksSubject.value.find(t => t.id === id);
    if (!task) throw new Error('Task not found');

    const updated = { ...task, status };
    return this.updateTask(updated);
  }

  /** Récupère une tâche par ID */
  getTaskById(id: number): Observable<Task | undefined> {
    return this.tasks$.pipe(
      map(tasks => tasks.find(t => t.id === id))
    );
  }
}
