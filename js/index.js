console.log("index.js"); // log to the console to confirm that the file is being executed

// Import necessary functions
import { fetcher } from "./utils/fetcher";
import { albumCard } from "./templates/albumCard";
import { favoriteCard } from "./templates/favoriteCard";
// import { renderAlbums } from "./templates/albumCard.js";

// Global variables
let store; // store the album data
const masterCopy = document.querySelector("#results").cloneNode(true);
let albumStore = []; // store the album data
let favoriteStore = []; // store the favorite album data
//

// Initialization function
async function appInit() {
  store = await fetcher(
    "https://66147b812fc47b4cf27c6899.mockapi.io/api/v1/albums"
  );
}

appInit();

function renderAlbums(albums) {
  const container = masterCopy.cloneNode(true); // Clone the master copy of the results container
  albums.forEach((album) => {
    container.appendChild(albumCard(album)); // Append each album card to the container
  });
  const resultsContainer = document.querySelector("#results");
  resultsContainer.innerHTML = ""; // Clear previous results

  albums.forEach((album) => {
    // Use the albumCard function for each album
    const card = albumCard(album); // albumCard returns a DOM element

    // Append the card to the results container
    // Check if the card is a string or a DOM element
    if (typeof card === "string") {
      resultsContainer.innerHTML += card; // If card is an HTML string
    } else {
      resultsContainer.appendChild(card); // If card is a DOM element
    }
  });

  addAlbumInteractivity(resultsContainer); // Add interactivity to the rendered albums
}

function addAlbumInteractivity(container) {
  container.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const uid = e.target.getAttribute("data-uid");
      const album = store.find((album) => album.uid === uid);
      const favoriteIndex = favoriteStore.findIndex(
        (album) => album.uid === uid
      );

      if (favoriteIndex === -1) {
        favoriteStore.push(album);
      } else {
        favoriteStore.splice(favoriteIndex, 1);
      }
      // Update the UI after adding or removing an album from favorites to reflect the change
      renderAlbums(store);
    });
  });
}

// Setup tab switching between the Search Albums and Favorite Albums tabs in the UI
const searchTab = document.querySelector("#search-button");
const favoriteTab = document.querySelector("#favorites-button");
const searchBtn = document.querySelector("#search-button");

// Search Tab
searchTab.addEventListener("click", () => {
  searchTab.classList.add("active");
  searchBtn.classList.remove("d-none");
  favoriteTab.classList.remove("active");
  renderAlbums(store);
});

// Favorites Tab
favoriteTab.addEventListener("click", () => {
  favoriteTab.classList.add("active");
  searchTab.classList.remove("active");
  searchBtn.classList.add("d-none");
  // If there are no favorite albums, display a message to the user and display the search tab.
  if (favoriteStore.length === 0) {
    alert("No favorite albums found.");
    searchTab.click();
  } else {
    renderAlbums(favoriteStore);
  }
});

// Add to Favorites
async function onAddToFavorites(event) {
  const uid = event.target.getAttribute("data-uid");
  const album = store.find((album) => album.uid === uid);
  favoriteStore.push(album);
  renderAlbums(store);
  console.log(favoriteStore);
}

// Change the button text on the album card to "Remove from Favorites" when the album is already in the favorites list and add an event listener to remove the album from the favorites list when the button is clicked.
function updateFavoriteButton(album) {
  const favoriteIndex = favoriteStore.findIndex(
    (favorite) => favorite.uid === album.uid
  );
  if (favoriteIndex !== -1) {
    const button = document.querySelector(`button[data-uid="${album.uid}"]`);
    button.textContent = "Remove from Favorites";
    button.removeEventListener("click", onAddToFavorites);
    button.addEventListener("click", onRemoveFromFavorites);
  }
}

// Remove from Favorites
// async function onRemoveFromFavorites(event) {
//   const uid = event.target.getAttribute("data-uid");
//   const albumIndex = favoriteStore.findIndex((album) => album.uid === uid);
//   favoriteStore.splice(albumIndex, 1);
//   renderAlbums(store);
// }
async function onRemoveFromFavorites(event) {
  const uid = event.target.getAttribute("data-uid");
  const albumIndex = favoriteStore.findIndex((album) => album.uid === uid);
  if (albumIndex !== -1) {
    favoriteStore.splice(albumIndex, 1);
    updateFavoriteButton(album); // Ensure the button is updated
  }
  renderAlbums(store);
}

document.addEventListener("DOMContentLoaded", (e) => {
  {
    e.preventDefault();
    const query = document.querySelector("#query").value.trim();
    console.log(query);
    const results = store.filter((album) => {
      return album.albumName.toLowerCase().includes(query.toLowerCase());
    });

    renderAlbums(results);
  }
});
// when the user requests a search, query the album data for matches on both the artistName and the albumName. Use the template in the albumCard.js file to render the results
document.querySelector("#search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const query = document.querySelector("#query").value.trim().toLowerCase();

  if (Array.isArray(store)) {
    const results = store.filter(
      (album) =>
        album.albumName.toLowerCase().includes(query) ||
        album.artistName.toLowerCase().includes(query)
    );
    renderAlbums(results);
  } else {
    console.error("'store' is not properly initialized or is not an array.");
    // Optionally, handle the error, e.g., display a message to the user
  }
});

// when the user requests to view the favorite albums, render the favorite albums to the DOM
document.querySelector("#favorites-button").addEventListener("click", (e) => {
  e.preventDefault();
  renderAlbums(favoriteStore);
});

// when the user requests to view the search results, render the search results to the DOM
document.querySelector("#search-button").addEventListener("click", (e) => {
  e.preventDefault();
  renderAlbums(store);
});
