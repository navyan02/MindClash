import * as React from "react";

import Header from "../components/Header";

import bronzeTrophy from "../assets/bronzeTrophy.svg";
import silverTrophy from "../assets/silverTrophy.svg";
import goldTrophy from "../assets/goldTrophy.svg";
import SEO from "../components/SEO";
import "../style/frostythesnowman.css";

const APIURL = process.env.GATSBY_LOCAL_SOCKET
  ? "http://localhost:3000/leaderboard"
  : "https://dominate-be.onrender.com/leaderboard";

const Leaderboard = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(APIURL)
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-black">
        <SEO title="leaderboard" />
        <svg
          className="animate-spin h-24 w-24 text-pink-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  const topPlayers = data.slice(0, 3);
  const otherPlayers = data.slice(3);

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-gray-900 to-black text-neon">
      <SEO title="leaderboard" />
      <Header />
      <div className="max-w-7xl mx-auto pt-16 px-8">
        <div className="flex flex-row justify-between mb-8">
          <h1 className="text-4xl font-bold text-pink-500">Leaderboard</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between space-x-6">
          <div className="order-3 md:order-1 bg-gray-800 bg-opacity-50 shadow-lg rounded-md w-full h-full p-5 text-center text-cyan-300">
            <img src={bronzeTrophy} className="w-5/12 mx-auto" />
            <p className="font-bold text-3xl my-2">3rd</p>
            <p className="font-bold text-xl my-2">{topPlayers[2].score}</p>
            <p className="font-bold my-2">{topPlayers[2].user}</p>
          </div>
          <div className="order-1 md:order-2 bg-gray-800 bg-opacity-50 shadow-lg rounded-md w-full h-full p-5 text-center text-yellow-300">
            <img src={goldTrophy} className="w-5/12 mx-auto" />
            <p className="font-bold text-3xl my-2">1st</p>
            <p className="font-bold text-xl my-2">{topPlayers[0].score}</p>
            <p className="font-bold my-2">{topPlayers[0].user}</p>
          </div>
          <div className="order-2 md:order-3 bg-gray-800 bg-opacity-50 shadow-lg rounded-md w-full h-full p-5 text-center text-gray-300">
            <img src={silverTrophy} className="w-5/12 mx-auto" />
            <p className="font-bold text-3xl my-2">2nd</p>
            <p className="font-bold text-xl my-2">{topPlayers[1].score}</p>
            <p className="font-bold my-2">{topPlayers[1].user}</p>
          </div>
        </div>

        {otherPlayers.map((player, i) => (
          <div className="w-full bg-gray-800 bg-opacity-50 shadow-lg rounded-md p-5 py-2 my-4 text-cyan-300">
            <div className="grid grid-cols-2 justify-items-stretch">
              <div className="justify-self-start">
                <p className="font-bold">{`${i + 4}. ${player.user}`}</p>
              </div>
              <div className="justify-self-end text-align-right">
                <p className="font-bold">{`${player.score} pts`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
