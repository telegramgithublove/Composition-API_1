<template>
  <li :class="{ completed: todo.completed }">
    <input type="checkbox" v-model="todo.completed" @change="toggleCompletion" />
    <span>{{ todo.title }}</span>
    <button @click="removeTodo">Delete</button>
  </li>
</template>

<script setup>
import { defineProps } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

const store = useStore();

const toggleCompletion = () => {
  store.commit('toggleTodo', props.todo.id);
};

const removeTodo = () => {
  store.commit('removeTodo', props.todo.id);
};
</script>

<style scoped>
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}
.completed {
  text-decoration: line-through;
}
button {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #c82333;
}
</style>
