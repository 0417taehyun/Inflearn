<template>
  <ModalVue>
    <template v-slot:title> Delete Todo </template>
    <template v-slot:body> Sure to delete? </template>
    <template v-slot:footer>
      <button type="button" class="btn btn-secondary" @click="closeModal">
        Close
      </button>
      <button type="button" class="btn btn-danger" @click="deleteTodo">
        Delete
      </button>
    </template>
  </ModalVue>
</template>

<script>
import ModalVue from "@/components/Modal.vue";

export default {
  components: {
    ModalVue,
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit("close-modal");
    };
    const deleteTodo = () => {
      emit("delete-todo");
    };
    return {
      closeModal,
      deleteTodo,
    };
  },
};
</script>

<style>
</style>