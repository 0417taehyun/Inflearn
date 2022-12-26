<template>
  <div class="container">
    <h2>To-do List</h2>
    <TodoSimpleFormVue @add-todo="addTodo" />
    <div v-if="!todos.length">
        Empty
    </div>	
	<TodoList
		:todos="todos"
		@toggle-todo="updateTodo"
		@delete-todo="deleteTodo"
	/>

  </div>
</template>

<script>
	import { reactive } from 'vue';
	import TodoSimpleFormVue from './components/TodoSimpleForm.vue';
	import TodoList from './components/TodoList.vue';

	export default {
		components: {
			TodoSimpleFormVue,
			TodoList,
		},
		setup() {
			const todos = reactive([]);
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
				addTodo,
				updateTodo,
				deleteTodo,
			}
		}
	}
</script>

<style>

</style>
