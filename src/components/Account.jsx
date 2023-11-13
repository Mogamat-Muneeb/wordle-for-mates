import React, { useEffect, useState } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const Account = () => {
  const [user] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState("wordles");
  const [gamesData, setGamesData] = useState([]);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  console.log("🚀 ~ file: Account.jsx:11 ~ Account ~ gamesData:", gamesData);
  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const userId = user?.uid;
        const userGamesCollection = collection(db, "userGames");
        const querySnapshot = await getDocs(userGamesCollection);

        const games = [];
        let winCount = 0;
        let lossCount = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.userId === userId) {
            games.push({
              result: data.result,
              timestamp: data.timestamp.toDate(),
            });

            if (data.result === "win") {
              winCount++;
            } else if (data.result === "lose") {
              lossCount++;
            }
          }
        });

        setGamesData(games);
        setWins(winCount);
        setLosses(lossCount);
      } catch (error) {
        console.error("Error fetching games data:", error);
      }
    };

    if (user) {
      fetchGamesData();
    }
  }, [user]);

  return (
    <>
      <ProtectedRoute>
        <h1 className=" text-[16px] lg:text-[24px]  font-extrabold">
          {user?.displayName || ""}
        </h1>
        <div className="max-w-[600px] w-full mx-auto flex justify-center items-center lg:gap-10 gap-5  pt-10">
          <button
            onClick={() => toggleTab("wordles")}
            className={` text-[16px] lg:text-[20px] ${
              activeTab === "wordles" ? "font-bold" : ""
            }`}
          >
            My Wordles
          </button>
          <button
            onClick={() => toggleTab("wordle-with-friends")}
            className={` text-[16px] lg:text-[20px] ${
              activeTab === "wordle-with-friends" ? "font-bold" : ""
            }`}
          >
            Wordle with friends
          </button>
        </div>
        {/* <div className="border-t border-gray-300 max-w-[600px] w-full mx-auto" /> */}
        <div className="pt-16">
          {activeTab === "wordles" && (
            <>
              <div>
                <h2>Total Games Played: {gamesData.length}</h2>
                <h3>Wins: {wins}</h3>
                <h3>Losses: {losses}</h3>
                <ul>
                  {gamesData.map((game, index) => (
                    <li key={index}>
                      Result: {game.result}, Date: {game.timestamp.toString()}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          {activeTab === "wordle-with-friends" && (
            <div>wordle-with-friends</div>
          )}
        </div>
      </ProtectedRoute>
    </>
  );
};

export default Account;
