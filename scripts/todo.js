"use strict";

// select element

const btnAdd = document.getElementById("btn-add");
const inputTask = document.getElementById("input-task");
const todoList = document.getElementById("todo-list");

// Khai báo biến

let todoArr;

// check localstorage và lấy dữ liệu

if (getFromStorage("todoArr")) {
  todoArr = JSON.parse(getFromStorage("todoArr"));
}
let userData = JSON.parse(getFromStorage("currentUser"));

let validate = false;

// tạo class

class Task {
  constructor(task, owner, isDone = false) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}

renderToDoList(todoArr);

// Event handler

btnAdd.addEventListener("click", function () {
  const taskData = new Task(inputTask.value, userData.username);

  if (inputTask.value == "") {
    alert("Please inpust task");
  } else {
    validate = true;
  }

  if (validate) {
    todoArr.push(taskData);
    inputTask.value = "";
    renderToDoList(todoArr);
    saveToStorage("todoArr", JSON.stringify(todoArr));
  }
});

//function

// tạo danh sách todo

function renderToDoList(todoArr) {
  todoList.innerHTML = "";
  todoArr = todoArr.filter((todo) => todo.owner === userData.username);
  todoArr.forEach((todo) => {
    const row = `<li class="${todo.isDone ? "checked" : ""}" onclick="done('${
      todo.task
    }')">${todo.task}<span onclick="deltodo('${
      todo.task
    }')" class="close">×</span></li>`;
    todoList.insertAdjacentHTML("beforeend", row);
  });
}

// check done bằng event handler để xác định target toggle

todoList.addEventListener("click", checked, false);
function checked(evt) {
  evt.target.classList.toggle("checked");
}

//Hàm done để lưu task đã check vào dữ liệu

function done(tk) {
  let taska = tk;
  todoArr.forEach((todo) => {
    if (todo.task === taska) {
      todo.isDone = todo.isDone ? false : true;
    }
  });
  saveToStorage("todoArr", JSON.stringify(todoArr));
}

// hàm del để xóa task

function deltodo(tsk) {
  let taskcontent = tsk;
  if (confirm("Are you sure?")) {
    todoArr.splice(
      todoArr.findIndex((x) => x.task === taskcontent),
      1
    );
  }
  renderToDoList(todoArr);
  saveToStorage("todoArr", JSON.stringify(todoArr));
}
