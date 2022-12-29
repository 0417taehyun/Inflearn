<template>
    <div
        v-for="todo in todos"
        :key="todo.id"
        class="card mt-2"
    >
        <div
            class="card-body p-2 d-flex align-items-center"
            @click="getTodo(todo.id)"
        >
            <div class="form-check flex-grow-1">
                <input
                    class="form-check-input"
                    type="checkbox"
                    :checked="todo.isComplete"
                    @change="toggleTodo(todo.id, $event)"
                    @click.stop
                />
                <label class="form-check-label" :class="{ todo: todo.isComplete }"> {{ todo.subject }} </label>
            </div>
            <div>
                <button class="btn btn-danger btn-sm" @click.stop="deleteTodo(todo.id)">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { useRouter } from 'vue-router';

    export default {
        emits: ["toggle-todo", "delete-todo"],
        props: {
            todos: {
                type: Array,
                required: true
            }
        },
        setup(props, { emit }) {
            const router = useRouter();
            const toggleTodo = (id, event) => {
                emit("toggle-todo", id, event.target.checked);
            }

            const deleteTodo = (id) => {
                emit("delete-todo", id);
            }

            const getTodo = (id) => {
                router.push({
                    name: "Todo",
                    params: {
                        id: id
                    }
                });
            }

            return {
                toggleTodo,
                deleteTodo,
                getTodo,
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