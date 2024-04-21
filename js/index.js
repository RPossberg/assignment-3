console.log("index.js"); // log to the console to confirm that the file is being executed

// import the necessary functions from the utils folder
import { template } from "./templates/albumCard";
import { fetcher } from "./utils/fetcher"; // import the fetcher function from the fetcher module
import { albumCard } from "./templates/albumCard";

// fetch request to get the albums from the albums resourse on the mock api service
// store the albums in the store variable
let store;
//  get the master copy of the albums container
const masterCopy = document.querySelector("#favorites").cloneNode(true);
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
