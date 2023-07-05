import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Home from "./components/Home";
import CreateGame from "./components/CreateGame";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <div className="App">
      <Router>
          <Header/>
        <div className="pt-16">
          <Routes >
            <Route path="/" element={<CreateGame />} />
            <Route path="/wordle" element={<Home />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
