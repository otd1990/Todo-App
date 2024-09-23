<script setup lang="ts">
import { ref } from 'vue'
import TodoSection from '@/components/ui/todo-section/TodoSection.vue'
import AddTodo from '@/components/ui/add-todo/AddTodo.vue'

const isModalOpen = ref(false)

const handleAddTodo = () => {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const handleCloseModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = 'scroll'
}
</script>

<template>
  <div id="tc-vue-template" class="p-2">
    <section class="text-center">
      <h1 class="text-xl">Your Tasks</h1>
      <p>Below are a list of your tasks. You can; add, track and complete them here.</p>
    </section>
    <section class="app-list">
      <article class="flex flex-wrap gap-2 md:mt-2 mt-3">
        <TodoSection title="New Todos" @add-todo="handleAddTodo" />
        <TodoSection title="In Progress" />
        <TodoSection title="Completed" />
      </article>
    </section>
    <AddTodo :isOpen="isModalOpen" @modal-close="handleCloseModal" />
  </div>
</template>
