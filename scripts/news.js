"use strict";

//select element

const btnPrevious = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");

// Khai báo biến

let userData = JSON.parse(getFromStorage("currentUser"));
let num = 1;
let totalResult;
let pagesize, category;

// check setting từ local storage đã lưu từ trang setting, nếu không có thì khai báo setting mặc định ban đầu

if (getFromStorage("setting")) {
  pagesize = JSON.parse(getFromStorage("setting")).pagesize;
  category = JSON.parse(getFromStorage("setting")).category;
} else {
  pagesize = 5;
  category = "general";
}
// News content

function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password
  );
  return user;
}

userData = parseUser(userData);
userData.news("us", pagesize, num, category);

// Page control

function ctprev() {
  if (pageNum.textContent == 1) {
    btnPrevious.classList.add("hidden");
  } else btnPrevious.classList.remove("hidden");
}

ctprev();

function ctnext() {
  if (pageNum.textContent == Math.trunc(totalResult / pagesize + 1)) {
    btnNext.classList.add("hidden");
  } else btnNext.classList.remove("hidden");
}

// event handler

btnNext.addEventListener("click", function () {
  pageNum.textContent++;
  num++;
  userData.news("us", pagesize, num);
  ctprev();
  ctnext();
});

btnPrevious.addEventListener("click", function () {
  pageNum.textContent--;
  num--;
  userData.news("us", pagesize, num);
  ctprev();
  ctnext();
});
