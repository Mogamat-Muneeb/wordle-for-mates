// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const CreateGame = () => {
//   const [word, setWord] = useState("");
//   const [name, setName] = useState("");

//   const handleWordChange = (event) => {
//     setWord(event.target.value);
//   };

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const generateLink = () => {
//     const link = `http://localhost:3001/wordle?word=${word}&name=${name}`;
//     console.log(link, "generated link");
//   };


//   return (
//     <div>
//       <h1>Create a Wordle game using your word!</h1>
//       <form>
//         <input
//           type="text"
//           placeholder="5 letter word"
//           value={word}
//           onChange={handleWordChange}
//         />
//         <input
//           type="text"
//           placeholder="name"
//           value={name}
//           onChange={handleNameChange}
//         />
//         <span onClick={generateLink}>Create Link</span>
//       </form>
//     </div>
//   );
// };

// export default CreateGame;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AES } from "crypto-js";

const CreateGame = () => {
  const [word, setWord] = useState("");
  const [name, setName] = useState("");

  const handleWordChange = (event) => {
    setWord(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const generateLink = () => {
    const secretKey = "muneeb2905";
    const encryptedWord = AES.encrypt(word, secretKey).toString();
    const link = `http://localhost:3001/wordle?wordles=${encryptedWord}&name=${name}`;
    console.log(link, "generated link");
  };

  return (
    <div>
      <h1>Create a Wordle game using your word!</h1>
      <form>
        <input
          type="text"
          placeholder="5 letter word"
          value={word}
          onChange={handleWordChange}
        />
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={handleNameChange}
        />
        <span onClick={generateLink}>Create Link</span>
      </form>
    </div>
  );
};

export default CreateGame;
