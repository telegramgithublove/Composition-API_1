<template>
  <div class="container">
    <h1>To-Do List</h1>
    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="Enter a new task" required />
      <button type="submit">Add</button>
    </form>
    <ul>
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import TodoItem from './components/TodoItem.vue';

const store = useStore();
const newTodo = ref('');

const todos = computed(() => store.state.todos);

const addTodo = () => {
  if (newTodo.value.trim()) {
    const todo = { id: Date.now(), title: newTodo.value, completed: false };
    store.commit('addTodo', todo);
    newTodo.value = '';
  }
};

onMounted(() => {
  store.dispatch('fetchTodos');
});
</script>

<style scoped>
.container {
  width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h1 {
  text-align: center;
}
form {
  display: flex;
  margin-bottom: 20px;
}
input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
button {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #218838;
}
ul {
  list-style: none;
  padding: 0;
}
</style>