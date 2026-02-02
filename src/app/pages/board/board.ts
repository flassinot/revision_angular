import { Component } from '@angular/core';
import { TaskList } from "../../components/task-list/task-list";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-board',
  imports: [TaskList, RouterModule],
  templateUrl: './board.html',
  styleUrl: './board.scss',
})
export class Board {

}
