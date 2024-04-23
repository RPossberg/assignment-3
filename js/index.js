console.log("index.js"); // log to the console to confirm that the file is being executed

// import the necessary functions from the utils folder

import { fetcher } from "./utils/fetcher"; // import the fetcher function from the fetcher module
import { albumCard } from "./templates/albumCard";

// fetch request to get the albums from the albums resourse on the mock api service
// store the albums in the store variable
let store;
//  get the master copy of the albums container
const masterCopy = document.querySelector("#results").cloneNode(true);

async function appInit() {
  const store = await fetcher(
    "https://66147b812fc47b4cf27c6899.mockapi.io/api/v1/albums"
  );

  renderAlbums(store); // render albums
  console.log(store);
}

appInit();

// data albumStore
let albumStore = [];
let favoriteStore = [];

function renderAlbums(albums) {
  const container = masterCopy.cloneNode(true);
  albums.forEach((album) => {
    container.appendChild(albumCard(album));
  });

  // interactive templating
  //
  // const elem = document.createRange().createContextualFragment(template)
  //   .children[0];

  document.querySelector("#results").replaceWith(container);
}

// Setup tabswitching between the Search Albums and Favorite Albums tabs in the UI
const searchTab = document.querySelector("#search-button");
const favoriteTab = document.querySelector("#favorites-button");

searchTab.addEventListener("click", () => {
  searchTab.classList.add("active");
  favoriteTab.classList.remove("active");
  renderAlbums(store);
});

favoriteTab.addEventListener("click", () => {
  favoriteTab.classList.add("active");
  searchTab.classList.remove("active");
  renderAlbums(favoriteStore);
});

function onDisplaySearchResults(albums) {
  const searchResultsElement = document.getElementById("searchResults");
  searchResultsElement.innerHTML = ""; // Clear existing content
  albums.forEach((album) => {
    const albumElement = document.createElement("div");
    albumElement.textContent = album.albumName;
    searchResultsElement.appendChild(albumElement);
  });
}

function onDisplayFavoriteResults(albums) {
  const favoriteResultsElement = document.getElementById("favoriteResults");
  favoriteResultsElement.innerHTML = ""; // Clear existing content
  albums
    .filter((album) => album.isFavorite)
    .forEach((album) => {
      const albumElement = document.createElement("div");
      albumElement.textContent = album.albumName;
      favoriteResultsElement.appendChild(albumElement);
    });
}

async function loadData() {
  const albums = await fetchAlbums();
  onDisplaySearchResults(albums); // Initially display all albums in the search tab
  onDisplayFavoriteResults(albums); // Display favorite albums
}

loadData();

// swap the active class between the tabs
// searchTab.addEventListener("click", () => {
//   searchTab.classList.add("active");
//   favoriteTab.classList.remove("active");
//   renderAlbums(store);
// });

// favoriteTab.addEventListener("click", () => {
//   favoriteTab.classList.add("active");
//   searchTab.classList.remove("active");
//   renderAlbums(favoriteStore);
// });

// function to handle the search submission
function searchFilter(query, data) {
  e.preventDefault();
  const trimmedQuery = query.trim().toLowerCase();
  const searchResult = searchAlbums(query);
  renderAlbums(searchResult);
  console.log(searchResult);
}

// function to search for albums based on the query
function searchAlbums(query) {
  return store.filter((album) => {
    return album.albumName.toLowerCase().includes(query.toLowerCase());
  });
}
