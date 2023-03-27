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

    <button class="btn-remove" :id="id" @click="deleteTodo">Delete</button>
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
  },
};
</script>
