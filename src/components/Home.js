import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import sjcl from "sjcl";
import Wordle from "./Wordle";

const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const encryptedWord = params.get("word");
  const [solution, setSolution] = useState("");

  useEffect(() => {
    const secretKey = `${process.env.REACT_APP_SECRET_KEY}`
    const decryptedWord = sjcl.decrypt(secretKey, encryptedWord);
    setSolution(decryptedWord);
  }, [encryptedWord]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Wordle (Lingo)</h1>
      {solution && <Wordle solution={solution} guess={encryptedWord} />}
    </div>
  );
};

export default Home;
