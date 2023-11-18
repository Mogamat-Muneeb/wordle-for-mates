import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function Wordle({ solution, createName }) {
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
  } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if (isCorrect || turn > 5) {
      setTimeout(() => setShowModal(true), 1500);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  const handleLetterClick = (letter) => {
    handleKeyup({ key: letter });
  };

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

  useEffect(() => {
    const savedState = localStorage.getItem(
      `wordleGameState-${location.search}`
    );
    if (savedState) {
      const parsedState = JSON.parse(savedState);

      setGameState(parsedState);

      setTimeout(() => {
        localStorage.removeItem(`wordleGameState-${location.search}`);
      }, 1000);
    }
  }, []);

  const handleBeforeUnload = (event) => {
    const gameState = {
      // solution,
      currentGuess,
      guesses,
      turn,
      isCorrect,
      usedKeys,
    };
    localStorage.setItem(
      `wordleGameState-${location.search}`,
      JSON.stringify(gameState)
    );
  };
  useEffect(() => {
    handleBeforeUnload();

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [solution, currentGuess, guesses, turn, isCorrect, usedKeys]);

  const updateGameDocument = async () => {
    try {
      if (isCorrect || turn > 5) {
        const gamesRef = collection(db, "user-created-games");
        const querySnapshot = await getDocs(
          query(gamesRef, where("link", "==", window.location.href))
        );

        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;

          const existingResults = (
            querySnapshot.docs[0].data().results || []
          ).slice();

          existingResults.push({
            result: isCorrect ? "win" : "lose",
            isHowManyTurns: turn,
          });

          await updateDoc(docRef, {
            results: existingResults,
          });
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    updateGameDocument();
  }, [isCorrect, turn]);

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
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          createName={createName}
        />
      )}
    </div>
  );
}
