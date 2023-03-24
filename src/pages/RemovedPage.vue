<template>
  <section class="todo-container">
    <h1 class="title">Removed Todos</h1>
    <div>
      <router-link to="/">Todo List</router-link>
    </div>

    <div class="todo-list">
      <div v-for="todo in todos" :key="todo.id">
        <div class="todo-item" v-if="todo.deleted">
          <input
            type="checkbox"
            :id="todo.id"
            :checked="todo.completed"
            @change="changeTodoStatus"
          />
          <input
            type="text"
            class="todo-title"
            name=""
            :value="todo.title"
            :id="todo.id"
            @change="renameTodo"
          />

          <button class="btn-add" @click="addTodo" :id="todo.id">Add</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    renameTodo(e) {
      const id = e.target.id;

      const todo = this.todos.find((todo) => todo.id == id);

      todo.title = e.target.value;

      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    changeTodoStatus(e) {
      const id = e.target.id;

      const todo = this.todos.find((todo) => todo.id == id);

      todo.completed = e.target.checked;

      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    addTodo(e) {
      const id = e.target.id;

      const todo = this.todos.find((todo) => todo.id == id);

      todo.deleted = false;

      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
  },
  mounted() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
      this.todos = todos;
    }
  },
};
</script>
