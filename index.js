// DOM Imports
const searchBtn = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");
let searchHTML = "";
let watchListItems = JSON.parse(localStorage.getItem("watchListItems")) || [];
const myWatchListLink = document.getElementById("myWatchListLink");
const startExploringContainer = document.getElementById(
  "start-exploring-inner"
);
const movieContainer = document.getElementById("movie-container");

// Search Function
searchBtn.addEventListener("click", async () => {
  let movieTitle = searchBar.value;
  searchHTML = "";
  const response = await fetch(
    `http://www.omdbapi.com/?apikey={KEY HERE}&s=${movieTitle}&r=json`
  );
  const data = await response.json();
  if (data.Response) {
    startExploringContainer.style.display = "none";
  }
  data.Search.forEach((movie) => {
    searchHTML += `

          <div data-imdbid="${movie.imdbID}" id="movie-element" class="movie-element">
            <img
              class="movie-image"
              src="${movie.Poster}"
            />

            <div class="movie-element-inner">
              <div class="movie-header">
                <h1>${movie.Title}</h1>
                <img
                  class="rating-img"
                  src="/movie-watchlist/images/ratingIcon.png"
                />
                <p>8.0</p>
              </div>

              <div class="movie-details">
                <p>164 min</p>
                <p>Action, Drama, Mystery</p>
                <button class="movie-watchlist-btn">
                  <img
                    class="watchlist-btn-img"
                    src="/movie-watchlist/images/addWatchListIcon.png"
                  />
                  Watchlist
                </button>
              </div>

              <div class="movie-desc">
                <p>
                  Young Blade Runner K's discovery of a long-buried secret leads
                  him to track down former Blade Runner Rick Deckard, who's been
                  missin...
                </p>
              </div>
            </div>
          </div>
      `;
  });
  movieContainer.innerHTML = searchHTML;
  console.log(data);
});

// Watchlist Btn Function
movieContainer.addEventListener("click", (event) => {
  if (event.target.closest(".movie-watchlist-btn")) {
    let movieElement = event.target.closest(".movie-element");
    let imdbID = movieElement.dataset.imdbid;
    if (movieElement) {
      watchListItems.push({
        imdbID: imdbID,
      });

      localStorage.setItem("watchListItems", JSON.stringify(watchListItems));
      movieElement.remove();
    }
  }
});
