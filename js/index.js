console.log("index.js"); // log to the console to confirm that the file is being executed

import { toElement } from "./utils/toElement";
import { fetcher } from "./utils/fetcher"; // fetcher function
import { addToFavorites } from "./api/tasks";
import { albumCard } from "./templates/albumCard";
import { favoriteCard } from "./templates/favoriteCard";

// fetch request to get the albums from the albums resourse on the mock api service
// store the albums in the store variable
let store;
//  get the master copy of the albums container
const masterCopy = document.querySelector("#favorites").cloneNode(true);
async function appInit() {
  store = await fetcher(
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
  const albumCardElements = albums.map((albumData) => albumCard(albumData));
  console.log(albumCardElements);

  albumCardElements.forEach((item) => {
    container.appendChild(item);
  });

  // interactive templating
  //
  const elem = document.createRange().createContextualFragment(template)
    .children[0];

  document.querySelector("#favorites").replaceWith(container);
}
