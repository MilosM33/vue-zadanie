<template>
  <section>
    <input
      type="text"
      name=""
      class="text-input"
      id=""
      @change="setInput"
      :value="input"
    />
    <button class="btn" id="addTodo" @click="addTodo">Add new todo</button>
  </section>
</template>

<script>
export default {
  name: "TodoInput",
  data() {
    return {
      input: "New todo",
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
  },

  methods: {
    setInput(e) {
      this.input = e.target.value;
    },
    addTodo() {
      this.$emit("addTodo", {
        id: (this.todos.length + 1).toString(),
        title: this.input,
        completed: false,
        deleted: false,
      });
      this.input = "New todo";
    },
  },
};
</script>
