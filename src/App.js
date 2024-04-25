import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';

import './App.css';

const words = [
  "guitar",
  "oxygen",
  "mountain",
  "painting",
  "astronomy",
  "football",
  "chocolate",
  "butterfly",
  "history",
  "pizza",
  "jazz",
  "camera",
  "diamond",
  "adventure",
  "science",
  "bicycle",
  "sunset",
  "coffee",
  "dance",
  "galaxy",
  "orchestra",
  "volcano",
  "novel",
  "sculpture",
  "symphony",
  "architecture",
  "ballet",
  "astronaut",
  "waterfall",
  "technology",
  "rainbow",
  "universe",
  "piano",
  "vacation",
  "rainforest",
  "theater",
  "telephone",
  "language",
  "desert",
  "sunflower",
  "fantasy",
  "telescope",
  "breeze",
  "oasis",
  "photography",
  "safari",
  "planet",
  "river",
  "tropical",
  "mysterious",
  "enigma",
  "paradox",
  "puzzle",
  "whisper",
  "shadow",
  "secret",
  "curiosity",
  "unpredictable",
  "obfuscate",
  "unveil",
  "illusion",
  "moonlight",
  "vibrant",
  "nostalgia",
  "brilliant",
  "application",
  "programming",
  "interface",
  "wizard",
  "brilliant"
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
