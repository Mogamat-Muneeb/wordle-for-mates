import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Home from "./components/Home";
import CreateGame from "./components/CreateGame";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes >
          <Route path="/" element={<CreateGame />} />
          <Route path="/wordle" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
