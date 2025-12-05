
const sounds = {
  dog: "Sounds/dog.mp3",
  clap: "Sounds/clap.mp3",
  pop: "Sounds/pop.mp3",
  laugh: "Sounds/laugh.mp3"
};

const volumeSlider = document.getElementById("volume");
const buttons = document.querySelectorAll(".sound-btn");
const stopAllBtn = document.getElementById("stopAll");

let playingSounds = [];

if (!volumeSlider.value) volumeSlider.value = 1;

function playSound(path) {
  const audio = new Audio(path);
  audio.volume = parseFloat(volumeSlider.value);

  playingSounds.push(audio);

  audio.play().catch(err => {
    console.log("Sound play error:", err);
  });

  audio.addEventListener("ended", () => {
    playingSounds = playingSounds.filter(a => a !== audio);
  });
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const soundName = btn.getAttribute("data-sound");
    const soundPath = sounds[soundName];

    if (!soundPath) {
      console.log("No sound found for:", soundName);
      return;
    }

    playSound(soundPath);
  });
});

stopAllBtn.addEventListener("click", () => {
  playingSounds.forEach(audio => {
    audio.pause();
    audio.currentTime = 0; 
  });

  playingSounds = [];

  console.log("All sounds stopped.");
});