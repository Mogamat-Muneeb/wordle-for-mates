import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import Solutions from "./data/db.json";

function App() {
  const [solution, setSolution] = useState(null);
  useEffect(() => {
    const randomSolution =
      Solutions.solutions[
        Math.floor(Math.random() * Solutions.solutions.length)
      ];
    setSolution(randomSolution.word);
  }, []);

  return (
    <div className="App">
      <h1>Wordle (Lingo)</h1>
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;
