<template>
  <form @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label> Title</label>
          <input v-model="todo.title" type="text" class="form-control" />
        </div>
      </div>
      <div v-if="isUpdate" class="col-6">
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

      <div class="col-12">
        <div class="form-group">
          <label>Content</label>
          <textarea
            v-model="todo.content"
            class="form-control"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
      {{ isUpdate ? "Update" : "Create" }}
    </button>
    <button class="btn btn-danger ml-2" @click="moveTodoListPage">
      Cancle
    </button>
  </form>
  <Toast v-if="showToast" :message="toastMessage" :isSuccess="isSuccess" />
</template>
  
<script>
import _ from "lodash";
import axios from "axios";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import Toast from "@/components/Toast.vue";
import { useToast } from "@/hooks/toast";

export default {
  components: {
    Toast,
  },
  props: {
    isUpdate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const todo = ref({
      id: null,
      title: "",
      content: "",
      isComplete: false,
    });
    const previousTodo = ref({ ...todo.value });
    const route = useRoute();
    const router = useRouter();
    const { isSuccess, toastMessage, showToast, triggerToast } = useToast();

    const getTodo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/todos/${route.params.id}`
        );
        todo.value = { ...response.data };
        previousTodo.value = { ...response.data };
      } catch (error) {
        triggerToast("Something went wrong", false);
      }
    };

    if (props.isUpdate) {
      getTodo();
    }

    const updateTodoStatus = () => {
      todo.value.isComplete = !todo.value.isComplete;
    };
    const moveTodoListPage = () => {
      router.push({
        name: "Todos",
      });
    };
    const onSave = async () => {
      if (!todo.value.title) {
        triggerToast("Title is required", false);
        return;
      }
      try {
        if (props.isUpdate) {
          const response = await axios.put(
            `http://localhost:3000/todos/${route.params.id}`,
            {
              title: todo.value.title,
              content: todo.value.content,
              isComplete: todo.value.isComplete,
            }
          );
          previousTodo.value = { ...response.data };
          triggerToast("Successfully updated", true);
        } else {
          await axios.post("http://localhost:3000/todos", {
            ...todo.value,
          });
          todo.value.title = "";
          todo.value.content = "";
          triggerToast("Successfully created", true);
        }
      } catch (error) {
        triggerToast("Somthing went wrong", false);
      }
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
      showToast,
      toastMessage,
      isSuccess,
    };
  },
};
</script>
  
<style>
</style>
  