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
	<hr />
	<nav aria-label="Page navigation example">
		<ul class="pagination">
			<li
				class="page-item"
				v-if="currentPage !== 1"
			>
				<a class="page-link" @click="getTodos(currentPage-1)"> Previous </a>
			</li>
			<li
				class="page-item"
				:class="currentPage === page ? 'active' : ''"
				v-for="page in totalPages"
				:key="page"
			>
				<a class="page-link" @click="getTodos(page)"> {{ page }} </a>
			</li>
			<li
				class="page-item"
				v-if="currentPage !== totalPages"
			>
				<a class="page-link" @click="getTodos(currentPage+1)"> Next </a>
			</li>
		</ul>
	</nav>	

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
			const totalTodos = ref(0);
			const limit = 5;
			const currentPage = ref(1);
			const totalPages = computed(() => {
				return Math.ceil(totalTodos.value / limit);
			})

			const searchText = ref("");
			const filteredTodos = computed(() => {
				if (searchText.value) {
					return todos.value.filter(todo => {
						return todo.subject.includes(searchText.value);
					})
				}
				return todos.value;
			})	
			const getTodos = async (page=currentPage.value) => {
				try {
					const response = await axios.get(
						`http://localhost:3000/todos?_page=${page}&_limit=${limit}`
					)
					currentPage.value = page;
					totalTodos.value = response.headers["x-total-count"];
					todos.value = response.data;
				} catch (error) {
					console.log(error)
				}
			}
			getTodos()

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
				totalPages,
				currentPage,
				addTodo,
				updateTodo,
				deleteTodo,
				getTodos,
			}
		}
	}
</script>

<style>

</style>
