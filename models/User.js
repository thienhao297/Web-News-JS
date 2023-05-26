"use strict";

// Tạo class User
class User {
  constructor(firstname, lastname, username, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
  }

  // Tạo method news để lấy dữ liệu từ api

  news = async function news(country, pagesize, num, category) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pagesize}&page=${num}&apiKey=1263671da95a415fb191a7380418694c`
      );
      const data = await res.json();
      const artArr = data.articles;
      totalResult = data.totalResults;
      renderArticles(artArr);
    } catch (err) {
      console.error(err);
    }
  };
}
// khai báo newscontainer chung ở user để sử dụng cho cả page news và search

const newsContainer = document.getElementById("news-container");

// tạo hàm render hiển thị bài báo bằng Template String

function renderArticles(artArr) {
  newsContainer.innerHTML = "";
  artArr.forEach((art) => {
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
