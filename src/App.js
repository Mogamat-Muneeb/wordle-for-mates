import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CreateGame from "./components/CreateGame";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import WordleSingle from "./components/WordleSingle.jsx";
import ReactGA from "react-ga";
import WordleWithFriend from "./components/WordleWithFriend";
import { Analytics } from "@vercel/analytics/react";
import { Login } from "./components/Login.jsx";
import Account from "./components/Account.jsx";


function App() {
  const TRACKING_ID = "UA-255216972-1";
  ReactGA.initialize(TRACKING_ID);
  return (
    <div className="App">
      <Analytics />
      <Router>
        <Header />
        <div className="h-full pt-16 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/with-a-friend" element={<CreateGame />} />
            <Route path="/wordle" element={<WordleWithFriend />} />
            <Route path="/wordle-single" element={<WordleSingle />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
