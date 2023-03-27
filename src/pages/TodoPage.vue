<template>
  <section class="todo-container">
    <h1 class="title">TODO LIST</h1>
    <div>
      <router-link to="/removed-todos">Removed todos</router-link>
    </div>

    <div class="todo-list">
      <div v-for="todo in todos" :key="todo.id">
        <TodoItem
          :deleted="todo.deleted"
          :text="todo.title"
          :id="todo.id"
          :completed="todo.completed"
          @changeTodoStatus="changeTodoStatus"
          @renameTodo="renameTodo"
          @deleteTodo="deleteTodo"

          v-if="!todo.deleted"
        />
      </div>
    </div>

    <button class="btn" id="addTodo" @click="addTodo">Add new todo</button>

    <div class="button-section">
      <button class="btn btn-get" @click="getTodos">Get data</button>
    </div>
  </section>
</template>

<script>
import TodoItem from "../components/TodoItem.vue";
import axios from "axios";

export default {
  components: { TodoItem },
  name: "App",
  data() {
    return {
      todos: [],
    };
  },
  mounted() {
    this.getTodos();
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

      axios.post("https://641efc96ad55ae01ccb403b9.mockapi.io/todos", todo);
    },
    changeTodoStatus(e) {
      const id = e.target.id;

      const todo = this.todos.find((todo) => todo.id == id);

      todo.completed = e.target.checked;

      axios.put(`https://641efc96ad55ae01ccb403b9.mockapi.io/todos/${id}`, {
        completed: todo.completed,
      });
    },
    renameTodo(e) {
      const id = e.target.id;

      const todo = this.todos.find((todo) => todo.id == id);

      todo.title = e.target.value;

      axios.put(`https://641efc96ad55ae01ccb403b9.mockapi.io/todos/${id}`, {
        title: todo.title,
      });
    },

    deleteTodo(e) {
      const id = e.target.id;

      const todo = this.todos.find((todo) => todo.id == id);

      todo.deleted = true;

      axios.put(`https://641efc96ad55ae01ccb403b9.mockapi.io/todos/${id}`, {
        deleted: todo.deleted,
      });
    },

    getTodos() {
      axios
        .get("https://641efc96ad55ae01ccb403b9.mockapi.io/todos")
        .then((res) => {
          this.todos = res.data;

          localStorage.setItem("todos", JSON.stringify(this.todos));
        });
    },
  },
};
</script>
