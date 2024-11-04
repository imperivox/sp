// Get references to the necessary DOM elements
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

// Load todos from local storage on page load
let todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();

// Function to add a new todo item
function addTodo() {
  const newTodo = todoInput.value.trim();
  if (newTodo) {
    const todo = { id: Date.now(), text: newTodo, completed: false };
    todos.push(todo);
    saveTodos();
    renderTodos();
    todoInput.value = "";
  }
}

// Function to mark a todo as complete/incomplete
function toggleTodoCompletion(id) {
  todos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  saveTodos();
  renderTodos();
}

// Function to delete a todo item
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

// Function to save todos to local storage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to render the todo list
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodoCompletion(todo.id));

    const label = document.createElement("label");
    label.textContent = todo.text;
    label.classList.toggle("completed", todo.completed);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));

    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
  });
}

// Event listener for the "Add" button
addButton.addEventListener("click", addTodo);
