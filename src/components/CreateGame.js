// import React, { useState } from "react";
// import sjcl from "sjcl";
// import { toast } from "react-toastify";


// const CreateGame = () => {
//   const [word, setWord] = useState("");
//   const [name, setName] = useState("");
//   const [linkCopied, setLinkCopied] = useState(false);

//   const handleWordChange = (event) => {
//     setWord(event.target.value);
//   };

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const generateLink = () => {
//     if (word.trim() === "" || name.trim() === "") {
//       toast.error("Please enter both a word and a name.");
//       return;
//     }

//     const secretKey = `${process.env.REACT_APP_SECRET_KEY}`
//     const encryptedWord = sjcl.encrypt(secretKey, word);
//     const link = `https://wordle-for-mates.vercel.app/wordle?word=${encodeURIComponent(
//       encryptedWord
//     )}&name=${encodeURIComponent(name)}`;
//     // console.log(link, "generated link");
//     toast.success("Link is copied!");

//     navigator.clipboard
//       .writeText(link)
//       .then(() => {
//         setLinkCopied(true);
//       })
//       .catch((error) => {
//         console.error("Failed to copy the link to the clipboard:", error);
//       });
//   };

//   return (
//     <div>
//       <h1 className="font-extrabold text-[30px]">Wordle for mates!</h1>
//       <p className="font-extrabold text-[20px] text-[#212529]">
//         Create a
//         <a
//           href="https://www.nytimes.com/games/wordle/index.html"
//           className="px-2 underline"
//         >
//           Wordle
//         </a>
//         game using your word!
//       </p>
//       <p className="font-extrabold text-[16px] text-[#212529]">Enter a 5 letter word to get started.</p>
//       <form className="w-10/12 max-w-md pb-24 mx-auto mt-16 space-y-8 text-center">
//         <input
//           type="text"
//           placeholder="5 letter word"
//           value={word}
//           onChange={handleWordChange}
//           className="w-full p-4 text-xl font-bold text-center text-black rounded outline-none bg-[#eee] placeholder:text-white"
//         />
//         <input
//           type="text"
//           placeholder="name"
//           value={name}
//           onChange={handleNameChange}
//           className="w-full p-4 text-xl font-bold text-center text-black rounded outline-none bg-[#eee] placeholder:text-white"
//         />
//         <p
//           onClick={generateLink}
//           className={
//             linkCopied
//               ? "w-full p-4 text-lg font-bold text-center text-white rounded outline-none bg-[#5ac85a]"
//               : "w-full p-4 text-lg font-bold text-center text-white rounded outline-none bg-[#212529]"
//           }
//         >
//           {linkCopied ? "Link Copied" : "Create Link"}
//         </p>
//       </form>

//     </div>
//   );
// };

// export default CreateGame;
import React, { useState } from "react";
import sjcl from "sjcl";
import { toast } from "react-toastify";

const CreateGame = () => {
  const [word, setWord] = useState("");
  const [name, setName] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);

  const handleWordChange = (event) => {
    const newWord = event.target.value;
    if (newWord.length > 5) {
      toast.error("Word should not exceed 5 letters.");
      return;
    }
    setWord(newWord);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const generateLink = () => {
    if (word.trim() === "" || name.trim() === "") {
      toast.error("Please enter both a word and a name.");
      return;
    }

    const secretKey = `${process.env.REACT_APP_SECRET_KEY}`
    const encryptedWord = sjcl.encrypt(secretKey, word);
    // const link = `https://wordle-for-mates.vercel.app/wordle?word=${encodeURIComponent(
    const link = `http://localhost:3000/wordle?word=${encodeURIComponent(
      encryptedWord
    )}&name=${encodeURIComponent(name)}`;

    toast.success("Link is copied!");

    navigator.clipboard
      .writeText(link)
      .then(() => {
        setLinkCopied(true);
      })
      .catch((error) => {
        console.error("Failed to copy the link to the clipboard:", error);
      });
  };

  return (
    <div>
      <h1 className="font-extrabold text-[30px] p-4 text-[#212529] border-b-[1px] border-[#eee] w-full">Wordle for mates!</h1>
      <p className="font-extrabold text-[20px] text-[#212529] py-4">
        Create a
        <a
          href="https://www.nytimes.com/games/wordle/index.html"
          className="px-2 underline"
        >
          Wordle
        </a>
        game using your word!
      </p>
      <p className="font-extrabold text-[16px] text-[#212529]">
        Enter a 5 letter word to get started.
      </p>
      <form className="w-10/12 max-w-md pb-24 mx-auto mt-16 space-y-8 text-center">
        <input
          type="text"
          placeholder="5 letter word"
          value={word}
          onChange={handleWordChange}
          className="w-full p-4 text-xl font-bold text-center text-black rounded outline-none bg-[#eee] placeholder:text-white"
        />
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={handleNameChange}
          className="w-full p-4 text-xl font-bold text-center text-black rounded outline-none bg-[#eee] placeholder:text-white"
        />
        <p
          onClick={generateLink}
          className={
            linkCopied
              ? "w-full p-4 text-lg font-bold text-center text-white rounded outline-none bg-[#5ac85a]"
              : "w-full p-4 text-lg font-bold text-center text-white rounded outline-none bg-[#212529]"
          }
        >
          {linkCopied ? "Link Copied" : "Create Link"}
        </p>
          <p className="mt-10">{linkCopied && "A shareable link has been created and copied. Send it to your friends!"}</p>
      </form>
    </div>
  );
};

export default CreateGame;

