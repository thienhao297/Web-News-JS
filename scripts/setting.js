"use strict";
// khai bao bien

const newsPerPage = document.getElementById("input-page-size");
const newsCategory = document.getElementById("input-category");
const saveBtn = document.getElementById("btn-submit");

// function

function clearInput() {
  newsPerPage.value = "";
  newsCategory.value = "General";
}

// event hanlder

saveBtn.addEventListener("click", function () {
  const setting = {
    pagesize: newsPerPage.value,
    category: newsCategory.value,
  };
  if (!newsPerPage.value) {
    alert("Please in put News per page");
  } else {
    // tạo localstorage để lưu setting
    saveToStorage("setting", JSON.stringify(setting));
    clearInput();
  }
});
