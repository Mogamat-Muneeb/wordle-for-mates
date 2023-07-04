// import React, { useState } from "react";
// import { Link } from "react-router-dom";
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
//     const link = `http://localhost:3001/wordle?word=${encryptedWord}&name=${name}`;
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
    const link = `http://localhost:3001/wordle?word=${encryptedWord}&name=${name}`;
    console.log(link, "generated link");

    // Copy the link to the clipboard
    navigator.clipboard
      .writeText(link)
      .then(() => {
        // Change the button text to "Link Copied"
        const createLinkButton = document.getElementById("createLinkButton");
        createLinkButton.textContent = "Link Copied";
      })
      .catch((error) => {
        console.error("Failed to copy the link to the clipboard:", error);
      });
  };

  return (
    <div>
      <h1 className="font-bold  text-rose-500">
        Create a Wordle game using your word!
      </h1>
      <form className="flex flex-col justify-center items-center pb-24 w-10/12 text-center max-w-md space-y-8 mx-auto mt-16">
        <input
          type="text"
          placeholder="5 letter word"
          value={word}
          onChange={handleWordChange}
          className="text-center bg-black text-white font-bold p-4 w-full text-3xl outline-none rounded placeholder:text-white"
        />
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={handleNameChange}
          className="text-center bg-black text-white font-bold p-4 w-full text-3xl outline-none rounded placeholder:text-white "
        />
        <span id="createLinkButton" onClick={generateLink}>
          Create Link
        </span>
      </form>
    </div>
  );
};

export default CreateGame;
