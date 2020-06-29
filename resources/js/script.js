//*selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filterTodo");

//*Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
filterOption.addEventListener("click", filterTodo);

//*Functions
function addTodo(e) {
  //!Prevent From form submitting
  e.preventDefault();
  //*Getting the todolist value
  const todo = todoInput.value;
  if (!todo) {
    return;
  }
  //*Erasaing the input
  todoInput.value = "";
  //?Creating a Div element with class as "todo"
  const div = document.createElement("div");
  div.classList.add("todo");
  //?creating a list item
  const li = document.createElement("li");
  li.classList.add("todo-item");
  li.innerHTML = todo;
  div.appendChild(li);

  //Add todo to local storage
  saveLocalTodo(todo);

  //?Creating a checked button
  const checkedButton = document.createElement("button");
  checkedButton.innerHTML = `<i class="fas fa-check"></i>`;
  checkedButton.classList.add("complete-btn");
  div.appendChild(checkedButton);

  //?Creating a delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;
  deleteButton.classList.add("delete-btn");
  div.appendChild(deleteButton);

  //?Finally adding div to todolist
  todoList.appendChild(div);

  //adding addeventListener to deleteButton
  deleteButton.addEventListener("click", deleteTodo);
  //adding addvenetListener to checkedButton
  checkedButton.addEventListener("click", checkTodo);
}

//DeleteTodo Function
function deleteTodo(e) {
  const todo = e.target.parentElement;
  removeLocalStorageTodo(todo);
  //adding animation
  todo.classList.add("fall");
  todo.addEventListener("transitionend", function () {
    todo.remove();
  });
}

//checkTodo Function
function checkTodo(e) {
  const todo = e.target.parentElement;
  todo.classList.toggle("checked");
}

//filter funtion
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("checked")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }

      default:
        break;
    }
  });
}

//saving to local storage
function saveLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    //?Creating a Div element with class as "todo"
    const div = document.createElement("div");
    div.classList.add("todo");
    //?creating a list item
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML = todo;
    div.appendChild(li);

    //?Creating a checked button
    const checkedButton = document.createElement("button");
    checkedButton.innerHTML = `<i class="fas fa-check"></i>`;
    checkedButton.classList.add("complete-btn");
    div.appendChild(checkedButton);

    //?Creating a delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fas fa-trash-alt"></i>`;
    deleteButton.classList.add("delete-btn");
    div.appendChild(deleteButton);

    //?Finally adding div to todolist
    todoList.appendChild(div);

    //adding addeventListener to deleteButton
    deleteButton.addEventListener("click", deleteTodo);
    //adding addvenetListener to checkedButton
    checkedButton.addEventListener("click", checkTodo);
  });
}

function removeLocalStorageTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoText = todo.childNodes[0].textContent;
  todos = todos.filter((todo) => todo !== todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
}
