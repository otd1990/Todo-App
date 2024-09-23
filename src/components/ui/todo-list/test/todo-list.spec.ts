import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import TodoList from '../TodoList.vue'
import { useTodosStore } from '@/stores/todos'

const todos = [
  { id: '1', title: 'Todo 1', desc: 'Description 1', status: 'new', date: new Date() },
  { id: '2', title: 'Todo 2', desc: 'Description 2', status: 'new', date: new Date() }
]

describe('TodoList component', () => {
  let wrapper, todosStore

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    todosStore = useTodosStore()
    wrapper = mount(TodoList, {
      props: {
        todos: null
      },
      global: {
        plugins: [pinia]
      }
    })
  })

  it('should display no todos when the prop is null', () => {
    const todoItems = wrapper.findAll('.todo-list__item')
    expect(todoItems).toHaveLength(0)
  })

  it('should display todos when two are added', async () => {
    todos.forEach((todo) => todosStore.addTodo(todo))

    await wrapper.setProps({ todos: todosStore.todos })

    const todoItems = wrapper.findAll('.todo-list__item')
    expect(todoItems).toHaveLength(2)
    expect(todoItems[0].text()).toContain('Todo 1')
    expect(todoItems[1].text()).toContain('Todo 2')
  })

  it('should delete a todo when delete button is clicked', async () => {
    todos.forEach((todo) => todosStore.addTodo(todo))

    todosStore.removeTodo('1')

    await wrapper.setProps({ todos: todosStore.todos })

    const deleteButton = wrapper.find('.todo-list__item .add-todo__input-button')
    await deleteButton.trigger('click')

    expect(todosStore.todos).toHaveLength(1)
  })

  it('should mark a todo as completed when update button is clicked', async () => {
    const todoToUpdate = {
      id: '1',
      title: 'Todo 1',
      desc: 'Description 1',
      status: 'new',
      date: new Date()
    }
    todosStore.addTodo(todoToUpdate)

    await wrapper.setProps({ todos: todosStore.todos })

    const updateButton = wrapper.find('.todo-list__item .add-todo__input-button:nth-child(2)')
    await updateButton.trigger('click')

    expect(todosStore.todos[0].status).toBe('in progress')

    await updateButton.trigger('click')
    expect(todosStore.todos[0].status).toBe('completed')
  })
})
