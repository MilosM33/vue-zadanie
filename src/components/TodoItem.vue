<template>
  <div class="todo-item">
    <input
      type="checkbox"
      :id="id"
      :checked="completed"
      @change="changeTodoStatus"
    />
    <router-link :to="{ path: '/edit-todo/' + id }"
      ><div class="todo-title">{{ text }}</div></router-link
    >
    <button class="btn-add" :id="id" @click="unDeleteTodo" v-if="deleted">
      Add
    </button>
    <button class="btn-remove" :id="id" @click="deleteTodo" v-if="!deleted">
      Delete
    </button>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["deleted", "text", "id", "completed"],
  methods: {
    changeTodoStatus(e) {
      this.$emit("changeTodoStatus", e);
    },
    renameTodo(e) {
      this.$emit("renameTodo", e);
    },
    deleteTodo(e) {
      this.$emit("deleteTodo", e);
    },

    unDeleteTodo(e) {
      this.$emit("unDeleteTodo", e);
    },
  },
};
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.todo-item > * {
  margin-right: 10px;
}

.btn-remove {
  padding: 10px;
  outline: none;
  border: 0;
  color: #fff;
  border-radius: 5px;
  background: #e74c3c;
}
.btn-add {
  padding: 10px;
  outline: none;
  border: 0;
  color: #fff;
  border-radius: 5px;
  background: #2ecc71;
}
</style>
