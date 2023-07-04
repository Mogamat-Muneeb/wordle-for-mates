
// import React, { useState } from "react";
// import { AES } from "crypto-js";

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
//     const secretKey = "muneeb2905";
//     const encryptedWord = AES.encrypt(word, secretKey).toString();
//     const link = `http://localhost:3000/wordle?word=${encryptedWord}&name=${name}`;
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
//         <p  id="createLinkButton" onClick={generateLink}>
//           Create Link
//         </p>
//       </form>
//     </div>
//   );
// };

// export default CreateGame;


import React, { useState } from "react";
import sjcl from "sjcl";

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
    const encryptedWord = sjcl.encrypt(secretKey, word);
    const link = `http://localhost:3000/wordle?word=${encodeURIComponent(encryptedWord)}&name=${encodeURIComponent(name)}`;
    console.log(link, "generated link");
  };

  return (
    <div>
      <h1>Create a Wordle game using your word!</h1>
      <form className="w-10/12 max-w-md pb-24 mx-auto mt-16 space-y-8 text-center">
        <input
          type="text"
          placeholder="5 letter word"
          value={word}
          onChange={handleWordChange}
          className="w-full p-4 text-3xl font-bold text-center text-black rounded outline-none bg-slate-300 placeholder:text-white"
        />
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={handleNameChange}
          className="w-full p-4 text-3xl font-bold text-center text-black rounded outline-none bg-slate-300 placeholder:text-white"
        />
        <p id="createLinkButton" onClick={generateLink}>
          Create Link
        </p>
      </form>
    </div>
  );
};

export default CreateGame;

