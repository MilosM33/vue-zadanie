<template>
  <section class="todo-container">
    <h1 class="title">TODO LIST</h1>
    <div>
      <router-link to="/">Todo List</router-link>
    </div>

    <div class="todo-list">
      <input
        type="text"
        name=""
        class="text-input"
        id=""
        :value="todo.title"
        @change="renameTodo"
      />

      <input
        type="checkbox"
        name=""
        id=""
        :value="todo.completed"
        @change="changeTodoStatus"
      />

      <button class="btn btn-add" v-if="todo.deleted" @click="addTodo">
        Add
      </button>

      <button class="btn btn-remove" v-if="!todo.deleted" @click="removeTodo">
        Remove
      </button>
    </div>

    <div>
      <TodoInput @addTodo="addTodo"></TodoInput>
      <button class="btn btn-get" @click="getTodos">Get data</button>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "EditTodoPage",

  data() {
    return {
      todo: {
        title: "",
        completed: false,
        deleted: false,
      },
    };
  },
  methods: {
    renameTodo(e) {
      const id = this.$route.params.id;
      this.todo.title = e.target.value;

      axios.put(`https://641efc96ad55ae01ccb403b9.mockapi.io/todos/${id}`, {
        title: this.todo.title,
      });
    },
    changeTodoStatus(e) {
      const id = this.$route.params.id;
      this.todo.completed = e.target.checked;

      axios.put(`https://641efc96ad55ae01ccb403b9.mockapi.io/todos/${id}`, {
        completed: this.todo.completed,
      });
    },

    addTodo() {
      const id = this.$route.params.id;
      this.todo.deleted = false;

      axios.put(`https://641efc96ad55ae01ccb403b9.mockapi.io/todos/${id}`, {
        deleted: this.todo.deleted,
      });
    },

    removeTodo() {
      const id = this.$route.params.id;
      this.todo.deleted = true;

      axios.put(`https://641efc96ad55ae01ccb403b9.mockapi.io/todos/${id}`, {
        deleted: this.todo.deleted,
      });
    },
  },

  mounted() {
    const id = this.$route.params.id;
    const temp = this.$store.state.todos.find((todo) => todo.id == id);
    console.log(temp);
    if (temp) {
      this.todo = temp;
    }
  },
};
</script>
<style scoped>
.btn-remove {
  padding: 10px;
  outline: none;
  border: 0;
  color: #fff;
  border-radius: 5px;
  background: #e74c3c;
}
</style>
