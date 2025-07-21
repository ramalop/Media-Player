let songs = [
  {
    name: "Itni Si Baat",
    filePath: "Azhar - Itni Si Baat.mp3",
    image: "1.JPG",
    genre: "Rock",
  },
  {
    name: "Aayat",
    filePath: "Bajirao Mastani 2015 - Aayat.mp3",
    image: "2.JPG",
    genre: "Rock",
  },
  {
    name: "Lele Meri Jaan",
    filePath: "CDI-Maula Mere Lele Meri Jaan.mp3",
    image: "3.JPG",
    genre: "Pop",
  },
  {
    name: "Channa Ve",
    filePath: "Channa Ve - B Praak.mp3",
    image: "4.JPG",
    genre: "Pop",
  },
  {
    name: "Aye Khuda",
    filePath: "Murder 2-Aye Khuda.mp3",
    image: "6.JPG",
    genre: "HipHop",
  },
  {
    name: "Bjula Dena",
    filePath: "bhuladena.mp3",
    image: "7.JPG",
    genre: "HipHop",
  },

  {
    name: "Duaa",
    filePath: "Shanghai-Duaa.mp3",
    image: "9.JPG",
    genre: "HipHop",
  },
];

// Select DOM elements
const masterPlay = document.querySelector("#masterPlay");
const genreSelect = document.getElementById("genreSelect");
const dynamicFilterSong = document.querySelector(".dynamicFilterSong");
const audio = new Audio(songs[0].filePath);
const songPoster = document.querySelector(".songPoster");
const myProgressBar = document.querySelector("#myProgressBar");
const addSongsBtn = document.querySelector("#addSongs");
const currPlaylist = document.querySelector(".currentPlaylist");
const allPlaylist = document.querySelector(".allPlaylist");
const searchInput = document.querySelector("#searchInput");
const playlistBtn = document.querySelector("#playlistBtn");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");

let currentSongIndex = 0;
let selectedPlaylistDiv = null; // To keep track of the selected playlist

// Function to play a song
function playSongByIndex(index) {
  const song = songs[index];
  audio.src = song.filePath;
  audio.play();

  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");

  songPoster.innerHTML = `
    <img src="${song.image}" alt="${song.name}" class="nowPlayingImage" />
    <p class="nowPlayingName">${song.name}</p>
  `;
}

// Function to render songs based on genre
function renderSongs(genre) {
  dynamicFilterSong.innerHTML = "";
  const filtered =
    genre === "All" ? songs : songs.filter((song) => song.genre === genre);

  filtered.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.className = "songItem";
    songDiv.innerHTML = `
      <img src="${song.image}" alt="${song.name}">
      <span>${song.name}</span>
    `;
    songDiv.addEventListener("click", () => {
      currentSongIndex = songs.indexOf(song);
      playSongByIndex(currentSongIndex);
    });

    dynamicFilterSong.appendChild(songDiv);
  });
}

// Initial load
renderSongs("All");

// Genre change
genreSelect.addEventListener("change", (e) => {
  renderSongs(e.target.value);
});

// Play/Pause toggle
masterPlay.addEventListener("click", () => {
  if (audio.paused || audio.currentTime <= 0) {
    audio.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  } else {
    audio.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  }
});

// Next and Previous buttons
nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSongByIndex(currentSongIndex);
});

previousBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSongByIndex(currentSongIndex);
});

// Progress bar update
audio.addEventListener("timeupdate", () => {
  const progress = parseInt((audio.currentTime / audio.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audio.currentTime = (myProgressBar.value * audio.duration) / 100;
});

// Autoplay next
audio.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSongByIndex(currentSongIndex);
});

// Create new playlist
playlistBtn.addEventListener("click", () => {
  const playlistName = searchInput.value.trim();
  if (!playlistName) return;

  const dynamicPlaylistDiv = document.createElement("div");
  dynamicPlaylistDiv.classList.add("dynamicPlaylistDiv");

  const playlistTitle = document.createElement("div");
  playlistTitle.innerText = playlistName;
  playlistTitle.style.fontWeight = "bold";
  playlistTitle.style.marginBottom = "5px";

  dynamicPlaylistDiv.appendChild(playlistTitle);
  allPlaylist.appendChild(dynamicPlaylistDiv);

  // Select this playlist
  dynamicPlaylistDiv.addEventListener("click", () => {
    selectedPlaylistDiv = dynamicPlaylistDiv;
    currPlaylist.innerHTML = "";
    currPlaylist.appendChild(dynamicPlaylistDiv.cloneNode(true)); // display selected
  });

  searchInput.value = "";
});

// Add current song to selected playlist
addSongsBtn.addEventListener("click", () => {
  if (!selectedPlaylistDiv) {
    alert("Please select a playlist first.");
    return;
  }

  const song = songs[currentSongIndex];
  const songItem = document.createElement("div");
  songItem.className = "songItem";
  songItem.innerHTML = `
    <img src="${song.image}" alt="${song.name}">
    <span>${song.name}</span>
  `;

  songItem.addEventListener("click", () => {
    currentSongIndex = songs.indexOf(song);
    playSongByIndex(currentSongIndex);
  });

  selectedPlaylistDiv.appendChild(songItem); // append inside selected playlist
});
const themeToggleBtn = document.getElementById("themeToggle");

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  const darkMode = document.body.classList.contains("dark-theme");
  themeToggleBtn.textContent = darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
});
