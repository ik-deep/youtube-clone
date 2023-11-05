const API_KEY = "AIzaSyA5xnx2bY5dwu_EiLlD_TEUTzQcvidtl9o";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

async function fetchVideos(searchQuery, maxResults) {
    // https://www.googleapis.com/youtube/v3/search?key=AIzaSyA5xnx2bY5dwu_EiLlD_TEUTzQcvidtl9o&q=icc
  const response = await fetch(
    `${BASE_URL}/search?key=${API_KEY}&q=${searchQuery}&maxResults=${maxResults}&part=snippet`
  );
  const data = await response.json();
  console.log(data.items);
}
fetchVideos('icc',50)