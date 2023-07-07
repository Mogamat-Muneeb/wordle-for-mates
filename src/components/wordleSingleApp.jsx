import { useEffect, useState } from 'react'
import englishWords from "../data/db.json";
import WordleSingle from './WordleSingle'

function WordleApp() {
    const [solution, setSolution] = useState(null);

  useEffect(() => {
    // Get random solution from the imported JSON file
    const randomSolution = englishWords[Math.floor(Math.random() * englishWords.length)];
    setSolution(randomSolution.word);
  }, [setSolution]);

  return (
    <div className="App">
      <h1>Wordle (Lingo)</h1>
      {solution && <WordleSingle solution={solution} />}
    </div>
  );
}

export default WordleApp
