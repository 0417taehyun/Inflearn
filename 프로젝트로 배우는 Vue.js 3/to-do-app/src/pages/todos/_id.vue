<template>
  <h2>To-do Page</h2>
  <TodoFormVue :isUpdate="true" />
</template>

<script>
import TodoFormVue from "@/components/TodoForm.vue";

export default {
  components: {
    TodoFormVue,
  },
};
</script>

<style>
</style>
