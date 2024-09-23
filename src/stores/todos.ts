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

  const getTodosFromAPI = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      if (!res.ok) throw new Error('There was an error')
      const data = await res.json()

      const newTodos = data.map((todo) => {
        if (todo.completed) {
          return {
            ...todo,
            status: 'completed'
          }
        } else {
          return {
            ...todo,
            status: 'new'
          }
        }
      })

      todos.value = newTodos
    } catch (error) {
      console.error('There was an error fetching from API')
    }
  }

  const getTodos = () => {
    const storedTodos = localStorage.getItem('todolist')
    if (storedTodos !== null) {
      todos.value = JSON.parse(storedTodos)
    } else {
      getTodosFromAPI()
    }
  }

  const addTodo = (newTodo: Todo) => {
    todos.value.push(newTodo)
  }

  const removeTodo = (id: string) => {
    todos.value = todos.value.filter((todo) => todo.id !== id)
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
