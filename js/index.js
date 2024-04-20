console.log("index.js");

// fetch request to get the albums from the albums resourse on the mock api service
async function appInit() {
  const res = await fetch(
    "https://66147b812fc47b4cf27c6899.mockapi.io/api/v1/albums"
  );
  const payload = await res.json();
  console.log(payload);
}

appInit();

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

import { addToFavorites } from "./api/tasks.js";
import { fetcher } from "./utils/fetcher.js";
import { albumCard } from "./templates/albumCard.js";
import { favoriteCard } from "./templates/favoriteCard.js";

// data albumStore
let albumStore = [];
let favoriteStore = [];

function searchAlbums() {
  // get the search input value
  const searchInput = document.getElementById("searchInput").value;
  console.log(searchInput);
}
