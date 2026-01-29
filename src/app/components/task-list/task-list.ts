import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../model/Task';
import { TaskService } from '../../services/task.service';
import { NgForOf } from '@angular/common';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [NgForOf, AsyncPipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {

  tasks$: Observable<Task[]>;

   constructor(private taskService: TaskService) { 
    this.tasks$ = this.taskService.tasks$; }
}
