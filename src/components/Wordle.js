// import React, { useEffect, useState } from "react";
// import useWordle from "../hooks/useWordle";
// import Grid from "./Grid";
// import Keypad from "./Keypad";
// import Modal from "./Modal";

// export default function Wordle({ solution, createName }) {
//   const {
//     currentGuess,
//     guesses,
//     turn,
//     isCorrect,
//     usedKeys,
//     handleKeyup,
//     errorMessage,
//     setErrorMessage,
//   } = useWordle(solution);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     window.addEventListener("keyup", handleKeyup);

//     if (isCorrect || turn > 5) {
//       setTimeout(() => setShowModal(true), 1500);
//       window.removeEventListener("keyup", handleKeyup);
//     }

//     return () => window.removeEventListener("keyup", handleKeyup);
//   }, [handleKeyup, isCorrect, turn]);

//   const handleLetterClick = (letter) => {
//     handleKeyup({ key: letter });
//   };

//   useEffect(() => {
//     let timeoutId;

//     if (errorMessage) {
//       timeoutId = setTimeout(() => {
//         setErrorMessage(null);
//       }, 1500);
//     }

//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, [errorMessage]);
//   return (
//     <div>
//       {errorMessage && (
//         <div className="w-10/12 max-w-md py-4 mx-auto text-center">
//           <span className="bg-[#FFDDDD] text-[#C30000]  flex justify-center items-center w-full p-2 rounded text-[14px]">
//             {errorMessage}
//           </span>
//         </div>
//       )}
//       <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
//       <Keypad usedKeys={usedKeys} handleLetterClick={handleLetterClick} />
//       {showModal && (
//         <Modal
//           isCorrect={isCorrect}
//           turn={turn}
//           solution={solution}
//           createName={createName}
//         />
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

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
    const handleBeforeUnload = (event) => {
      // Save the game state to local storage before leaving the page or refreshing
      const gameState = {
        solution,
        currentGuess,
        guesses,
        turn,
        isCorrect,
        usedKeys,
      };
      localStorage.setItem("wordleGameState", JSON.stringify(gameState));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [solution, currentGuess, guesses, turn, isCorrect, usedKeys]);

  useEffect(() => {
    // Restore the game state from local storage after refresh
    const savedState = localStorage.getItem("wordleGameState");
    if (savedState) {
      const parsedState = JSON.parse(savedState);

      setGameState(parsedState);
      localStorage.removeItem("wordleGameState");
    }
  }, []);

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
