<template>
    <form @submit.prevent="onSubmit" class="d-flex">
      <div class="flex-grow-1 mr-2">
        <input class="form-control" type="text" v-model="todo" placeholder="Type new to-do">
        <div v-show="!hasTodo" > Please Input </div>
      </div>
      <div>
        <button class="btn btn-primary" type="submit">ADD</button>
      </div>
    </form>
</template>

<script>
	import { ref } from 'vue';
    export default {
        emits: ["add-todo"],
        setup(props, { emit }) {
            const todo = ref("");            
            const hasTodo = ref(true);

            const onSubmit = () => {
                if (todo.value === "") {
                    hasTodo.value = false;
                }
                else {
                    emit("add-todo", {
                        isComplete: false,
                        subject: todo.value
                    });
                    todo.value = "";
                    hasTodo.value = true;
                }
            }

            return {
                todo,
                hasTodo,
                onSubmit,
            }
        }
    }
</script>

<style>

</style>
