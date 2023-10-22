const listContainer = document.querySelector(".todo-app__list");
const taskInput = document.querySelector(".todo-app__add-input");
const taskForm = document.querySelector(".todo-app__add");
const alertContainer = document.querySelector(".todo-app__alert");
const loadingContainer = document.querySelector(".todo-app__list-loading");

const retrieveTasks = async () => {
  try {
    const { data } = await axios.get("/api/v1/tasks");
    const tasks = data.tasks;
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskId, name } = task;
        const checkBox = `<i onclick="updateTask('${taskId}', ${!completed})" class="checkbox ${
          completed ? "fa-solid" : "fa-regular"
        } fa-square-check fa-lg"></i>`;
        const deleteBtn = `<i onclick="deleteTask('${taskId}')" class="delete fa-solid fa-trash"></i>`;
        const nameField = `<input onkeydown="editTaskName('${taskId}')" id="${taskId}" class="todo-app__list-name ${
          completed && "checked"
        }" type="text" value="${name}"/>`;
        return `<li>${checkBox}${nameField}${deleteBtn}</li>`;
      })
      .join("");
    loadingContainer.style.display = "none";
    listContainer.innerHTML = allTasks;
  } catch (error) {
    alertContainer.style.display = "block";
    alertContainer.innerHTML =
      "<h5>There was an error, please try later....</h5>";
  }
};

retrieveTasks();

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const name = taskInput.value;
    if (!name.trim()) {
      taskInput.value = "";
      return;
    }
    await axios.post("/api/v1/tasks", { name });
    retrieveTasks();
    taskInput.value = "";
  } catch (error) {
    alertContainer.style.display = "block";
    alertContainer.innerHTML =
      "<h5>There was an error, please try later....</h5>";
  }
});

const deleteTask = async (taskId) => {
  try {
    await axios.delete(`/api/v1/tasks/${taskId}`);
    retrieveTasks();
  } catch (error) {
    alertContainer.style.display = "block";
    alertContainer.innerHTML =
      "<h5>There was an error, please try later....</h5>";
  }
};

const updateTask = async (taskId, completed, name) => {
  try {
    await axios.patch(`/api/v1/tasks/${taskId}`, { name, completed });
    retrieveTasks();
  } catch (error) {
    alertContainer.style.display = "block";
    alertContainer.innerHTML =
      "<h5>There was an error, please try later....</h5>";
  }
};

const editTaskName = async (taskId) => {
  const e = window.event;
  if (e.keyCode == 13) {
    console.log("enter");
    const editedTaskName = document.getElementById(taskId).value;
    console.log(editedTaskName);
    await updateTask(taskId, undefined, editedTaskName);
    return false;
  }
};
