"use strict";

// Select element

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcome = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

/////////////

// khai báo current account từ local storage khi login

let currentAccount = JSON.parse(getFromStorage("currentUser"));
if (getFromStorage("currentUser")) {
  loginModal.classList.add("hidden");
  welcome.textContent = `Welcome ${currentAccount.firstname}`;
} else {
  btnLogout.classList.add("hidden");
}

//Event handler

btnLogout.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  loginModal.classList.remove("hidden");
  welcome.textContent = "";
  btnLogout.classList.add("hidden");
});
