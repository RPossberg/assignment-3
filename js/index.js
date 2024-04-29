console.log("index.js"); // log to the console to confirm that the file is being executed

// Import necessary functions
import { fetcher } from "./utils/fetcher";
import { albumCard } from "./templates/albumCard";
import { favoriteCard } from "./templates/favoriteCard";
import { postRequest, deleteRequest } from "./api/tasks";

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
    button.addEventListener("click", (addEventListener) => {
      // Add an event listener to each button
      const uid = button.getAttribute("data-uid");
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

const searchButton = document.querySelector("#search-button");
const favoritesButton = document.querySelector("#favorites-button");
const searchTab = document.querySelector("#search-tab");
const favoritesTab = document.querySelector("#favorites-tab");
console.log(favoritesTab);

// Search Tab
searchButton.addEventListener("click", () => {
  // If the search tab is clicked, display the search tab and hide the favorite tab
  searchButton.classList.add("active"); // Add the active class to the search button
  searchTab.classList.remove("d-none"); // Remove the d-none class from the search tab
  favoritesButton.classList.remove("active");
  favoritesTab.classList.add("d-none");
});

// // Setup tab switching between the Search Albums and Favorite Albums tabs in the UI
// const searchTab = document.querySelector("#search-tab");
// const favoriteTab = document.querySelector("#favorites-button");
// const searchBtn = document.querySelector("#search-button");
// const favoriteBtn = document.querySelector("#favorites-tab");
// console.log(searchTab, favoriteTab, searchBtn, favoriteBtn);

// // Search Tab
// searchTab.addEventListener("click", () => {
//   searchTab.classList.remove("d-none");
//   searchBtn.classList.add("active");
//   favoriteTab.classList.remove("d-none");
// });

// Favorites Tab
favoritesTab.addEventListener("click", () => {
  favoriteTab.classList.add("active");
  searchTab.classList.remove("d-none");
  searchBtn.classList.add("active");
  // If there are no favorite albums, display a message to the user and display the search tab.
  if (favoriteStore.length === 0) {
    alert("No favorite albums found.");
    searchTab.click();
  } else {
    renderAlbums(favoriteStore);
    console.log(favoriteStore);
  }
});

function addToFavorites(Url, uid) {
  // Define the data to be sent in the body of the request
  const data = {
    id: 1,
    artistName: "Artist Name",
    albumName: "Album Name",
    releaseDate: "2021-01-01",
    genres: ["Pop", "Rock"],
    descriptors: ["Energetic", "Upbeat"],
    averageRating: 4.5,
    numberRatings: 100,
    numberReviews: 50,
    uid: "123456",
  };

  // Use the Fetch API to make the request
  fetch(`${Url}/favorites`, {
    method: "POST", // Specify the method
    headers: {
      "Content-Type": "application/json", // Set the content type header
    },
    body: JSON.stringify(data), // Convert the data to a JSON string
  })
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => console.log(data)) // *Log the data for debugging
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Add to Favorites
async function onAddToFavorites(e) {
  const uid = e.target.getAttribute("data-uid");
  const index = e.target.dataset.index;
  const album = store.find((album) => album.uid === uid);
  // const favoriteAlbum = favoriteStore.find((album) => album.uid === uid);
  const favoriteAlbum = searchedResults[parseInt(index)];
  // prevent default behavior
  e.preventDefault();
  if (
    !favoriteStore.some((album) => album.uid === favoriteAlbum.uid) &&
    e.target.hasAttribute("data-uid")
  ) {
    // Check if the album is already in the favorites list
    const temp = await postRequest(favoriteAlbum);
    favoriteStore.push(temp);
    favoriteStore = [...favoriteStore, temp];
    // console.log(temp);
    // renderAlbums(favoriteStore);
    addToFavorites(favoriteAlbum);
    renderAlbums(store);
    console.log(favoriteStore);
  }

  // favoriteStore.push(album);
  // renderAlbums(store);
  // console.log(favoriteStore);
}

// Remove from Favorites
async function onRemoveFromFavorites(e) {
  const uid = e.target.getAttribute("data-uid");
  const albumIndex = favoriteStore.findIndex((album) => album.uid === uid);
  console.log(favoriteAlbumToRemove);
  favoriteStore.splice(albumIndex, 1);
  console.log(favoriteStore);
  renderAlbums(store);
}

// Change the button text on the album card to "Remove from Favorites" when the album is already in the favorites list and add an event listener to remove the album from the favorites list when the button is clicked.
// function updateFavoriteButton(album, favoriteStore) {
//   const favoriteIndex = favoriteStore.findIndex(
//     (favorite) => favorite.uid === album.uid
//   );
//   if (favoriteIndex !== -1) {
//     const button = document.querySelector(`button[data-uid="${album.uid}"]`);
//     button.textContent = "Remove from Favorites";
//     button.removeEventListener("click", onAddToFavorites);
//     button.addEventListener("click", onRemoveFromFavorites);
//   }
// }

function updateFavoriteButton() {
  let element = document.querySelector("#favorites-tab"); // Get the element
  if (element) {
    // Check if the element exists
    element.textContent = "Add to Favorites"; // Change the text content
    element.textContent = "Remove from Favorites"; // Change the text content
  } else {
    // If the element does not exist
    console.log("#myElement does not exist in the DOM");
  }
}

// Remove from Favorites
async function onRemoveFavorite(e) {
  const uid = e.target.dataset.uid;
  const favoriteAlbumToRemove = favoriteStore.find(
    (album) => album.uid === uid
  );

  if (
    favoriteStore.includes(favoriteAlbumToRemove) &&
    e.target.hasAttribute("data-uid")
  );
  renderFavoriteAlbums(favoriteStore);
  await deleteRequest(favoriteAlbumToRemove.id);
}

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
    console.error("'store' is not properly initialized or is not an array."); // q: what are the ways to handle anonymous functions?
    // Optionally, handle the error, e.g., display a message to the user
  }
});

// when the user requests to view the favorite albums, render the favorite albums to the DOM. Use the template in the favoriteCard.js file to render the results
document.querySelector("#favorites-button").addEventListener("click", (e) => {
  e.preventDefault();
  renderAlbums(favoriteStore);
  updateFavoriteButton(favoritesButton, favoriteStore);
  console.log(favoriteStore);
});
// document.querySelector("#favorites-button").addEventListener("click", (e) => {
//   e.preventDefault();
//   renderAlbums(favoriteStore);
//   updateFavoriteButton(favoritesButton, favoriteStore);
//   console.log(favoriteStore);
// });

// when the user requests to view the search results, render the search results to the DOM
document.querySelector("#search-button").addEventListener("click", (e) => {
  e.preventDefault();
  renderAlbums(store);
});

appInit().then(() => {
  renderAlbums(store);
});
