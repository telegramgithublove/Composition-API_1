import { createStore } from 'vuex';


const loadTodosFromLocalStorage = () => {
  const savedTodos = localStorage.getItem('todos');
  return savedTodos ? JSON.parse(savedTodos) : [];
};

export default createStore({
  state: {
    todos: loadTodosFromLocalStorage(),
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
      localStorage.setItem('todos', JSON.stringify(todos)); 
    },
    addTodo(state, todo) {
      state.todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    toggleTodo(state, id) {
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        Vue.set(todo, 'completed', !todo.completed);
        localStorage.setItem('todos', JSON.stringify(state.todos));
    }
  },
    removeTodo(state, id) {
      state.todos = state.todos.filter((t) => t.id !== id);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
  },
  actions: {
    async fetchTodos({ commit, state }) {
      if (state.todos.length === 0) {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
        const data = await res.json();
        commit('setTodos', data);
      }
    },
  },
});
