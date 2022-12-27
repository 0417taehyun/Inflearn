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
	import { ref, computed } from 'vue';
	import TodoSimpleFormVue from './components/TodoSimpleForm.vue';
	import TodoList from './components/TodoList.vue';
	import axios from "axios";

	export default {
		components: {
			TodoSimpleFormVue,
			TodoList,
		},
		setup() {
			const todos = ref([]);
			const searchText = ref("");
			const filteredTodos = computed(() => {
				if (searchText.value) {
					return todos.value.filter(todo => {
						return todo.subject.includes(searchText.value);
					})
				}
				return todos.value;
			})	
			const getTodos = async () => {
				try {
					const response = await axios.get(
						"http://localhost:3000/todos"
					)
					todos.value = response.data;
				} catch (error) {
					console.log(error)
				}
			}
			getTodos();		

			const addTodo = async (todo) => {
				try {
					const response = await axios.post(
						"http://localhost:3000/todos", {
						subject: todo.subject,
						isComplete: todo.isComplete,
					})
					console.log(response)
				} catch (error) {
					console.log(error);
				}
			}
			const updateTodo = async ({index, id}) => {
				try {
					const response = await axios.patch(
						`http://localhost:3000/todos/${id}`, {
							isComplete: !todos.value[index].isComplete
						}
					)
					console.log(response)
				} catch (error) {
					console.log(error)
				}
			}
			const deleteTodo = async (id) => {
				try {
					const response = await axios.delete(
						`http://localhost:3000/todos/${id}`, 
					)
					console.log(response);
				} catch (error) {
					console.log(error);
				}
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
