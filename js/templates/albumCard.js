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

export function albumCard(album) {
  const template = albumTemplate(album);
  return toElement(template);
}
