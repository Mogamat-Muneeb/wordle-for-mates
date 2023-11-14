import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";
import useWordleS from "../hooks/useWordleS";
import englishWords from "../data/db.json";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const WordleSingle = () => {
  const [solution, setSolution] = useState(null);
  const [user] = useAuthState(auth);
  const {
    currentGuess,
    guesses,
    turn,
    isCorrect,
    usedKeys,
    handleKeyup,
    errorMessage,
    setErrorMessage,
    setGameState,
  } = useWordleS(solution);
  console.log("🚀 ~ file: WordleSingle.jsx:174 ~ WordleSingle ~ solution:", solution)
  const [showModal, setShowModal] = useState(false);

  // Function to generate a random solution
  const generateRandomSolution = () => {
    const words = englishWords.words;
    let randomSolution = null;

    if (!solution) {
      do {
        randomSolution = words[Math.floor(Math.random() * words.length)];
      } while (randomSolution.length !== 5);
      setSolution(randomSolution);
    }
  };

  useEffect(() => {
    generateRandomSolution();
  }, [solution]);

  // Function to handle before unload event
  const handleBeforeUnload = (event) => {
    const gameState = {
      solution,
      currentGuess,
      guesses,
      turn,
      isCorrect,
      usedKeys,
    };
    localStorage.setItem("wordleGameState", JSON.stringify(gameState));

    if (event.currentTarget.performance.navigation.type !== 1) {
      localStorage.removeItem("wordleGameState");
      setSolution(null);
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [solution, currentGuess, guesses, turn, isCorrect, usedKeys]);

  useEffect(() => {
    const savedState = localStorage.getItem("wordleGameState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setSolution(parsedState.solution);
      setGameState(parsedState);
      localStorage.removeItem("wordleGameState");
    }
  }, []);

  useEffect(() => {
    const handleKeyupEvent = (event) => handleKeyup(event);

    window.addEventListener("keyup", handleKeyupEvent);

    if (isCorrect || turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyupEvent);
    }

    return () => window.removeEventListener("keyup", handleKeyupEvent);
  }, [handleKeyup, isCorrect, turn]);

  useEffect(() => {
    let timeoutId;

    if (errorMessage) {
      timeoutId = setTimeout(() => {
        setErrorMessage(null);
      }, 1500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [errorMessage]);

  const handleLetterClick = (letter) => {
    handleKeyup({ key: letter });
  };

  useEffect(() => {
    const isGameOver = isCorrect || turn > 5;

    if (isGameOver && showModal && user) {
      const result = isCorrect ? "win" : "lose";
      const userId = user.uid;

      const userGamesCollection = collection(db, "userGames");

      addDoc(userGamesCollection, {
        result,
        timestamp: serverTimestamp(),
        userId,
      });
    }
  }, [isCorrect, turn, user , showModal]);

  return (
    <div>
      {errorMessage && (
        <div className="w-10/12 max-w-md py-4 mx-auto text-center">
          <span className="bg-[#FFDDDD] text-[#C30000]  flex justify-center items-center w-full p-2 rounded text-[14px]">
            {errorMessage}
          </span>
        </div>
      )}
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} handleLetterClick={handleLetterClick} />
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </div>
  );
};

export default WordleSingle;
