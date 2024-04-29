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
    <button data-uid=${uid} type="button" class="btn btn-success">Remove from Favorites</button>
  </li>`;

  return template;
}

// function addToFavorites(apiUrl, itemId) {
//   // Define the data to be sent in the body of the request
//   const data = {
//     id: 1,
//     artistName: "Artist Name",
//     albumName: "Album Name",
//     releaseDate: "2021-01-01",
//     genres: ["Pop", "Rock"],
//     descriptors: ["Energetic", "Upbeat"],
//     averageRating: 4.5,
//     numberRatings: 100,
//     numberReviews: 50,
//     uid: "123456",
//   };
// }

export function favoriteCard(album) {
  const template = albumTemplate(favoriteCard);
  console.log(favoriteCard);
  return toElement(template);
}
