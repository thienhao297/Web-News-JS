"use strict";
// Elect Element

const btnSubmit = document.getElementById("btn-submit");
const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");

// Khai bao bien

let nameList = [];
if (getFromStorage("userArr")) {
  userArr.forEach((user) => nameList.push(user.username));
}
// Function

const validateData = function () {
  if (
    inputFirstname.value == "" ||
    inputLastname.value == "" ||
    inputUsername.value == "" ||
    inputPassword.value == "" ||
    inputPasswordConfirm.value == "" ||
    inputPassword.value !== inputPasswordConfirm.value ||
    inputPassword.value.length < 8
  ) {
    return false;
  } else {
    return true;
  }
};

const cleatInput = function () {
  inputFirstname.value = "";
  inputLastname.value = "";
  inputUsername.value = "";
  inputPassword.value = "";
  inputPasswordConfirm.value = "";
};

// Event handler
btnSubmit.addEventListener("click", function () {
  // nhận dữ liệu
  const user = {
    firstname: inputFirstname.value,
    lastname: inputLastname.value,
    username: inputUsername.value,
    password: inputPassword.value,
  };

  // validate

  if (
    inputFirstname.value == "" ||
    inputLastname.value == "" ||
    inputUsername.value == "" ||
    inputPassword.value == "" ||
    inputPasswordConfirm.value == ""
  ) {
    alert("Please fill out the form below!");
  }

  if (inputPassword.value !== inputPasswordConfirm.value) {
    alert("Password and PasswordConfirm must be the same!");
  }

  if (inputPassword.value.length < 8) {
    alert("Password must be more than 8 letters!");
  }

  let validate = validateData();

  // check username có bị trùng hay không

  for (let i = 0; i < nameList.length; i++) {
    if (inputUsername.value === nameList[i]) {
      alert("username already used!");
      validate = false;
    }
  }

  // lưu thông tin vào local storage và chuyển tới trang login

  if (validate) {
    userArr.push(user);
    nameList.push(inputUsername.value);
    cleatInput();
    saveToStorage(KEY, JSON.stringify(userArr));
    window.location.href = "../pages/login.html";
  }
});
