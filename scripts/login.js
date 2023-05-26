"use strict";

// Select element

const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnLogin = document.getElementById("btn-submit");

let currentAccount;

// event handler

btnLogin.addEventListener("click", function () {
  // validate nếu input trống thông báo
  if (inputUsername.value == "" || inputPassword.value == "") {
    alert("Please fill out the form below!");
  }

  // tìm account có username từ  local storage

  currentAccount = userArr.find((acc) => acc.username === inputUsername.value);

  // Nếu không thấy account báo lỗi, nếu có sẽ kiểm tra password đúng sẽ chuyển trang sai sẽ thông báo sai pass

  if (!currentAccount) {
    alert(`Don't find username! Please try a gain!`);
  } else if (currentAccount?.password === inputPassword.value) {
    saveToStorage("currentUser", JSON.stringify(currentAccount));
    window.location.href = "../index.html";
  } else {
    alert("Wrong password, please try again!");
  }
});
