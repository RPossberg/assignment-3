console.log("index.js"); // log to the console to confirm that the file is being executed

// Import necessary functions
import { fetcher } from "./utils/fetcher";
import { albumCard } from "./templates/albumCard";
import { favoriteCard } from "./templates/favoriteCard";

// Global variables
let store;
const masterCopy = document.querySelector("#results").cloneNode(true);
let albumStore = [];
let favoriteStore = [];

// Initialization function
async function appInit() {
  let store = await fetcher(
    "https://66147b812fc47b4cf27c6899.mockapi.io/api/v1/albums"
  );

  renderAlbums(store); // render albums
  console.log(store);
}

appInit();

function renderAlbums(albums) {
  const container = masterCopy.cloneNode(true);
  albums.forEach((album) => {
    container.appendChild(albumCard(album));
  });

  // interactive templating
  // container.querySelectorAll("button").forEach((button) => {
  //   button.addEventListener("click", (e) => {
  //     const uid = e.target.getAttribute("data-uid");
  //     const album = store.find((album) => album.uid === uid);
  //     const favoriteIndex = favoriteStore.findIndex(
  //       (album) => album.uid === uid
  //     );

  //     if (favoriteIndex === -1) {
  //       favoriteStore.push(album);
  //     } else {
  //       favoriteStore.splice(favoriteIndex, 1);
  //     }

  //     renderAlbums(store);
  //   });
  // });

  document.querySelector("#results").replaceWith(container);
}

// Setup tabswitching between the Search Albums and Favorite Albums tabs in the UI
const searchTab = document.querySelector("#search-button");
const favoriteTab = document.querySelector("#favorites-button");

searchTab.addEventListener("click", () => {
  searchTab.classList.add("active");
  searchBtn.classList.remove("d-none");
  favoriteTab.classList.remove("active");
  favoritesBtn.classList.add("d-none");
  renderAlbums(store);
});

favoriteTab.addEventListener("click", () => {
  favoriteTab.classList.add("active");
  searchBtn.classList.add("d-none");
  searchTab.classList.remove("active");
  favoritesBtn.classList.remove("d-none");
  renderAlbums(favoriteStore);
});

// when the user requests a search, query the album data for matches on both the artistName and the albumName. Use the template in the albumCard.js file to render the results
const searchBtn = document.querySelector("#search-button");
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const query = document.querySelector("#query").value.trim();
  const results = store.filter((album) => {
    return album.albumName.toLowerCase().includes(query.toLowerCase());
  });

  renderAlbums(results);
  console.log(results);
});

// document.addEventListener("DOMContentLoaded", (e) => {
//   {
//     e.preventDefault();
//     const query = document.querySelector("#query").value.trim();
//     console.log(query);
//     const results = store.filter((album) => {
//       return album.albumName.toLowerCase().includes(query.toLowerCase());
//     });

//     renderAlbums(results);
//   }
// });
