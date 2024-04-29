import { useState, useEffect } from "react";
import { Howl, Howler } from "howler";
//import sound files here
import popupSound1 from "./images/AVARD-AUDIO.mp3"; // Adjust the path for the first sound
import popupSound2 from "./images/brendan-audio.mp3"; // Adjust the path for the second sound
import popupSound3 from "./images/PETER-AUDIO.mp3"; // Adjust the path for the third sound
import popupSound4 from "./images/yeti-audio.mp3"; // Adjust the path for the fourth sound
import popupSound5 from "./images/dorthy-audio.mp3"; // Adjust the path for the fifth sound

// Add the sound files to the object and assign a number to each sound
const soundFiles = { 1: popupSound1, 2: popupSound2, 3: popupSound3, 4: popupSound4, 5: popupSound5};

const usePopupSound = () => {
  const [volume, setVolume] = useState(0.3); // Initial volume level
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);

  // Set the volume level
  const setCurrentVolume = (vol) => {
    setVolume(vol);
    Howler.volume(vol);
  };

  const playPopupSound = (soundId) => {
    const soundPath = soundFiles[soundId];
    const newSound = new Howl({ src: [soundPath], volume: volume });

    if (currentSound) {
      currentSound.stop();
    }

    setCurrentSound(newSound);
    newSound.play();
    setIsPlaying(true);
  };
  //stops the previous sound from playing
  useEffect(() => {
    return () => {
      if (currentSound) {
        currentSound.stop();
      }
    };
  }, [currentSound]);

  return { playPopupSound, isPlaying };
};

export default usePopupSound;