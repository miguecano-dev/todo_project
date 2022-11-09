import { Todo } from '../classes'
import { todoList } from '../index'

const divToFill = document.querySelector('.todo-list')
const txtInput = document.querySelector('.new-todo')
const btnBorrar = document.querySelector('.clear-completed')
const filtersTodos = document.querySelector('.filters')
const anchorFilters = document.querySelectorAll('.filter')

export const divHtml = (todo) => {
  const newElement = `<li class="${todo.completed ? 'completed' : ''}" data-id="${todo.id} ">
        <div class="view">
            <input class="toggle" type="checkbox" ${todo.completed ? 'checked' : ''}>
            <label>${todo.name}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`
  const div = document.createElement('div')
  div.innerHTML = newElement
  divToFill.append(div.firstElementChild)
  return div.firstElementChild
}

// event listener
txtInput.addEventListener('keyup', (event) => {
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    const addTodo = new Todo(txtInput.value)
    todoList.addTodo(addTodo)
    divHtml(addTodo)
    txtInput.value = ''
  }
})

// update completed
divToFill.addEventListener('click', (event) => {
  const nameElement = event.target.localName
  const elementLi = event.target.parentElement.parentElement
  const attributeId = elementLi.getAttribute('data-id')

  if (nameElement.includes('input')) {
    todoList.completedTodo(attributeId)
    elementLi.classList.toggle('completed')
  } else if (nameElement.includes('button')) {
    todoList.removeTodo(attributeId)
    divToFill.removeChild(elementLi)
  }
})

// delete all elements completed
btnBorrar.addEventListener('click', () => {
  todoList.deleteAllTodos()
  for (let i = divToFill.children.length - 1; i >= 0; i--) {
    const element = divToFill.children[i]
    if (element.classList.contains('completed')) {
      divToFill.removeChild(element)
    }
  }
})

// filter all elements in state pending or completed
filtersTodos.addEventListener('click', (event) => {
  const filter = event.target.text
  if (!filter) return

  anchorFilters.forEach((elem) => elem.classList.remove('selected'))
  event.target.classList.add('selected')

  for (const element of divToFill.children) {
    element.classList.remove('hidden')
    const completed = element.classList.contains('completed')
    switch (filter) {
      case 'Pending(s)':
        if (completed) {
          element.classList.add('hidden')
        }
        break
      case 'Completed':
        if (!completed) {
          element.classList.add('hidden')
        }
        break
    }
  }
})
