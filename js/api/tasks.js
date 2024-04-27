async function deleteRequest(id) {
  const res = await fetch(
    `https://66147b812fc47b4cf27c6899.mockapi.io/api/v1/favorites/${id}`,
    {
      method: "DELETE",
    }
  );
  return await res.json();
}

//
async function postRequest(data) {
  const res = await fetch(
    "https://66147b812fc47b4cf27c6899.mockapi.io/api/v1/favorites",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await res.json();
}

async function getRequest() {
  const res = await fetch(
    "https://66147b812fc47b4cf27c6899.mockapi.io/api/v1/albums"
  );
  return await res.json();
}

export { postRequest, getRequest, deleteRequest };
