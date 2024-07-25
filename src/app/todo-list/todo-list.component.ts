import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TodoItem {
  id: number;
  task: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  todoList: TodoItem[] = [];
  newTask: string = '';
  newDescription: string = '';

  ngOnInit() {
    // Initialisation du tableau avec des tâches par défaut si nécessaire
    // this.todoList = [
    //   { id: 1, task: 'Exemple de tâche', description: 'Description de l\'exemple', completed: false }
    // ];
  }

  addTask() {
    if (this.newTask.trim() !== '' && this.newDescription.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: this.newTask.trim(),
        completed: false,
        description: this.newDescription.trim(),
      };
      this.todoList.push(newTodoItem);
      this.newTask = '';
      this.newDescription = '';
    }
  }

  deleteTask(id: number) {
    this.todoList = this.todoList.filter(item => item.id !== id);
  }

  toggleCompleted(id: number) {
    const todoItem = this.todoList.find(item => item.id === id);
    if (todoItem) {
      todoItem.completed = !todoItem.completed;
    }
  }
}