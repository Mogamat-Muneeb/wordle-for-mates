import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import sjcl from "sjcl";
import Wordle from "./Wordle";
import HowToPlay from "./HowToPlay";

const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const encryptedWord = params.get("word");
  const createName = params.get("name");
  const [solution, setSolution] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  useEffect(() => {
    const secretKey = `${process.env.REACT_APP_SECRET_KEY}`;
    const decryptedWord = sjcl.decrypt(secretKey, encryptedWord);
    setSolution(decryptedWord);
  }, [encryptedWord]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-extrabold text-[30px] p-4 text-[#212529] border-b-[1px] border-[#eee] w-full">
        Wordle for mates!
      </h1>
      {show && <HowToPlay handleShow={handleShow} createName={createName} />}
      <button
        onClick={handleShow}
        className="font-bold md:text-[20px] text-[16px]"
      >
        How to play
      </button>
      <p className="py-4 font-medium">
        You have 6 tries to guess
        <span className="text-[#5ac85a] font-extrabold px-1">{createName}'s</span> 5
        letter word!
      </p>
      {solution && <Wordle solution={solution} guess={encryptedWord} />}
    </div>
  );
};

export default Home;
