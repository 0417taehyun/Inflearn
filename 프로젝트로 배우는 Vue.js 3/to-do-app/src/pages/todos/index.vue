<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>To-do List</h2>
      <router-link
        type="button"
        class="btn btn-primary"
        :to="{ name: 'TodoCreate' }"
      >
        Create Todo
      </router-link>
    </div>
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchTodo"
    />

    <hr />
    <TodoSimpleFormVue @add-todo="addTodo" />
    <div v-if="!todos.length">Empty</div>
    <TodoList
      :todos="todos"
      @toggle-todo="updateTodo"
      @delete-todo="deleteTodo"
    />
    <hr />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" v-if="currentPage !== 1">
          <a class="page-link" @click="getTodos(currentPage - 1)"> Previous </a>
        </li>
        <li
          class="page-item"
          :class="currentPage === page ? 'active' : ''"
          v-for="page in totalPages"
          :key="page"
        >
          <a class="page-link" @click="getTodos(page)"> {{ page }} </a>
        </li>
        <li class="page-item" v-if="currentPage !== totalPages">
          <a class="page-link" @click="getTodos(currentPage + 1)"> Next </a>
        </li>
      </ul>
    </nav>
  </div>
  <Toast v-if="showToast" :message="toastMessage" :isSuccess="isSuccess" />
</template>

<script>
import { ref, computed, watch } from "vue";
import TodoSimpleFormVue from "@/components/TodoSimpleForm.vue";
import TodoList from "@/components/TodoList.vue";
import Toast from "@/components/Toast.vue";
import { useToast } from "@/hooks/toast";
import axios from "axios";

export default {
  components: {
    TodoSimpleFormVue,
    TodoList,
    Toast,
  },
  setup() {
    const todos = ref([]);
    const totalTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const totalPages = computed(() => {
      return Math.ceil(totalTodos.value / limit);
    });
    const { isSuccess, toastMessage, showToast, triggerToast } = useToast();

    let timeout = null;
    const searchText = ref("");
    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos();
      }, 1500);
    });
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos();
    };

    const getTodos = async (page = currentPage.value) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/todos?_sort=id&_order=desc&title_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );
        currentPage.value = page;
        totalTodos.value = Number(response.headers["x-total-count"]);
        todos.value = response.data;
      } catch (error) {
        triggerToast("Something went wrong", false);
      }
    };
    getTodos();

    const addTodo = async (todo) => {
      try {
        const response = await axios.post("http://localhost:3000/todos", {
          subject: todo.subject,
          isComplete: todo.isComplete,
        });
        console.log(response);
        getTodos();
      } catch (error) {
        triggerToast("Something went wrong", false);
      }
    };
    const updateTodo = async (id, checked) => {
      try {
        const response = await axios.patch(
          `http://localhost:3000/todos/${id}`,
          {
            isComplete: checked,
          }
        );
        console.log(response);
        getTodos();
      } catch (error) {
        triggerToast("Something went wrong", false);
      }
    };
    const deleteTodo = async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:3000/todos/${id}`
        );
        console.log(response);
        getTodos();
      } catch (error) {
        triggerToast("Something went wrong", false);
      }
    };
    return {
      todos,
      searchText,
      totalPages,
      currentPage,
      toastMessage,
      isSuccess,
      showToast,
      addTodo,
      updateTodo,
      deleteTodo,
      getTodos,
      searchTodo,
    };
  },
};
</script>

<style>
</style>
