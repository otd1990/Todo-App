import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useTodosStore } from '@/stores/todos'
import AddTodo from '../AddTodo.vue'

describe('AddTodo component', () => {
  let wrapper, todosStore

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    todosStore = useTodosStore()

    todosStore.$patch({
      todos: []
    })

    wrapper = mount(AddTodo, {
      global: {
        plugins: [pinia]
      }
    })
  })

  it('isOpen should be false', () => {
    expect(wrapper.props().isOpen).toBe(false)
  })

  it('should interact with the store', () => {
    expect(todosStore.todos).toHaveLength(0)

    todosStore.addTodo({
      id: '1',
      title: 'Test todo',
      desc: 'Test description',
      status: 'new',
      date: new Date()
    })
    expect(todosStore.todos).toHaveLength(1)
  })
})
