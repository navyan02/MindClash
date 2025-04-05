import React from "react";
import { useGame } from "../../context/game-context";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { m as motion } from "framer-motion";
import Header from "../Header";
import Tutorial from "./Tutorial";

const Lobby = () => {
  const { startGame, roomOwner, room, players, socketID, owner } = useGame();

  const PlayerItem = ({ playerID, index }) => (
    <div className="flex items-center space-x-2 text-black">
      <div className="h-6 w-6 flex items-center justify-center bg-indigo-600 text-white rounded-full text-sm font-bold">
        {index + 1}
      </div>
      <p className="font-medium">
        {playerID}{" "}
        <span className="text-indigo-500 font-semibold">
          {playerID === socketID ? "(You!)" : ""}
          {playerID === owner ? " (Owner)" : ""}
        </span>
      </p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-screen px-4 pt-20">
      <Header />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
        className="w-full bg-white shadow-xl rounded-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Side: Lobby Info */}
          <div className="border-r p-6 flex flex-col items-center justify-center text-center space-y-6">
            {roomOwner ? (
              <>
              <div className="text-center space-y-2">
                <p className="text-xs uppercase text-gray-400">Your room code</p>
                <p className="text-3xl font-bold tracking-wider text-black">{room}</p>

                <div className="flex justify-center pt-4">
                  <CopyToClipboard text={room}>
                    <button className="secondary-btn rounded px-6 py-2">Copy Code</button>
                  </CopyToClipboard>
                </div>

                <p className="text-sm text-black mt-2">
                  Share this code with your friends to join.
                </p>
              </div>
                <div className="pt-6">
                  <p className="text-xs uppercase text-gray-400 text-center mb-2">
                    Players in Lobby
                  </p>
                  <div className="space-y-2">
                    {players?.map(({ name }, i) => (
                      <PlayerItem key={name} playerID={name} index={i} />
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    className="primary-btn w-full rounded-full py-2 text-lg"
                    onClick={startGame}
                  >
                    Start Game
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-xs uppercase text-gray-400 text-center">
                  Players in Lobby
                </p>
                <div className="space-y-2">
                  {players?.map(({ name }, i) => (
                    <PlayerItem key={name} playerID={name} index={i} />
                  ))}
                </div>

                <div className="primary-btn mt-6 w-full flex items-center justify-center py-2 space-x-2 rounded-full">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                  <span>Waiting for game start...</span>
                </div>
                <p className="text-xs text-gray-400 text-center pt-2">
                  Nudge the room owner if this takes too long.
                </p>
              </>
            )}
          </div>

          {/* Right Side: Tutorial */}
          <div className="p-6">
            <Tutorial />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Lobby;
