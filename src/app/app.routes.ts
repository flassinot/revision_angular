import { Routes } from '@angular/router';
import { Board } from './pages/board/board';
import { EditTask } from './pages/edit-task/edit-task';
import { AddTask } from './components/add-task/add-task';

export const routes: Routes = [
  { path: '', redirectTo: 'board', pathMatch: 'full' },
  { path: 'board', component: Board },
  { path: 'task/:id/edit', component: EditTask },
  { path: 'add', component: AddTask },
  { path: '**', redirectTo: 'board' }
];
