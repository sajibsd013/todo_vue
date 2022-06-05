<template>
  <div class="row mt-5">
    <div class="todos col-md-6 mx-auto shadow p-4 rounded">
      <h3 class="text-center display-6 mb-5">Todo App</h3>

      <ul class="list-group">
        <li
          v-for="(todo, index) in todos"
          :key="todo.id"
          class="list-group-item d-flex justify-content-between"
        >
          <span
            v-bind:class="
              todo.isDone && 'text-danger text-decoration-line-through '
            "
            >{{ todo.title }}
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
                  <form @submit="updateTask">
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
      <button
        type="button"
        class="btn btn-sm btn-outline-dark d-block mx-auto mt-3 px-5"
        data-bs-toggle="modal"
        data-bs-target="#newTodoModal"
      >
        Add Task
      </button>
    </div>
    <div
      class="modal fade"
      id="newTodoModal"
      tabindex="-1"
      aria-labelledby="newTodoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newTodoModalLabel">Add Task</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit="submitForm">
            <div class="modal-body">
              <div class="mb-3">
                <label for="title" class="form-label">Task Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="newTodo.title"
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
                Add Task
              </button>
            </div>
          </form>
        </div>
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

      todos: [
        { title: "Learn React", isDone: false },
        { title: "Learn Vue", isDone: false },
        { title: "Learn Nuxt", isDone: false },
      ],
    };
  },
  components: {
    // TodoForm,
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
      this.todos.push(this.newTodo);
    },

    deleteTask(id) {
      this.todos.pop(id);
    },
    markAsDone(id) {
      this.todos[id].isDone = true;
    },
    setDefaultValue(id) {
      this.updateTodo.title = this.todos[id].title;
      this.updateTodo.index = id;
    },
    updateTask(event) {
      event.preventDefault();
      const { title, index } = this.updateTodo;
      this.todos[index].title = title;
    },
  },
};
</script>

<style></style>
