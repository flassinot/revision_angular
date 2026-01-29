import { TaskService } from './services/task.service';
import { Task } from './model/Task';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskList } from "./components/task-list/task-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('taskboard');

  constructor(taskService: TaskService) {
    taskService.loadTasks();
  }
}
