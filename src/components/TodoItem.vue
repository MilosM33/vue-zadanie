<template>
  <div class="todo-item">
    <input
      type="checkbox"
      :id="id"
      :checked="completed"
      @change="changeTodoStatus"
    />
    <input
      type="text"
      class="todo-title"
      name=""
      :id="id"
      :value="text"
      @change="renameTodo"
    />

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
