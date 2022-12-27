<template>
    <div
        v-for="(todo, index) in todos"
        :key="todo.id"
        class="card mt-2"
    >
        <div class="card-body p-2 d-flex align-items-center">
            <div class="form-check flex-grow-1">
                <input
                    class="form-check-input"
                    type="checkbox"
                    :value="todo.isComplete"
                    @change="toggleTodo(index, todo.id)"
                />
                <label class="form-check-label" :class="{ todo: todo.isComplete }"> {{ todo.subject }} </label>
            </div>
            <div>
                <button class="btn btn-danger btn-sm" @click="deleteTodo(todo.id)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        emits: ["toggle-todo", "delete-todo"],
        props: {
            todos: {
                type: Array,
                required: true
            }
        },
        setup(props, { emit }) {
            const toggleTodo = (index, id) => {
                emit("toggle-todo", {index, id});
            }

            const deleteTodo = (id) => {
                emit("delete-todo", id);
            }

            return {
                toggleTodo,
                deleteTodo,
            }
        }
    }
</script>

<style>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>