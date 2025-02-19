document.addEventListener("DOMContentLoaded", function () {
    const clockElem = document.getElementById("flipclock");
    const quoteElem = document.getElementById("quote");
    const fullscreenBtn = document.getElementById("fullscreen-btn");
  
    // Initialize FlipClock.js
    const clock = new FlipClock(clockElem, {
      clockFace: "TwentyFourHourClock",
      showSeconds: true,
      autoStart: true,
    });
  
    // Fetch and update the motivational quote
    async function updateQuote() {
      try {
        const response = await fetch("quotes.json");
        if (!response.ok) {
          throw new Error("Failed to load quotes.json");
        }
  
        const quotes = await response.json();
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const selectedQuote = quotes[randomIndex];
        quoteElem.textContent = `"${selectedQuote.quote}" - ${selectedQuote.author}`;
      } catch (error) {
        console.error("Failed to load quote:", error);
        quoteElem.textContent = "Stay focused, stay positive!";
      }
    }
  
    setInterval(updateQuote, 60000); // Update every minute
    updateQuote(); // Initial quote load
  
    // Fullscreen functionality
    fullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
  
    // GSAP animations for smooth transitions
    gsap.from("#flipclock", {
      opacity: 0,
      y: -50,
      scale: 0.8,
      duration: 1.5,
      ease: "power4.out",
    });
  
    gsap.from("#quote", {
      opacity: 0,
      x: -30,
      duration: 1.5,
      delay: 1,
      ease: "power4.out",
    });
  
    gsap.from("#zenclock-text", {
      opacity: 0,
      x: -50,
      duration: 1.5,
      delay: 2,
      ease: "power4.out",
    });
  
    gsap.from("#fullscreen-btn", {
      opacity: 0,
      scale: 0.5,
      duration: 1.5,
      delay: 2.5,
      ease: "power4.out",
    });
  
    gsap.from(".dark-side", {
      opacity: 0,
      x: 50,
      duration: 1.5,
      delay: 2,
      ease: "power4.out",
    });
  });
  
  // Define the audio files using Howler.js
  const songs = [
    new Howl({ src: ["sounds/lofi1.mp3"], preload: true }),
    new Howl({ src: ["sounds/lofi2.mp3"], preload: true }),
    new Howl({ src: ["sounds/lofi3.mp3"], preload: true }),
    new Howl({ src: ["sounds/lofi4.mp3"], preload: true }),
  ];
  
  const interstellarSound = new Howl({ src: ["sounds/interstellar.mp3"], preload: true });
  
  let isFirstTime = true;
  let currentSong = null;
  
  // Preload all songs to ensure they're ready for playback
  songs.forEach((song) => song.load());
  interstellarSound.load();
  
  // Function to toggle the switch
  function toggleSwitchDark(toggleElement) {
    const switchElement = toggleElement.querySelector(".switch");
  
    if (switchElement.classList.contains("off-dark")) {
      switchElement.classList.remove("off-dark");
      switchElement.classList.add("on-dark");
  
      if (isFirstTime) {
        // Play Interstellar.mp3 for the first time
        interstellarSound.stop(); // Ensure it starts from the beginning
        interstellarSound.play(); // Play immediately
        isFirstTime = false;
        currentSong = interstellarSound; // Track the current song
      } else {
        // Play a random song from the list
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        if (currentSong) {
          currentSong.fade(1, 0, 1000); // Fade out the previous song
        }
        randomSong.fade(0, 1, 1000); // Fade in the new song
        randomSong.play();
        currentSong = randomSong; // Track the current song
      }
  
      return;
    }
  
    // If the switch is being turned off
    switchElement.classList.remove("on-dark");
    switchElement.classList.add("off-dark");
  
    // Fade out all sounds when the switch is turned off
    if (currentSong) {
      currentSong.fade(1, 0, 1000); // Fade out the current song
    }
  }
  