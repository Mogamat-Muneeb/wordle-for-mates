import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import sjcl from "sjcl";
import Wordle from "./Wordle";
import HowToPlay from "./HowToPlay";
import { encrypt } from "../helper";

const WordleWithFriend = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const encryptedWord = params.get("word");
  const createName = params.get("name");
  // const [solution, setSolution] = useState("");
  const [solutionEncrypt, setSolutionEncrypt] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;
    const decryptedWord = sjcl.decrypt(secretKey, encryptedWord);
    const shiftAmount = 3;
    const encryptedText = encrypt(decryptedWord, shiftAmount);
    setSolutionEncrypt(encryptedText);
  }, [solutionEncrypt]);

  // useEffect(() => {
  //   const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;
  //   const decryptedWord = sjcl.decrypt(secretKey, encryptedWord);
  //   setSolution(decryptedWord);
  // }, [encryptedWord]);

  return (
    <div className="flex flex-col items-center justify-center">
      {show && <HowToPlay handleShow={handleShow} createName={createName} />}
      <button
        onClick={handleShow}
        className="font-bold md:text-[20px] text-[16px]"
      >
        How to play
      </button>

      <p className="py-1font-medium">
        You have 6 tries to guess
        <span className="text-[#5ac85a] font-bold px-1">
          {createName.charAt(0).toUpperCase() + createName.slice(1)}'s
        </span>
        5-letter word!
      </p>

      {solutionEncrypt && (
        <Wordle
          solution={solutionEncrypt}
          guess={encryptedWord}
          createName={createName}
        />
      )}
    </div>
  );
};

export default WordleWithFriend;
