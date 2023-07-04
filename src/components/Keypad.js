import React, { useEffect, useState } from "react";
import Letters from "../data/db.json";

export default function Keypad({ usedKeys, handleLetterClick }) {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    setLetters(Letters.letters);
  }, []);

  const handleClick = (letterKey) => {
    handleLetterClick(letterKey);
  };

  const handleEnterButton = () => {
    handleLetterClick("Enter");
  };
  const handleBackspaceButton = () => {
    handleLetterClick("Backspace");
  };
  return (
    <div className="keypad">
      {letters &&
        letters.map((l) => {
          const color = usedKeys[l.key];
          return (
            <div
              key={l.key}
              className={color}
              onClick={() => handleClick(l.key)}
            >
              {l.key}
            </div>
          );
        })}
      <div className="backspace-button" onClick={handleBackspaceButton}>
        Backspace
      </div>
      <div className="enter-button" onClick={handleEnterButton}>
        Enter
      </div>
    </div>
  );
}
