import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";
import useWordleS from "../hooks/useWordleS";
import englishWords from "../data/db.json";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { encrypt } from "../helper";
import HowToPlay from "./HowToPlay";

const WordleSingle = () => {
  const [solution, setSolution] = useState(null);
  console.log(
    "🚀 ~ file: WordleSingle.jsx:15 ~ WordleSingle ~ solution:",
    solution
  );
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
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
    decryptedSolution,
  } = useWordleS(solution);

  const [showModal, setShowModal] = useState(false);

  const generateRandomSolution = () => {
    const words = englishWords.words;
    let randomSolution = null;

    if (!solution) {
      do {
        randomSolution = words[Math.floor(Math.random() * words.length)];
      } while (randomSolution.length !== 5);
      const originalText = randomSolution;
      const shiftAmount = 3;
      const encryptedText = encrypt(originalText, shiftAmount);
      setSolution(encryptedText);
    }
  };

  useEffect(() => {
    generateRandomSolution();
  }, [solution]);

  // Function to handle before unload event
  const handleBeforeUnload = (event) => {
    const gameState = {
      currentGuess,
      guesses,
      turn,
      isCorrect,
      usedKeys,
      solution,
    };
    localStorage.setItem("wordleGameState", JSON.stringify(gameState));

    if (event.currentTarget.performance.navigation.type !== 1) {
      setTimeout(() => {
        localStorage.removeItem("wordleGameState");
      }, 50);
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
      setTimeout(() => {
        localStorage.removeItem("wordleGameState");
      }, 50);
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
      const inHowManyTurns = turn;

      const userGamesCollection = collection(db, "userGames");

      addDoc(userGamesCollection, {
        inHowManyTurns,
        result,
        timestamp: serverTimestamp(),
        userId,
      });
    }
  }, [isCorrect, turn, user, showModal, guesses]);

  return (
    <>
      {show && <HowToPlay handleShow={handleShow} createName={""} />}
      <button
        onClick={handleShow}
        className="font-bold md:text-[20px] text-[16px]"
      >
        How to play
      </button>

      <p className="py-1 font-medium ">
        You have 6 tries to guess the 5-letter word!
      </p>

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
        <Modal isCorrect={isCorrect} turn={turn} solution={decryptedSolution} />
      )}
    </>
  );
};

export default WordleSingle;
