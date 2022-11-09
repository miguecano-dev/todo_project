export class Todo {
  // method to convert json to Instance of TODO
  static fromJson({ id, name, completed, created_at }) {
    const tempTodo = new Todo(name)

    tempTodo.id = id
    tempTodo.completed = completed
    tempTodo.created_at = created_at

    return tempTodo
  }

  constructor(todo) {
    this.name = todo
    this.id = new Date().getTime()
    this.completed = false
    this.created_at = new Date()
  }
}
