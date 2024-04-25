import { toElement } from "../utils/toElement.js";

function albumTemplate({ artistName, albumName, averageRating, uid }) {
  const template = `
  <li data-uid=${uid} class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">
        ${albumName}
        <span class="badge bg-primary rounded-pill">${averageRating}</span>
      </div>
      <span> ${artistName} </span>
    </div>
    <button data-uid=${uid} type="button" class="btn btn-success">Add to Favorites</button>
  </li>`;

  return template;
}

// // Define a function that renders the albums to the DOM
// function renderAlbums(albums) {
//   const resultsContainer = document.querySelector("#results");
//   resultsContainer.innerHTML = ''; // Clear previous results

//   albums.forEach(album => {
//     const card = albumCard(album); // AlbumCard returns a DOM element
//     resultsContainer.appendChild(card);
//   });

//   // Attach event listeners to all "Add to Favorites" buttons
//   document.querySelectorAll('.add-to-favorites-btn').forEach(button => {
//     button.addEventListener('click', onAddToFavorites);
//   });
// }

// function renderAlbums(albums) {
//   const resultsContainer = document.querySelector("#results");
//   resultsContainer.innerHTML = ''; // Clear previous results

//   albums.forEach(album => {
//     const card = albumCard(album); // AlbumCard returns a DOM element
//     resultsContainer.appendChild(card);
//   });

//   // Attach event listeners to all "Add to Favorites" buttons
//   document.querySelectorAll('.add-to-favorites-btn').forEach(button => {
//     button.addEventListener('click', onAddToFavorites);
//   });
// }

export function albumCard(album) {
  const template = albumTemplate(album);
  return toElement(template);
}
