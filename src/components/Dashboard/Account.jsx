import React, { useEffect, useState } from "react";
import ProtectedRoute from "../ProtectedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import MyWordles from "./MyWordles";

const Account = () => {
  const [user] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState("wordles");
  const [gamesData, setGamesData] = useState([]);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  let currentStreak = 0;
  let maxStreak = 0;
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

  for (let i = 0; i < gamesData.length; i++) {
    const result = gamesData[i].result;

    if (result === "win") {
      currentStreak++;
    } else {
      maxStreak = Math.max(maxStreak, currentStreak);
      currentStreak = 0;
    }
  }

  maxStreak = Math.max(maxStreak, currentStreak);

  return (
    <>
      <ProtectedRoute>
        <div className="lg:flex hidden items-center justify-between  max-w-[1280px] w-full mx-auto">
          <div className="">
            <h1 className=" text-[16px] lg:text-[20px]  font-bold">
              Statistics
            </h1>
          </div>
          <div className="flex flex-col items-start justify-start ">
            <p className="text-[14px] leading-3">{user?.displayName || ""}</p>
            <p className="text-[14px]">{user?.email || ""}</p>
          </div>
        </div>
        <div className="md:grid md:grid-cols-12 max-w-[1280px] w-full mx-auto lg:p-0 p-4">
          <div className="flex flex-col items-start justify-start space-y-2 md:py-6 md:col-span-3 md:min-h-screen">
            <button
              onClick={() => toggleTab("wordles")}
              className={` text-[16px]  ${
                activeTab === "wordles" ? "font-bold text-[#5ac85a]" : ""
              }`}
            >
              My Wordles
            </button>
            <button
              onClick={() => toggleTab("wordle-with-friends")}
              className={` text-[16px] ${
                activeTab === "wordle-with-friends" ? "font-bold text-[#5ac85a]" : ""
              }`}
            >
              Wordle with friends
            </button>
          </div>
          <div className="p-4 space-y-8 bg-white md:col-span-9">
            <div className="">
              {activeTab === "wordles" && (
                <>
                  <MyWordles
                    gamesData={gamesData}
                    wins={wins}
                    losses={losses}
                    maxStreak={maxStreak}
                    currentStreak={currentStreak}
                  />
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
