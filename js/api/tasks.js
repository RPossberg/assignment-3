// Description: API for tasks
async function postRequest(data) {
  try {
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
    return await requst.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getRequest() {
  const res = await fetch(url);
  return await res.json();
}

async function deleteRequest(id) {
  try {
    const res = await fetch(
      `https://66147b812fc47b4cf27c6899.mockapi.io/api/v1/favorites/${id}`,
      {
        method: "DELETE",
      }
    );
    return await res.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

export { postRequest, getRequest, deleteRequest };
