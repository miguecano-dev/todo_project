import { Todo } from './todo.class'

export class TodoList {
  constructor() {
    this.todos = []
    this.loadLocalStorage()
  }

  addTodo(todo) {
    this.todos.push(todo)
    this.saveLocalStorage()
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id != id)
    this.saveLocalStorage()
  }

  completedTodo(id) {
    for (const todo of this.todos) {
      if (todo.id == id) {
        todo.completed = !todo.completed
        this.saveLocalStorage()
        break
      }
    }
  }
  deleteAllTodos() {
    this.todos = this.todos.filter((todo) => !todo.completed)
    this.saveLocalStorage()
  }

  saveLocalStorage() {
    localStorage.setItem('todo', JSON.stringify(this.todos))
  }

  loadLocalStorage() {
    this.todos = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : []
    this.todos = this.todos.map(Todo.fromJson)
  }
}
