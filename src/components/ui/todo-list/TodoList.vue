<script setup lang="ts">
import { ref } from 'vue'
import { useTodosStore } from '@/stores/todos'
import ButtonComponent from '@/components/ui/button-component/ButtonComponent.vue'
import AppModal from '../app-modal/AppModal.vue'

interface Todo {
  id: string
  title: string
  desc: string
  status: string
  date: Date
}

interface ITodoListProps {
  todos?: Todo[] | null
}

withDefaults(defineProps<ITodoListProps>(), {
  todos: null
})

const isOpen = ref(false)
let todoToDelete: string = ''

const todosStore = useTodosStore()

const getButtonText = (status: string) => {
  return status === 'new' ? 'Start' : 'Complete'
}

const prepareDelete = (id: string) => {
  todoToDelete = id
  isOpen.value = true
}

const handleDelete = () => {
  todosStore.removeTodo(todoToDelete)
  isOpen.value = false
  todoToDelete = ''
}

const handleDeleteCancel = () => {
  todoToDelete = ''
  isOpen.value = false
}

const handleUpdate = (id: string, status: string) => {
  let newStatus: string = ''
  switch (status) {
    case 'new':
      newStatus = 'in progress'
      break
    case 'in progress':
      newStatus = 'completed'
      break
    default:
      newStatus = status
      break
  }
  todosStore.updateTodoStatus(id, newStatus)
}
</script>

<template>
  <ul class="todo-list">
    <li v-for="todo in todos" :key="todo.id" class="todo-list__item rounded-md">
      <p class="todo-list__item-text">{{ todo.title }}</p>
      <p class="todo-list__item-desc">{{ todo.desc }}</p>
      <div class="todo-list__item-controls">
        <ButtonComponent
          @click="prepareDelete(todo.id)"
          variant="destructive"
          size="xs"
          class="add-todo__input-button"
          >Delete</ButtonComponent
        >
        <ButtonComponent
          v-if="todo.status !== 'completed'"
          @click="handleUpdate(todo.id, todo.status)"
          variant="secondary"
          size="xs"
          class="add-todo__input-button"
          >{{ getButtonText(todo.status) }}</ButtonComponent
        >
      </div>
    </li>
  </ul>
  <AppModal :is-open="isOpen">
    <template #content>
      <p class="my-4 text-center">Are you sure you want to delete this todo?</p>
    </template>
    <template #buttons>
      <section class="flex items-center justify-between">
        <ButtonComponent @click="handleDeleteCancel" variant="default" size="sm" class="block">
          Cancel
        </ButtonComponent>
        <ButtonComponent @click="handleDelete" variant="destructive" size="sm" class="block">
          Delete
        </ButtonComponent>
      </section>
    </template>
  </AppModal>
</template>

<style lang="scss" src="./scss/todo-list.scss" />
