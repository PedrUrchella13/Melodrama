// DOM Elements
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navLinks = document.getElementById("navLinks")
const albumCards = document.querySelectorAll(".album-card")
const artistCards = document.querySelectorAll(".artist-card")
const appLogo = document.getElementById("appLogo")
const playerTitle = document.getElementById("playerTitle")
const playerImage = document.getElementById("playerImage")
const playerModal = document.getElementById("playerModal")
const closePlayer = document.getElementById("closePlayer")
const playBtn = document.getElementById("playBtn")
const progressBar = document.getElementById("progressBar")
const progress = document.getElementById("progress")
const currentTime = document.getElementById("currentTime")
const totalTime = document.getElementById("totalTime")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")

// YouTube links data
const youtubeLinks = {
  albums: {
    wicked: "https://www.youtube.com/watch?v=OFPi0KTQ6Ow",
    substancia: "https://www.youtube.com/watch?v=VbP8NkUCQCQ",
    "ainda-estou-aqui": "https://www.youtube.com/watch?v=XdSLJnnRDN0",
    hsm: "https://www.youtube.com/watch?v=ZnZXxzXMdpI",
    mulan: "https://www.youtube.com/watch?v=KK7BQfWKZlE",
    wicked2: "https://www.youtube.com/watch?v=OFPi0KTQ6Ow",
  },
  artists: {
    billie: "https://www.youtube.com/watch?v=Da4xNGi_Hcw",
    weeknd: "https://www.youtube.com/watch?v=rhTl_OyehF8",
    jennie: "https://www.youtube.com/watch?v=0MF_rU7hAVQ",
  },
}

// Music data
const musicData = {
  albums: {
    wicked: {
      title: "Wicked Soundtrack",
      image: "/wicked.png",
      duration: 210, // in seconds
    },
    substancia: {
      title: "A Substância Soundtrack",
      image: "/substancia.png",
      duration: 185,
    },
    "ainda-estou-aqui": {
      title: "Ainda Estou Aqui Soundtrack",
      image: "/ainda-estou-aqui.png",
      duration: 195,
    },
    hsm: {
      title: "High School Musical Soundtrack",
      image: "/highschool.png",
      duration: 220,
    },
    mulan: {
      title: "Mufasa Soundtrack",
      image: "/mufasa.png",
      duration: 180,
    },
    wicked2: {
      title: "Wicked Soundtrack",
      image: "/wicked.png",
      duration: 210,
    },
  },
  artists: {
    billie: {
      title: "Billie Eilish - Hit Me Hard and Soft",
      image: "/billie.png",
      duration: 240,
    },
    weeknd: {
      title: "The Weeknd - Hurry Up Tomorrow",
      image: "/theweeknd.png",
      duration: 205,
    },
    jennie: {
      title: "Jennie - Ruby",
      image: "/jennie.png",
      duration: 190,
    },
  },
}

// Variables
let isPlaying = false
let timer
let currentDuration = 0
let maxDuration = 0
let currentItem = null

// Mobile Menu Toggle
mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active")

  // Animate hamburger to X
  const spans = mobileMenuBtn.querySelectorAll("span")
  spans.forEach((span) => span.classList.toggle("active"))
})

// Open player with album
function openPlayer(type, id) {
  const data = type === "album" ? musicData.albums[id] : musicData.artists[id]

  if (!data) return

  playerTitle.textContent = data.title
  playerImage.src = data.image

  maxDuration = data.duration
  currentDuration = 0
  updateProgressBar()
  updateTimeDisplay()

  currentItem = { type, id }

  playerModal.classList.add("active")
  isPlaying = false
  togglePlayButton()
}

// Close player
closePlayer.addEventListener("click", () => {
  playerModal.classList.remove("active")
  clearInterval(timer)
  isPlaying = false
})

// Play/Pause toggle
playBtn.addEventListener("click", () => {
  isPlaying = !isPlaying
  togglePlayButton()

  if (isPlaying) {
    startTimer()
  } else {
    clearInterval(timer)
  }
})

// Toggle play button icon
function togglePlayButton() {
  const icon = playBtn.querySelector("i")
  if (isPlaying) {
    icon.classList.remove("fa-play")
    icon.classList.add("fa-pause")
  } else {
    icon.classList.remove("fa-pause")
    icon.classList.add("fa-play")
  }
}

