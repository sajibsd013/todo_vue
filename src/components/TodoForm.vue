<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Task</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form>
          <div class="modal-body">
            <!-- {{JSON.str}} -->
            <pre>
            {{ JSON.stringify(todo, null, 2) }}

            </pre>
            <div class="mb-3">
              <label for="title" class="form-label">Task Name</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="todo.title"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todo: { id: 1, title: "", isDone: false },
      todos: [
        { id: 1, title: "Learn React", isDone: false },
        { id: 2, title: "Learn Vue", isDone: false },
        { id: 3, title: "Learn Nuxt", isDone: false },
      ],
    };
  },
};
</script>

<style></style>
