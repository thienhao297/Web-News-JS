"use strict";

//select element

const searchBtn = document.getElementById("btn-submit");
const inputQuery = document.getElementById("input-query");
const btnPrevious = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");

//Khai báo biến

let num = 1;
let pagesize = 5;
let totalResult;

// event handler

searchBtn.addEventListener("click", function () {
  if (inputQuery.value == "") {
    alert("Please input value!");
  } else {
    search(`${inputQuery.value}`, pagesize, num);
  }
});

btnNext.addEventListener("click", function () {
  pageNum.textContent++;
  num++;
  search(`${inputQuery.value}`, pagesize, num);
  ctprev();
  ctnext();
});

btnPrevious.addEventListener("click", function () {
  pageNum.textContent--;
  num--;
  search(`${inputQuery.value}`, pagesize, num);
  ctprev();
  ctnext();
});

//function

async function search(q, pagesize, num) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${q}&pageSize=${pagesize}&page=${num}&apiKey=1263671da95a415fb191a7380418694c`
    );
    const data = await res.json();
    console.log(data);
    const searchArr = data.articles;
    totalResult = data.totalResults;
    renderSearch(searchArr);
  } catch (err) {
    console.error(err);
  }
}

function renderSearch(searchArr) {
  newsContainer.innerHTML = "";
  searchArr.forEach((art) => {
    const artNews = `
    <div class="card flex-row flex-wrap">
      <div class="card mb-3">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img
              src="${art.urlToImage ? art.urlToImage : ""}"
              class="card-img"
              alt="${art.urlToImage ? art.description : "Img not found"}"
            />
          </div>
         <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
              ${art.title}
              </h5>
              <p class="card-text">
              ${art.content}
              </p>
              <a
                href="${art.url}"
                class="btn btn-primary"
                >View</a>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    newsContainer.insertAdjacentHTML("beforeend", artNews);
  });
}

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
