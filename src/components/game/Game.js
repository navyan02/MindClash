import React, { useEffect, useState, useCallback } from "react"
import { useGame } from "../../context/game-context"
import GameMap from "./GameMap"
import GameProgress from "./GameProgress"
import Join from "./Join"
import Lobby from "./Lobby"
import ChooseMap from "./ChooseMap"
import QuestionContainer from "./QuestionContainer"
import GameOver from "./GameOver"
import Rotate from "../../assets/rotate.svg"
import Header from "../Header"

import useSound from 'use-sound';
import popSfx from '../../assets/sounds/pop.mp3';

import HelpMenu from "../cards/HelpMenu"
import QuestionMarkCircle from "../../assets/QuestionMarkCircle"

const Game = ({ code }) => {
  const { room, gameStart, gameState, gameEnd, disconnected } = useGame()
  const [event, setEvent] = useState(false)
  const [create, setCreate] = useState(false)
  const [createSubmitted, setCreateSubmitted] = useState(false)
  const [openHelpMenu, setOpenHelpMenu] = useState(false)
  const [playPop] = useSound(popSfx);

  useEffect(() => {
    if (gameStart) {
      setCreateSubmitted(false)
    }
    setEvent(false)
  }, [gameStart])

  const resetQuestionContainer = useCallback(() => {
    setEvent(false)
  }, [])

  const activateEvent = useCallback(activeEvent => {
    setEvent(activeEvent)
  }, [])

  useEffect(() => {
    console.log({ event, resetQuestionContainer })
  }, [event, resetQuestionContainer])

  if (create) {
    return (
      <ChooseMap
        reset={() => setCreate(false)}
        submit={() => {
          setCreateSubmitted(true)
          setCreate(false)
        }}
      />
    )
  }
  if (createSubmitted && !room) {
    return (
      <div>
        <svg
          className="animate-spin h-24 w-24 text-indigo-600"
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
        </svg>{" "}
      </div>
    )
  }

  if (!room) {
    return (
      <Join code={code} createTime={() => setCreate(true)} />
    )
  }

  if (!gameStart) {
    return <Lobby />
  }

  if (gameEnd) {
    return (
      <>
        <Header />
        <GameOver />
      </>
    )
  }

  return (
    <>
      {/* <div className="xs:hidden absolute top-0 z-30 left-0 w-full h-screen bg-white text-gray-800 flex flex-col space-y-6 items-center justify-center">
        <img src={Rotate} className="h-12 w-12" />
        <p>Please rotate your device.</p>
      </div> */}
      <div className="relative w-full">
        {event && (
          <QuestionContainer
            activeEvent={event}
            reset={resetQuestionContainer}
          />
        )}
        <GameProgress />
        <div className="transform scale-65 sm:scale-75 md:scale-50 lg:scale-100">
          <GameMap activateEvent={activateEvent} />
        </div>
        {/* <div className="absolute bottom-0 left-0 h-48 bg-gray-100 rounded m-2 p-2 overflow-y-scroll">
        {JSON.stringify(gameState.events, null, "\t")}
      </div> */}
        
        <div className="absolute bottom-0 left-0 p-4">
          <div className="flex-initial">
            <button onClick={() => { 
              playPop()
              setOpenHelpMenu(!openHelpMenu) 
              }}><QuestionMarkCircle className="w-8 h-8 text-indigo-400 hover:text-indigo-600"/></button>
          </div>
        </div>
        {
          openHelpMenu && <HelpMenu 
            closeFunc={setOpenHelpMenu}
          />
        }

        {disconnected && (
          <div className="absolute bottom-0 right-0 m-4">
            <div className="flex items-center space-x-2 p-2 bg-red-400 text-white rounded-md animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p>Disconnected. Trying to connect...</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Game
