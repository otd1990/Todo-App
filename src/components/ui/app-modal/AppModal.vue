<script setup lang="ts">
interface IAddTodoProps {
  isOpen?: boolean
}

withDefaults(defineProps<IAddTodoProps>(), {
  isOpen: false
})
</script>

<template>
  <Teleport to="body">
    <article
      v-if="isOpen"
      class="fixed top-0 left-0 flex items-center justify-center h-full w-full bg-black bg-opacity-50 flex-col z-1"
    >
      <div class="bg-white rounded-md px-4 py-2">
        <section class="add-modal__content-slot">
          <slot name="content"></slot>
        </section>
        <section class="add-modal__button-slot">
          <slot name="buttons"></slot>
        </section>
      </div>
    </article>
  </Teleport>
</template>
