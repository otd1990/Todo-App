<script setup lang="ts">
import { ref } from 'vue'
import { useTodosStore } from '@/stores/todos'
import ButtonComponent from '../button-component/ButtonComponent.vue'
import AppModal from '@/components/ui/app-modal/AppModal.vue'

interface IAddTodoProps {
  isOpen?: boolean
}

withDefaults(defineProps<IAddTodoProps>(), {
  isOpen: false
})

const emit = defineEmits<{
  (e: 'modal-close'): void
}>()

const store = useTodosStore()
const todo = ref('')
const todoDesc = ref('')
const showError = ref(false)

const resetRefs = () => {
  todo.value = ''
  todoDesc.value = ''
  showError.value = false
}

const addTodo = () => {
  if (todo.value === '') {
    showError.value = true
    return
  }
  const newTodos = {
    id: Date.now().toString(),
    title: todo.value,
    desc: todoDesc.value || '',
    status: 'new',
    date: new Date()
  }
  store.addTodo(newTodos)
  emit('modal-close')
  resetRefs()
}
</script>

<template>
  <AppModal :is-open="isOpen">
    <template #content>
      <section class="add-todo__input mb-2">
        <p v-if="showError" class="text-red-500 text-center mb-2">Please Enter A Title</p>
        <div class="add-todo__input-container">
          <label for="addTodoInput" class="block mb-1 text-sm">Add To Do</label>
          <input
            v-model="todo"
            type="text"
            name="add-todo-input"
            id="addTodoInput"
            class="add-todo__input-input border border-solid rounded-md p-1 w-full"
            @keyup.enter.prevent="addTodo"
          />
        </div>
      </section>
      <section class="add-todo__desc">
        <div class="add-todo__desc-container">
          <label for="addTodoDesc" class="block mb-1 text-sm">Details</label>
          <textarea
            v-model="todoDesc"
            name="add-todo-desc"
            id="addTodoDesc"
            class="add-todo__desc border border-solid rounded-md p-1 w-full"
            rows="5"
            cols="33"
            @keyup.enter.prevent="addTodo"
          />
        </div>
      </section>
    </template>
    <template #buttons>
      <section class="flex items-center justify-between">
        <ButtonComponent
          @click="$emit('modal-close')"
          variant="destructive"
          size="sm"
          class="add-todo__input-button block"
        >
          Close
        </ButtonComponent>
        <ButtonComponent
          @click="addTodo"
          variant="default"
          size="sm"
          class="add-todo__input-button block"
        >
          Add Todo
        </ButtonComponent>
      </section>
    </template>
  </AppModal>
</template>
