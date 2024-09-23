import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

interface Todo {
  id: string
  title: string
  desc: string
  status: string
  date: Date
}

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([])

  const newTodos = computed(() => todos.value.filter((todo) => todo.status === 'new'))
  const inProgressTodos = computed(() =>
    todos.value.filter((todo) => todo.status === 'in progress')
  )
  const completedTodos = computed(() => todos.value.filter((todo) => todo.status === 'completed'))

  const getTodos = () => {
    const storedTodos = localStorage.getItem('todolist')
    if (storedTodos) {
      todos.value = JSON.parse(storedTodos)
    }
  }

  const addTodo = (newTodo: Todo) => {
    todos.value.push(newTodo)
  }

  const removeTodo = (id: string) => {
    console.log('Removing todo')
    todos.value = todos.value.filter((todo) => todo.id !== id)
    console.log('TODOS ', todos.value)
  }

  const updateTodoStatus = (id: string, status: string) => {
    const index = todos.value.findIndex((todo) => todo.id === id)
    if (index !== -1) {
      todos.value[index].status = status
    }
  }

  watch(
    todos,
    (newVal) => {
      localStorage.setItem('todolist', JSON.stringify(newVal))
    },
    { deep: true }
  )

  return {
    todos,
    newTodos,
    inProgressTodos,
    completedTodos,
    getTodos,
    addTodo,
    removeTodo,
    updateTodoStatus
  }
})
