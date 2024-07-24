import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TodoItem {
  id: number;
  task: string;
  description:string;
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
  newDescription: string='';


  ngOnInit(){
    const storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList) {
      this.todoList = JSON.parse(storedTodoList);
    }
  }

  addTask() {
    if (this.newTask.trim() !== '' &&  this.newDescription.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: this.newTask.trim(),
        completed: false,
        description:this.newDescription.trim(),
      };
      this.todoList.push(newTodoItem);
      this.newTask = '';
      this.newDescription='';
      this.saveTodoList();
    }
  }

  deleteTask(id: number){
    this.todoList = this.todoList.filter(item => item.id !== id);
    this.saveTodoList();
  }

  toggleCompleted(id: number){
    const todoItem = this.todoList.find(item => item.id === id);
    if (todoItem) {
      todoItem.completed = !todoItem.completed;
      this.saveTodoList();
    }
  }

  saveTodoList(){
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
}