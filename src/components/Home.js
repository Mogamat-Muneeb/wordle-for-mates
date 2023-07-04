// import React from 'react'
// import { useEffect, useState } from "react";

// import Solutions from "../data/db.json";
// import Wordle from './Wordle';
// const Home = () => {
//     const [solution, setSolution] = useState(null);
//   useEffect(() => {
//     const randomSolution =
//       Solutions.solutions[
//         Math.floor(Math.random() * Solutions.solutions.length)
//       ];
//     setSolution(randomSolution.word);
//   }, []);

//   return (
//     <div className="App">
//       <h1>Wordle (Lingo)</h1>
//       {solution && <Wordle solution={solution} />}
//     </div>
//   );
// }

// export default Home
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import Wordle from "./Wordle";

// const Home = () => {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const word = params.get("word");
//   const [solution, setSolution] = useState(word);

//   useEffect(() => {
//     setSolution(word);
//   }, [word]);

//   return (
//     <div className="App">
//       <h1>Wordle (Lingo)</h1>
//       {solution && <Wordle solution={solution} guess={word} />}
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AES, enc } from "crypto-js";
import Wordle from "./Wordle";

const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const encryptedWord = params.get("wordles");
  const [solution, setSolution] = useState("");

  useEffect(() => {
    const secretKey = "muneeb2905"; // Replace with the same secret key used for encryption
    const decryptedWord = AES.decrypt(encryptedWord, secretKey).toString(enc.Utf8);
    setSolution(decryptedWord);
  }, [encryptedWord]);

  return (
    <div className="App">
      <h1>Wordle (Lingo)</h1>
      {solution && <Wordle solution={solution} guess={encryptedWord} />}
    </div>
  );
};

export default Home;


