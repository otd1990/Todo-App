<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useTodosStore } from '@/stores/todos'
import TodoList from '@/components/ui/todo-list/TodoList.vue'
import ButtonComponent from '../button-component/ButtonComponent.vue'

const props = defineProps<{ title: string }>()
const emit = defineEmits(['add-todo'])
const todosStore = useTodosStore()

onMounted(() => {
  todosStore.getTodos()
})

const filteredTodos = computed(() => {
  if (props.title === 'New Todos') {
    return todosStore.newTodos
  } else if (props.title === 'In Progress') {
    return todosStore.inProgressTodos
  } else if (props.title === 'Completed') {
    return todosStore.completedTodos
  }
  return []
})

const addNewTodo = () => {
  emit('add-todo')
}
</script>

<template>
  <section :class="`todo-section todo-section--${title} rounded-md`">
    <div class="todo-section__header flex flex-wrap items-center justify-between gap-1">
      <h2 class="todo-section__title">{{ title }}</h2>
      <ButtonComponent
        v-if="title === 'New Todos'"
        @click="addNewTodo"
        variant="outline"
        size="xs"
        class="todo-section__add-button"
      >
        <div class="todo-section__add-icon">+</div>
        <div class="todo-section__add-button-text">Add Todo</div>
      </ButtonComponent>
    </div>
    <TodoList :todos="filteredTodos" />
  </section>
</template>

<style lang="scss" src="./scss/todo-section.scss" />
