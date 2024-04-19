console.log("index.js");

// fetch request to gewt the albums from the albums resourse on the mock api service
async function appInit() {
  const res = await fetch(
    "https://66147b812fc47b4cf27c6899.mockapi.io/api/v1/albums"
  );
  const payload = await res.json();
  console.log(payload);
}

appInit();
