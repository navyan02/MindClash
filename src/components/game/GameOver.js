import React, { useState } from "react"
import { useGame } from "../../context/game-context"
import FinalProgress from "./FinalProgress"
import { m as motion } from "framer-motion"

// Sound Integration
import useSound from "use-sound"
import dunDunDunSfx from "../../assets/sounds/dun-dun-dun.mp3"
import fanfareSfx from "../../assets/sounds/fanfare.mp3"

import { useAuth } from "../../context/auth-context"

const GameOver = () => {
  const { startGame, roomOwner, resetGameState, winner } = useGame()

  const { user } = useAuth() || {}

  const [playWinnerSound] = useSound(dunDunDunSfx)
  const [playLoserSound] = useSound(fanfareSfx)

  if (winner === user) {
    playWinnerSound()
  } else {
    playLoserSound()
  }

  return (
    <div className="max-w-4xl h-full flex flex-col items-center justify-center ">
      <div className="relative ">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
          className="shadow-md border w-full bg-white rounded p-4 flex flex-col relative space-y-4 z-20"
        >
          <div>
          <p className="text-sm text-center uppercase text-black">
            Time's Up!
          </p>
          <p className="text-2xl text-center font-bold 	text-purple-800">{winner} wins!</p>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <h4 className="text-center text-black">Summary:</h4>
          <FinalProgress />
        </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={resetGameState}
              className="secondary-btn rounded text-center"
            >
              New Game
            </button>
            <button
              className={`rounded ${
                roomOwner ? "primary-btn" : "default-btn cursor-not-allowed"
              }`}
              disabled={!roomOwner}
              onClick={() => startGame()}
            >
              Rematch
            </button>
          </div>
          {!roomOwner && (
            <p className="text-xs text-gray-400 max-w-lg">
              Only the room owner can start a rematch.
            </p>
          )}
        </motion.div>
        {/* Animated Bubbles */}
        <div className="absolute bottom-0 z-0 bubbles">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="bubble"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameOver
