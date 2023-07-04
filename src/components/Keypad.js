// import React, { useEffect, useState } from "react";
// import Letters from "../data/db.json";

// export default function Keypad({ usedKeys, handleLetterClick }) {
//   const [letters, setLetters] = useState(null);

//   useEffect(() => {
//     setLetters(Letters.letters);
//   }, []);

//   const handleClick = (letterKey) => {
//     handleLetterClick(letterKey);
//   };

//   return (
//     <div>
//       <div className="keypad md:w-[550px] flex-wrap w-[440px] flex  justify-center items-center">
//         {letters &&
//           letters.map((l) => {
//             const color = usedKeys[l.key];
//             return (
//               <div
//                 key={l.key}
//                 className={`${color}  ${l.key === "Enter" ||  l.key === "Backspace"  ? "w-[100px]" : "w-[40px] " }   `}
//                 onClick={() => handleClick(l.key)}
//               >
//                <span className={` `}> {l.key}</span>
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";

// export default function Keypad({ usedKeys, handleLetterClick }) {
//   const [letters, setLetters] = useState(null);

//   useEffect(() => {
//     const row1 = [
//       { key: "a" },
//       { key: "b" },
//       { key: "c" },
//       { key: "d" },
//       { key: "e" },
//       { key: "f" },
//       { key: "g" },
//       { key: "h" },
//       { key: "i" },
//     ];

//     const row2 = [
//       { key: "j" },
//       { key: "k" },
//       { key: "l" },
//       { key: "m" },
//       { key: "n" },
//       { key: "o" },
//       { key: "p" },
//       { key: "q" },
//       { key: "r" },
//     ];

//     const row3 = [
//       { key: "s" },
//       { key: "t" },
//       { key: "Backspace" },
//       { key: "u" },
//       { key: "v" },
//       { key: "w" },
//       { key: "x" },
//       { key: "y" },
//       { key: "z" },
//       { key: "Enter" },
//     ];

//     setLetters([row1, row2, row3]);
//   }, []);

//   const handleClick = (letterKey) => {
//     handleLetterClick(letterKey);
//   };

//   return (
//     <div>
//       <div className="keypad md:w-[550px] w-[440px] flex  justify-center items-center">
//         {letters &&
//           letters.map((row, rowIndex) =>
//             row.map((letter) => {
//               const color = usedKeys[letter.key];
//               return (
//                 <div
//                   key={letter.key}
//                   className={`${color} ${
//                     letter.key === "Enter" || letter.key === "Backspace"
//                       ? "w-[100px]"
//                       : "w-[40px] "
//                   }`}
//                   onClick={() => handleClick(letter.key)}
//                 >
//                   <span className="">{letter.key}</span>
//                 </div>
//               );
//             })
//           )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";

export default function Keypad({ usedKeys, handleLetterClick }) {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    const row1 = [
      { key: "a" },
      { key: "b" },
      { key: "c" },
      { key: "d" },
      { key: "e" },
      { key: "f" },
      { key: "g" },
      { key: "h" },
      { key: "i" },
    ];

    const row2 = [
      { key: "j" },
      { key: "k" },
      { key: "l" },
      { key: "m" },
      { key: "n" },
      { key: "o" },
      { key: "p" },
      { key: "q" },
      { key: "r" },
    ];

    const row3 = [
      { key: "s" },
      { key: "t" },
      { key: "Backspace" },
      { key: "u" },
      { key: "v" },
      { key: "w" },
      { key: "x" },
      { key: "y" },
      { key: "z" },
      { key: "Enter" },
    ];

    setLetters([row1, row2, row3]);
  }, []);

  const handleClick = (letterKey) => {
    handleLetterClick(letterKey);
  };

  return (
    <div>
      <div className="keypad md:w-[550px] w-[440px] flex bg-red-500  justify-center items-center">
        {letters &&
          letters.map((row, rowIndex) => (
            <div key={rowIndex} className="flex  bg-slate-700">
              {row.map((letter) => {
                const color = usedKeys[letter.key];
                return (
                  <div
                    key={letter.key}
                    className={`${color} ${
                      letter.key === "Enter" || letter.key === "Backspace"
                        ? "w-[100px]"
                        : "w-[40px]"
                    }`}
                    onClick={() => handleClick(letter.key)}
                  >
                    <span className="">{letter.key}</span>
                  </div>
                );
              })}
            </div>
          ))}
      </div>
    </div>
  );
}
