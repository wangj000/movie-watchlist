const watchlistContainer = document.getElementById("watchlist-container");
const startExploringWatchList = document.getElementById(
  "start-exploring-watchlist"
);

document.addEventListener("DOMContentLoaded", async () => {
  let movieIDs = JSON.parse(localStorage.getItem("watchListItems"));
  let html = "";

  if (movieIDs && movieIDs.length > 0) {
    startExploringWatchList.style.display = "none";

    const movieDataPromises = movieIDs.map(async (movie) => {
      let res = await fetch(
        `http://www.omdbapi.com/?apikey={KEY HERE}&i=${movie.imdbID}`
      );
      let data = await res.json();

      return `<div data-imdbid="${data.imdbID}" id="movie-element" class="movie-element">
            <img
              class="movie-image"
              src="${data.Poster}"
            />

            <div class="movie-element-inner">
              <div class="movie-header">
                <h1>${data.Title}</h1>
                <img
                  class="rating-img"
                  src="/movie-watchlist/images/ratingIcon.png"
                />
                <p>${data.imdbRating}</p>
              </div>

              <div class="movie-details">
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <button class="movie-remove-btn">
                  <img
                    class="watchlist-btn-img"
                    src="/movie-watchlist/images/removeIcon.png"
                  />
                  Remove
                </button>
              </div>

              <div class="movie-desc">
                <p>
                  ${data.Plot}
                </p>
              </div>
            </div>
          </div>`;
    });

    // const movieHTMLArray = await Promise.all(movieDataPromises);
    const movieHTMLArray = await Promise.all(movieDataPromises);

    html = movieHTMLArray.join("");

    watchlistContainer.innerHTML = html;
  } else {
    startExploringWatchList.style.display = "flex";
    watchlistContainer.innerHTML = "";
  }
});

watchlistContainer.addEventListener("click", (event) => {
  if (event.target.closest(".movie-remove-btn")) {
    let movieElement = event.target.closest(".movie-element");
    let imdbID = movieElement.dataset.imdbid;

    if (movieElement) {
      let watchListItems =
        JSON.parse(localStorage.getItem("watchListItems")) || [];
      watchListItems = watchListItems.filter(
        (movie) => movie.imdbID !== imdbID
      );
      localStorage.setItem("watchListItems", JSON.stringify(watchListItems));

      movieElement.remove();

      if (watchListItems.length === 0) {
        startExploringWatchList.style.display = "flex";
      }
    }
  }
});
