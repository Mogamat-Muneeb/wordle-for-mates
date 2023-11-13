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
        <div className="md:grid md:grid-cols-12">
          <div className="flex flex-col items-start justify-start px-3 py-3 space-y-2 md:py-6 md:col-span-3 md:min-h-screen">
            <div className="flex flex-col items-start justify-start pb-10">
              <h1 className=" text-[16px] lg:text-[20px]  font-bold">
                Statistics
              </h1>
              <p className="text-[14px] leading-3">{user?.displayName || ""}</p>
              <p className="text-[14px]">{user?.email || ""}</p>
            </div>
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
          <div className="p-8 space-y-8 bg-white md:col-span-9">
            <div className="">
              {activeTab === "wordles" && (
                <>
                  <div>
                    <h2> Played: {gamesData.length}</h2>
                    <h3>Wins: {wins}</h3>
                    <h3>Losses: {losses}</h3>
                    <ul>
                      {gamesData.map((game, index) => (
                        <li key={index}>
                          {game.result}, Date: {game.timestamp.toString()}
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
          </div>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default Account;
