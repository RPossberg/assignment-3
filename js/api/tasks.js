async function deleteRequest(id) {
  const res = await fetch(
    `https://66147b812fc47b4cf27c6899.mockapi.io/api/v1/favorites/${id}`,
    {
      method: "DELETE",
    }
  );
  return await res.json();
}

export { postRequest, getRequest, deleteRequest };
