import React, { useEffect, useState } from "react";

export default function Keypad({ usedKeys, handleLetterClick }) {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    const row1 = [
      { key: "q" },
      { key: "w" },
      { key: "e" },
      { key: "r" },
      { key: "t" },
      { key: "y" },
      { key: "u" },
      { key: "i" },
      { key: "o" },
      { key: "p" },
    ];

    const row2 = [
      { key: "a" },
      { key: "s" },
      { key: "d" },
      { key: "f" },
      { key: "g" },
      { key: "h" },
      { key: "j" },
      { key: "k" },
      { key: "l" },
    ];

    const row3 = [
      { key: "Enter" },
      { key: "z" },
      { key: "x" },
      { key: "c" },
      { key: "v" },
      { key: "b" },
      { key: "n" },
      { key: "m" },
      { key: "Backspace" },
    ];

    setLetters([row1, row2, row3]);
  }, []);

  const handleClick = (letterKey) => {
    handleLetterClick(letterKey);
  };

  return (
    < >
      <div className="mt-2 keypad no-scrollbar">
        {letters &&
          letters.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center text-center  w-full  items center gap-2 max-w-[500px] mx-auto m-2  px-3"
            >
              {row.map((letter) => {
                const color = usedKeys[letter.key];
                return (
                  <div
                    key={letter.key}
                    className={`${color}  
                     ${
                       letter.key === "Enter" || letter.key === "Backspace"
                         ? "md:w-[100px] w-[50px] flex items-center justify-center "
                         : "md:w-[40px] w-[25px] flex items-center justify-center "
                     }  cursor-pointer px-4 py-4  `}
                    onClick={() => handleClick(letter.key)}
                  >
                    <div className="flex items-center justify-center">
                      {letter.key === "Backspace" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="23"
                          viewBox="0 0 24 24"
                          width="40"
                          className="game-icon"
                          data-testid="icon-backspace"
                        >
                          <path
                            fill="var(--color-tone-1)"
                            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
                          ></path>
                        </svg>
                      ) : (
                        <span>{letter.key}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
      </div>
    </>
  );
}