// Start progress timer
function startTimer() {
  clearInterval(timer)
  timer = setInterval(() => {
    if (currentDuration < maxDuration) {
      currentDuration++
      updateProgressBar()
      updateTimeDisplay()
    } else {
      clearInterval(timer)
      isPlaying = false
      togglePlayButton()
      currentDuration = 0
      updateProgressBar()
      updateTimeDisplay()
    }
  }, 1000)
}

// Update progress bar
function updateProgressBar() {
  const percentage = (currentDuration / maxDuration) * 100
  progress.style.width = `${percentage}%`
}

// Update time display
function updateTimeDisplay() {
  currentTime.textContent = formatTime(currentDuration)
  totalTime.textContent = formatTime(maxDuration)
}

// Format time (seconds to MM:SS)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
}

// Click on progress bar
progressBar.addEventListener("click", (e) => {
  const rect = progressBar.getBoundingClientRect()
  const percentage = (e.clientX - rect.left) / rect.width
  currentDuration = Math.floor(percentage * maxDuration)
  updateProgressBar()
  updateTimeDisplay()
})

// Previous track button
prevBtn.addEventListener("click", () => {
  // Implementation would depend on playlist functionality
  console.log("Previous track")
})

// Next track button
nextBtn.addEventListener("click", () => {
  // Implementation would depend on playlist functionality
  console.log("Next track")
})

// Initialize YouTube buttons
function initYoutubeButtons() {
  // Add YouTube buttons to album cards
  albumCards.forEach((card) => {
    const albumId = card.getAttribute("data-album")
    const youtubeLink = youtubeLinks.albums[albumId]

    if (youtubeLink) {
      const youtubeBtn = document.createElement("a")
      youtubeBtn.href = youtubeLink
      youtubeBtn.className = "youtube-btn"
      youtubeBtn.target = "_blank"
      youtubeBtn.innerHTML = '<i class="fab fa-youtube"></i> Ver no YouTube'
      card.appendChild(youtubeBtn)
    }

    // Remove old click event by replacing with a new one that does nothing
    card.addEventListener("click", (e) => {
      // Only prevent default if the click wasn't on the YouTube button
      if (!e.target.closest(".youtube-btn")) {
        e.preventDefault()
      }
    })
  })

  // Add YouTube buttons to artist cards
  artistCards.forEach((card) => {
    const artistId = card.getAttribute("data-artist")
    const youtubeLink = youtubeLinks.artists[artistId]

    if (youtubeLink) {
      const youtubeBtn = document.createElement("a")
      youtubeBtn.href = youtubeLink
      youtubeBtn.className = "youtube-btn"
      youtubeBtn.target = "_blank"
      youtubeBtn.innerHTML = '<i class="fab fa-youtube"></i> Ver no YouTube'
      card.appendChild(youtubeBtn)
    }

    // Remove old click event by replacing with a new one that does nothing
    card.addEventListener("click", (e) => {
      // Only prevent default if the click wasn't on the YouTube button
      if (!e.target.closest(".youtube-btn")) {
        e.preventDefault()
      }
    })
  })
}

// Add click event to album cards
// albumCards.forEach((card) => {
//   card.addEventListener("click", () => {
//     const albumId = card.getAttribute("data-album")
//     openPlayer("album", albumId)
//   })
// })

// // Add click event to artist cards
// artistCards.forEach((card) => {
//   card.addEventListener("click", () => {
//     const artistId = card.getAttribute("data-artist")
//     openPlayer("artist", artistId)
//   })
// })

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initYoutubeButtons()
  addHoverEffects()
})

// Add animation to app logo
appLogo.addEventListener("mouseover", () => {
  appLogo.style.transform = "scale(1.1) rotate(5deg)"
})

appLogo.addEventListener("mouseout", () => {
  appLogo.style.transform = "scale(1) rotate(0)"
})

// Add hover effects to cards
function addHoverEffects() {
  const cards = document.querySelectorAll(".album-card, .artist-card")

  cards.forEach((card) => {
    card.addEventListener("mouseover", () => {
      card.style.transform = "translateY(-10px)"
      card.style.boxShadow = "0 10px 20px rgba(123, 104, 238, 0.3)"
    })

    card.addEventListener("mouseout", () => {
      card.style.transform = ""
      card.style.boxShadow = ""
    })
  })
}

// Call hover effects
// addHoverEffects()
