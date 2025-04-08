import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [ReactiveFormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']

})


export class TaskListComponent {
  @Output() taskInfo = new EventEmitter<{ task: string; descripcion: string; fecha: string }>();

  ngOnInit(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }


  title = 'Task List';
  tasks: string[] = [];

  descripcion: string = '';
  fecha: string = '';
  newTask: string = '';

  userForm!:FormGroup;
  
constructor( private formBuilder: FormBuilder) {
  this.userForm = this.formBuilder.group(
    {
    tarea: ['',[Validators.required, Validators.minLength(5)]],
    descripcion: ['',[Validators.required, Validators.minLength(10)]],
    fecha: ['',[Validators.required]]
  });
}
  

sendTaskInfo() {
  const taskData = {
    task: '',
    descripcion: '',
    fecha: ''
  };
  this.taskInfo.emit(taskData);
}


//metodo para guardar tareas en el local storage
  addTask(task: string) {
    if (!task) {
      console.error('Task is empty or undefined');
      return;
    }
     const newTask = {
    task: this.userForm.value.tarea,
    descripcion: this.userForm.value.descripcion,
    fecha: this.userForm.value.fecha
  };
  this.tasks.push(newTask.task);
  localStorage.setItem('tasks', JSON.stringify(this.tasks));
  this.taskInfo.emit(newTask); // Emitir la nueva tarea al componente padre
}


  updateTask(task: string) {
    console.log('Updating task:', task);
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks[index] = task;
    }
  }


  deleteTask(task: string) {
    console.log('Deleting task:', task);
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.tasks.splice(index, 1); // Eliminar la tarea del array
      localStorage.setItem('tasks', JSON.stringify(this.tasks)); // Actualizar el localStorage
      console.log('Tarea eliminada y localStorage actualizado:', this.tasks);
    } else {
      console.error('Tarea no encontrada:', task);
    }
  }



  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Formulario válido:', this.userForm.value);
      this.addTask(this.userForm.value.tarea);
    } else {
      console.error('Formulario inválido');
    }
  }
}

