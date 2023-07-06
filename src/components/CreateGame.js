import React, { useState, useEffect } from "react";
import sjcl from "sjcl";
import { toast } from "react-toastify";
import englishWords from "../data/db.json";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import { FaFacebook, FaWhatsapp, FaTwitter } from "react-icons/fa";
import ReactGA from "react-ga";
const CreateGame = () => {
  const [word, setWord] = useState("");
  const [name, setName] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [link, setLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  const handleWordChange = (event) => {
    const newWord = event.target.value;
    setWord(newWord);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const generateLink = () => {
    if (word.trim() === "") {
      setErrorMessage("Please enter a word!");
      return;
    }

    if (name.trim() === "") {
      setErrorMessage("Please enter  a name!");
      return;
    }
    if (word.length < 5 || word.length > 5 ) {
      setErrorMessage("Please enter a 5 letter word!");
      return;
    }

    if (!englishWords.words.includes(word.toLowerCase())) {
      setErrorMessage("Invalid word. Please enter a valid English word.");
      return;
    }

    const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;
    const encryptedWord = sjcl.encrypt(secretKey, word);
    const link = `https://wordle-for-mates.vercel.app/wordle?word=${encodeURIComponent(
    // const link = `http://localhost:3000/wordle?word=${encodeURIComponent(
      encryptedWord
    )}&name=${encodeURIComponent(name)}`;
    setLink(link);

    ReactGA.event({
      category: link,
      action: "user generate link ",
      label: "user label",
    });

    // toast.success("Link is copied!");

    navigator.clipboard
      .writeText(link)
      .then(() => {
        setLinkCopied(true);
      })
      .catch((error) => {
        console.error("Failed to copy the link to the clipboard:", error);
      });
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
  return (
    <div>
      <p className="font-extrabold text-[20px] text-[#212529] py-4">
        Create a
        <a
          href="https://www.nytimes.com/games/wordle/index.html"
          className="px-2 underline text-[#5ac85a]"
        >
          Wordle
        </a>
        game using your word!
      </p>
      <p className="font-extrabold text-[16px] text-[#212529]">
        Enter a 5 letter word to get started.
      </p>

      {errorMessage && (
        <div className="w-10/12 max-w-md pt-10 mx-auto text-center">
          <span className="bg-[#FFDDDD] text-[#C30000]  flex justify-center items-center w-full p-2 rounded text-[14px]">
            {errorMessage}
          </span>
        </div>
      )}

      <form className="w-10/12 max-w-md pb-24 mx-auto mt-12 space-y-8 text-center">
        <input
          type="text"
          placeholder="Enter a word"
          value={word}
          onChange={handleWordChange}
          disabled={linkCopied ? true : false}
          className="w-full p-4 text-xl font-bold text-center text-black rounded outline-none bg-[#eee] placeholder:text-white uppercase"
        />
        <input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={handleNameChange}
          disabled={linkCopied ? true : false}
          className="w-full p-4 text-xl font-bold text-center text-black rounded outline-none bg-[#eee] placeholder:text-white "
          style={{ textTransform: "capitalize" }}
        />
        <p
          onClick={generateLink}
          className={
            linkCopied
              ? "w-full p-4 text-lg font-bold text-center text-white rounded outline-none bg-[#5ac85a] cursor-not-allowed"
              : "w-full p-4 text-lg font-bold text-center text-white rounded outline-none bg-[#212529] cursor-pointer"
          }
        >
          {linkCopied ? "Link Copied" : "Create Link"}
        </p>
        <p className="mt-10">
          {linkCopied &&
            "A shareable link has been created and copied. Send it to your friends!"}
        </p>
        {linkCopied && (
          <div className="flex justify-center space-x-4">
            <FacebookShareButton url={link}>
              <FaFacebook size={23} className="hover:text-[#5ac85a]" />
            </FacebookShareButton>
            <WhatsappShareButton url={link}>
              <FaWhatsapp size={23} className="hover:text-[#5ac85a]" />
            </WhatsappShareButton>
            <TwitterShareButton url={link}>
              <FaTwitter size={23} className="hover:text-[#5ac85a]" />
            </TwitterShareButton>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateGame;
