import React, { useEffect, useState } from "react";
import Letters from "../data/db.json";

export default function Keypad({ usedKeys }) {
  const [letters, setLetters] = useState(null);
  console.log("🚀 ~ file: Keypad.js:7 ~ Keypad ~ letters:", letters);

  useEffect(() => {
    setLetters(Letters.letters);
  }, []);

  return (
    <div className="keypad">
      {letters &&
        letters.map((l) => {
          const color = usedKeys[l.key];
          return (
            <div key={l.key} className={color}>
              {l.key}
            </div>
          );
        })}
    </div>
  );
}
