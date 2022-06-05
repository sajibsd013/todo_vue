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
          v-for="(todo, index) in todos"
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
              @click="deleteTask(index)"
            >
              <i class="fas fa-trash"></i>
            </button>
            <button
              class="btn btn-sm btn-outline-success mx-1"
              @click="markAsDone(index)"
            >
              <i class="fas fa-check"></i>
            </button>

            <!-- Button trigger modal -->
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              data-bs-toggle="modal"
              @click="setDefaultValue(index)"
              v-bind:data-bs-target="`#Modal${index}`"
            >
              <i class="far fa-edit"></i>
            </button>

            <!-- Modal -->
            <div
              class="modal fade"
              v-bind:id="`Modal${index}`"
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
                          :value="index"
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
// import TodoForm from "./TodoForm.vue";

export default {
  data() {
    return {
      newTodo: { title: "", isDone: false },
      updateTodo: { title: "", index: 0 },
      todos: [],
    };
  },
  components: {},
  methods: {
    submitForm() {
      if (this.newTodo.title) {
        const newTodo = Object.assign({}, this.newTodo);
        this.todos.unshift(newTodo);
        this.newTodo.title = "";
      }
    },

    deleteTask(id) {
      console.log(id);
      if (id == 0) {
        this.todos.shift();
      } else {
        this.todos.splice(id, id);
      }
    },
    markAsDone(id) {
      this.todos[id].isDone = true;
    },
    setDefaultValue(id) {
      this.updateTodo.title = this.todos[id].title;
      this.updateTodo.index = id;
    },
    updateTask() {
      const { title, index } = this.updateTodo;
      this.todos[index].title = title;
    },
  },
};
</script>

<style></style>
