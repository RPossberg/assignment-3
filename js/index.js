console.log("index.js");

/*
  Search Album View
  For the UI view, we need to add the search albums functionality.
  - search the album data objects artistName and albumName properties.
  - return any results that match the search query and render the album data using the template provided in the markup. Use interactive templating so the user can add an album to their favorites list.

            <!-- SEARCH  RESULTS  -->

              <!-- TEMPLATE -->
              <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                  <div class="fw-bold">
                    Name of the Album
                    <span class="badge bg-primary rounded-pill">4.23</span>
                  </div>
                  <span>Artist</span>
                </div>
                <button data-uid=${uid} type="button" class="btn btn-success">Add to Favorites</button>
              </li>

*/
import { fetcher } from "./utils/fetcher";
import { addToFavorites } from "./api/tasks";
import { albumCard } from "./templates/albumCard";
import { favoriteCard } from "./templates/favoriteCard.js";

// fetch request to get the albums from the albums resourse on the mock api service
let store;
async function appInit() {
  store = await fetcher(
    "https://66147b812fc47b4cf27c6899.mockapi.io/api/v1/albums"
  );

  renderAlbums(store);
  console.log(store);
}

appInit();

// data albumStore
let albumStore = [];
let favoriteStore = [];

function renderAlbums(albums) {
  const albumCardElements = albums.map((albumData) => albumCard(albumData));
  console.log(object);
}
