import { Task } from './../../model/Task';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task.html'
})
export class AddTask implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      title: ['', Validators.required],
      description: [''],
      status: <Task['status']>'todo'
    });
  }

  save(): void {
    if (this.form.invalid) return;

    const task: Omit<Task, 'id'> = this.form.getRawValue(); 
    this.taskService.addTask(task).subscribe(() => {
      this.router.navigate(['/board']);
    });
  }
}
