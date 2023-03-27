import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      todos: [],
    };
  },
  mutations: {
    addTodo: (state, payload) => {
      state.todos.push(payload);
    },
    setTodos: (state, payload) => {
      state.todos = payload;
    },

    renameTodo: (state, payload) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === payload.id) {
          todo.title = payload.title;
        }
        return todo;
      });
    },
    deleteTodo: (state, payload) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === payload.id) {
          todo.deleted = payload.state;
        }
        return todo;
      });

      console.log(state.todos);
    },
    changeTodoStatus: (state, payload) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    },
  },
  actions: {
    getTodos: async ({ commit }) => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const todos = await response.json();
      commit("setTodos", todos);
    },
  },
});

export default store;
