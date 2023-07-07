import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CreateGame from "./components/CreateGame";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Home from "./components/Home.js";
import WordleSingle from "./components/WordleSingle.js";
import ReactGA from "react-ga";
import WordleWithFriend from "./components/WordleWithFriend";
import { useEffect, useState } from "react";
import englishWords from "./data/db.json";

function App() {
  const TRACKING_ID = "UA-255216972-1";
  ReactGA.initialize(TRACKING_ID);

  // const [solution, setSolution] = useState(null);

  // const words = englishWords.words;
  // useEffect(() => {
  //   let randomSolution = null;
  //   do {
  //     randomSolution = words[Math.floor(Math.random() * words.length)];
  //   } while (randomSolution.length !== 5);
  //   setSolution(randomSolution);
  // }, [setSolution, words]);

  return (
    <div className="px-4 md:px-0 App">
      <Router>
        <Header />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/with-a-friend" element={<CreateGame />} />
            <Route path="/wordle" element={<WordleWithFriend />} />
            <Route
              path="/wordle-single"
              // element={solution && <WordleSingle solution={solution} />}
              element={<WordleSingle />}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
