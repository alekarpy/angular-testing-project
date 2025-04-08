import { Component, Input } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [TaskListComponent],
})
export class AppComponent {
  title = 'angular-testing-project';
  @Input() task: string = '';
  @Input() descripcion: string = '';
  @Input() fecha: string = '';

  tasks: { task: string; descripcion: string; fecha: string }[] = [];


  addTask(task: string, descripcion: string, fecha: string) {
    this.tasks.push({ task, descripcion, fecha });
  }

  deleteTask(task: string) {
  }

  getTasks(): string[] {
    return [];
  }
}
