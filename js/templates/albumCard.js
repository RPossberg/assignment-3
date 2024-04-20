import { toElement } from "../utils/toElement.js";

function albumTemplate({ artistName, albumName, averageRating, uid }) {
  const template = `              <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">
        Name of the Album
        <span class="badge bg-primary rounded-pill">4.23</span>
      </div>
      <span>Artist</span>
    </div>
    <button data-uid=${uid} type="button" class="btn btn-success">Add to Favorites</button>
  </li>`;
  // const element = toElement(template);
  // element.querySelector(".fw-bold").textContent = albumName;
  // element.querySelector("span").textContent = artistName;
  // element.querySelector("span.badge").textContent = averageRating;
  // return element;
  return template;
}

export function albumCard(album) {
  const template = albumTemplate(album);
  return toElement(template);
  console.log(album);
}
