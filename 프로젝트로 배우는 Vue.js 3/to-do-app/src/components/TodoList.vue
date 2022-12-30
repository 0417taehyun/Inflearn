<template>
  <div v-for="todo in todos" :key="todo.id" class="card mt-2">
    <div
      class="card-body p-2 d-flex align-items-center"
      style="cursor: pointer"
      @click="getTodo(todo.id)"
    >
      <div class="flex-grow-1">
        <input
          class="ml-2 mr-2"
          type="checkbox"
          :checked="todo.isComplete"
          @change="toggleTodo(todo.id, $event)"
          @click.stop
        />
        <span :class="{ todo: todo.isComplete }">
          {{ todo.title }}
        </span>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" @click.stop="openModal(todo.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
  <Teleport to="#modal">
    <DeleteModal
      v-if="showModal"
      @close-modal="closeModal"
      @delete-todo="deleteTodo"
    />
  </Teleport>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import DeleteModal from "@/components/DeleteModal.vue";

export default {
  emits: ["toggle-todo", "delete-todo"],
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  components: {
    DeleteModal,
  },
  setup(props, { emit }) {
    const deleteTodoId = ref(0);
    const showModal = ref(false);
    const router = useRouter();
    const toggleTodo = (id, event) => {
      emit("toggle-todo", id, event.target.checked);
    };
    const openModal = (id) => {
      showModal.value = true;
      deleteTodoId.value = id;
    };
    const closeModal = () => {
      showModal.value = false;
      deleteTodoId.value = 0;
    };
    const deleteTodo = () => {
      emit("delete-todo", deleteTodoId.value);
      closeModal();
    };
    const getTodo = (id) => {
      router.push({
        name: "Todo",
        params: {
          id: id,
        },
      });
    };
    return {
      toggleTodo,
      deleteTodo,
      getTodo,
      openModal,
      closeModal,
      showModal,
    };
  },
};
</script>

<style scoped>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>