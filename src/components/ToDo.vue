<template>
  <div class="row mt-5">
    <div class="todos col-md-6 mx-auto shadow p-4 rounded">
      <h3 class="text-center display-6 mb-5">Todo App</h3>
      <form @submit.prevent="submitForm">
        <div class="mb-3 d-flex">
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="newTodo.title"
            placeholder="Add New task..."
          />
          <button
            type="submit"
            data-bs-dismiss="modal"
            class="btn btn-primary ms-2"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </form>

      <ul class="list-group" v-if="todos.length">
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="list-group-item d-flex justify-content-between"
        >
          <span
            v-bind:class="
              todo.isDone && 'text-danger text-decoration-line-through '
            "
          >
            {{ todo.title }}
          </span>
          <span>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="deleteTask(todo.id)"
            >
              <i class="fas fa-trash"></i>
            </button>
            <button
              class="btn btn-sm btn-outline-success mx-1"
              @click="markAsDone(todo.id)"
            >
              <i class="fas fa-check"></i>
            </button>

            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              data-bs-toggle="modal"
              @click="setDefaultValue(todo.id)"
              v-bind:data-bs-target="`#Modal${todo.id}`"
            >
              <i class="far fa-edit"></i>
            </button>

            <div
              class="modal fade"
              v-bind:id="`Modal${todo.id}`"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="updateLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="updateLabel">Modal title</h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <form @submit.prevent="updateTask">
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="title" class="form-label">Task Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="title"
                          v-model.lazy="updateTodo.title"
                        />
                        <input
                          type="text"
                          class="form-control d-none"
                          id="index"
                          :value="todo.id"
                        />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="reset"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        data-bs-dismiss="modal"
                        class="btn btn-primary"
                      >
                        Update Task
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </span>
        </li>
      </ul>
      <div v-else class="alert alert-warning text-center" role="alert">
        No task added
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ToDo",
  data() {
    return {
      newTodo: { title: "", isDone: false },
      updateTodo: { title: "", id: 0, isDone: true },
      todos: [],
      BASE_URL: "http://localhost:3000",
    };
  },
  components: {},
  mounted() {
    this.loadTasks();
  },

  methods: {
    loadTasks() {
      const url = `${this.BASE_URL}/tasks`;
      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          this.todos = [...res.data];
        })
        .catch((err) => console.log(err));
    },
    submitForm() {
      if (this.newTodo.title) {
        const url = `${this.BASE_URL}/tasks`;
        console.log(url);

        axios
          .post(url, this.newTodo)
          .then((res) => {
            console.log(res.data);
            this.loadTasks();
            this.newTodo.title = "";
          })
          .catch((err) => console.log(err));
      }
    },

    deleteTask(id) {
      const url = `${this.BASE_URL}/tasks/${id}`;
      axios
        .delete(url)
        .then((res) => {
          console.log(res.data);
          this.loadTasks();
        })
        .catch((err) => console.log(err));
    },
    markAsDone(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.isDone = true;
      const url = `${this.BASE_URL}/tasks/${id}`;
      axios
        .put(url, todo)
        .then((res) => {
          console.log(res.data);
          this.loadTasks();
        })
        .catch((err) => console.log(err));
    },
    setDefaultValue(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      this.updateTodo = todo;
    },
    updateTask() {
      const { id } = this.updateTodo;
      const url = `${this.BASE_URL}/tasks/${id}`;
      axios
        .put(url, this.updateTodo)
        .then((res) => {
          console.log(res.data);
          this.loadTasks();
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped></style>
