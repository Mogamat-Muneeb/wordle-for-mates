import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";
import useWordleS from "../hooks/useWordleS";
const WordleSingle = ({ solution }) => {
  const {
    currentGuess,
    guesses,
    turn,
    isCorrect,
    usedKeys,
    handleKeyup,
    errorMessage,
    setErrorMessage,
  } = useWordleS(solution);
  const [showModal, setShowModal] = useState(false);

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
