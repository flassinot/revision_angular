import { Component } from '@angular/core';
import { TaskList } from "../../components/task-list/task-list";

@Component({
  selector: 'app-board',
  imports: [TaskList],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {

}
