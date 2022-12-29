<template>
  <h1>To-do Page</h1>
  <form @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label> Subject </label>
          <input v-model="todo.subject" type="text" class="form-control" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label> Status </label>
          <div>
            <button
              type="button"
              class="btn btn-success"
              :class="todo.isComplete ? 'btn-success' : 'btn-danger'"
              @click="updateTodoStatus()"
            >
              {{ todo.isComplete ? "Complete" : "Incomlete" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
      Save
    </button>
    <button class="btn btn-danger ml-2" @click="moveTodoListPage">
      Cancle
    </button>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import _ from "lodash";

export default {
  setup() {
    const todo = ref({
      id: null,
      subject: "",
      isComplete: false,
    });
    const previousTodo = ref({ ...todo.value });
    const route = useRoute();
    const router = useRouter();
    const getTodo = async () => {
      const response = await axios.get(
        `http://localhost:3000/todos/${route.params.id}`
      );
      todo.value = { ...response.data };
      previousTodo.value = { ...response.data };
    };

    getTodo();
    const updateTodoStatus = () => {
      todo.value.isComplete = !todo.value.isComplete;
    };
    const moveTodoListPage = () => {
      router.push({
        name: "Todos",
      });
    };
    const onSave = async () => {
      const response = await axios.put(
        `http://localhost:3000/todos/${route.params.id}`,
        { subject: todo.value.subject, isComplete: todo.value.isComplete }
      );
      previousTodo.value = { ...response.data };
    };

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, previousTodo.value);
    });

    return {
      todo,
      updateTodoStatus,
      moveTodoListPage,
      onSave,
      todoUpdated,
    };
  },
};
</script>

<style>
</style>
