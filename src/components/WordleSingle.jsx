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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const words = englishWords.words;
    let randomSolution = null;

    if (!solution) {
      do {
        randomSolution = words[Math.floor(Math.random() * words.length)];
      } while (randomSolution.length !== 5);
      setSolution(randomSolution);
    }
  }, [solution]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Save the solution and other data to local storage before leaving the page or refreshing
      const gameState = {
        solution,
        currentGuess,
        guesses,
        turn,
        isCorrect,
        usedKeys,
      };
      localStorage.setItem("wordleGameState", JSON.stringify(gameState));
      // Reset the solution when the user leaves the page
      if (event.currentTarget.performance.navigation.type !== 1) {
        localStorage.removeItem("wordleGameState");
        setSolution(null);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [solution, currentGuess, guesses, turn, isCorrect, usedKeys]);
  console.log(
    "🚀 ~ file: WordleSingle.jsx:64 ~ WordleSingle ~ solution:",
    solution
  );

  useEffect(() => {
    // Restore the solution and other data from local storage after refresh
    const savedState = localStorage.getItem("wordleGameState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setSolution(parsedState.solution);
      setGameState(parsedState);
      localStorage.removeItem("wordleGameState");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
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

    if (isGameOver) {
      const result = isCorrect ? "win" : "lose";
      const userId = user.uid;

      const userGamesCollection = collection(db, "userGames");

      addDoc(userGamesCollection, {
        result,
        timestamp: serverTimestamp(),
        userId,
      });
    }
  }, [isCorrect, turn, user]);

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
