//*selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//*Event listeners
todoButton.addEventListener("click", addTodo);

//*Functions
function addTodo(e) {
  //!Prevent From form submitting
  e.preventDefault();
  //*Getting the todolist value
  const todo = todoInput.value;
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
