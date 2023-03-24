<template>
  <section class="todo-container">
    <h1 class="title">TODO LIST</h1>
    <div>
      <router-link to="/removed-todos">Removed todos</router-link>
    </div>

    <div class="todo-list">
      <div v-for="todo in todos" :key="todo.id">
        <div class="todo-item" v-if="!todo.deleted">
          <input type="checkbox" :id="todo.id" :checked="todo.completed" @change="changeTodoStatus" />
          <input
            type="text"
            class="todo-title"
            name=""
            :id="todo.id"
            :value="todo.title"
            @change="renameTodo"
          />

          <button class="btn-remove" @click="deleteTodo" :id="todo.id">
            Delete
          </button>
        </div>
      </div>
    </div>

    <button class="btn" id="addTodo" @click="addTodo">Add new todo</button>
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
  mounted() {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos) {
      this.todos = todos;
    }
  },
  methods: {
    addTodo() {
      const todo = {
        id: Date.now(),
        title: "New todo",
        completed: false,
        deleted: false,
      };
      this.todos.push(todo);

      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    changeTodoStatus(e) {
      const id = e.target.id;

      const todo = this.todos.find((todo) => todo.id == id);

      todo.completed = e.target.checked;

      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    renameTodo(e) {
      const id = e.target.id;

      const todo = this.todos.find((todo) => todo.id == id);

      todo.title = e.target.value;

      localStorage.setItem("todos", JSON.stringify(this.todos));
    },

    deleteTodo(e) {
      const id = e.target.id;

      const todo = this.todos.find((todo) => todo.id == id);

      todo.deleted = true;

      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
  },
};
</script>
