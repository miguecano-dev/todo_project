import './styles.css'
import { TodoList } from './classes'
import { divHtml } from './js/component'

export const todoList = new TodoList()

todoList.todos.forEach(divHtml)
