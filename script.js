const videoContainer = document.querySelector(".video-container");

let apiKey = "AIzaSyB04gVkNKTbIGsmqlYFmDDhaEjdDXwlajU";
let videoUrl = "https://www.googleapis.com/youtube/v3/videos?";
let channelUrl = "https://www.googleapis.com/youtube/v3/channels?";

fetch(
  videoUrl +
    new URLSearchParams({
      key: apiKey,
      part: "snippet",
      chart: "mostPopular",
      maxResults: 75,
      regionCode: "IN",
    })
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((err) => console.log(err));

const getChannelIcon = (video_data) => {
  fetch(
    channelUrl +
      new URLSearchParams({
        key: apiKey,
        part: "snippet",
        id: video_data.snippet.channelId,
      })
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      video_data.channelThumbnail =
        data.items[0].snippet.thumbnails.default.url;
      makeVideoCard(video_data);
    });
};

const makeVideoCard = (data) => {
  videoContainer.innerHTML += `
    <div class="video" onclick ="location.href = 'https://youtube.com/watch?v=${data.id}'">
         <img src="${data.snippet.thumbnails.high.url}" heigth = 300px width = 300px class="thumbnail" alt="channel thumbnail">
           <div class="content">
              <img src="${data.channelThumbnail}" class="channel-icon" alt="channel icon">
                  <div class="info">
                     <h4 class="title">${data.snippet.title}</h4>
                     <p class="channel-name">${data.snippet.channelTitle}</p>
                  </div> 
                 </div>
                </div>
                `;
};

const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#search-button");
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener("click", () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
});
