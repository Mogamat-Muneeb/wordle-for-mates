import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AES, enc } from "crypto-js";
import Wordle from "./Wordle";

const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const encryptedWord = params.get("word");
  const [solution, setSolution] = useState("");

  useEffect(() => {
    const secretKey = "muneeb2905"; // Replace with the same secret key used for encryption
    const decryptedWord = AES.decrypt(encryptedWord, secretKey).toString(enc.Utf8);
    setSolution(decryptedWord);
  }, [encryptedWord]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Wordle (Lingo)</h1>
      {solution && <Wordle solution={solution} guess={encryptedWord} />}
    </div>
  );
};

export default Home;


