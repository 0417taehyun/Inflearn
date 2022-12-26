<template>
  <div class="container">
    <h2>To-do List</h2>
	<input
		class="form-control"
		type="text"
		v-model="searchText"
		placeholder="Search"
	/>

	<hr />
    <TodoSimpleFormVue @add-todo="addTodo" />
    <div v-if="!filteredTodos.length">
        Empty
    </div>	
	<TodoList
		:todos="filteredTodos"
		@toggle-todo="updateTodo"
		@delete-todo="deleteTodo"
	/>

  </div>
</template>

<script>
	import { ref, reactive, computed } from 'vue';
	import TodoSimpleFormVue from './components/TodoSimpleForm.vue';
	import TodoList from './components/TodoList.vue';

	export default {
		components: {
			TodoSimpleFormVue,
			TodoList,
		},
		setup() {
			const todos = reactive([]);
			const searchText = ref("");
			const filteredTodos = computed(() => {
				if (searchText.value) {
					return todos.filter(todo => {
						return todo.subject.includes(searchText.value);
					})
				}
				return todos;
			})
			const addTodo = (todo) => {
				todos.push(todo);
			}
			const updateTodo = (index) => {
				todos[index].isComplete = !todos[index].isComplete;
			}
			const deleteTodo = (index) => {
				todos.splice(index, 1);
			}
			return {
				todos,
				searchText,
				filteredTodos,
				addTodo,
				updateTodo,
				deleteTodo,
			}
		}
	}
</script>

<style>

</style>
