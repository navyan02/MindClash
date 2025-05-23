import React from "react"

const Tutorial = () => {
  return (
    <div className="p-4 flex flex-col space-y-4">
      <div className="p-4 flex flex-col space-y-4">
          <h2 className="text-center md:text-2xl font-bold text-black">How to play</h2>
          <p className="text-black">Take over the map by cracking Python questions and claiming territory before time runs out. The more you conquer, the closer you are to victory</p>
          <div className="flex space-x-2 items-center">
            <div className="h-5 w-5 bg-indigo-600 rounded-full" />
            <p className="text-black">
              <span className="font-bold">Click here for questions!</span> Click and answer to conquer!
            </p>
          </div>
          <div className="flex space-x-2 items-center">
            <div className="h-5 w-5 bg-gray-300 rounded-full" />
            <p className="text-black">
              <span className="font-bold">Unclaimed:</span> Territory that is not claimed yet!! TAKE OVER!
            </p>
          </div>
          <p className="text-center text-black">Territory controlled by a player will become their color:</p>
          <div className="flex space-x-2 items-center justify-center">
            <div className="h-5 w-5 bg-green-500 rounded-full" />
            <div className="h-5 w-5 bg-yellow-500 rounded-full" />
            <div className="h-5 w-5 bg-blue-500 rounded-full" />
            <div className="h-5 w-5 bg-pink-500 rounded-full" />
          </div>
          <p className="text-gray-600 text-xs text-center">Be careful! Territory can be stolen back!</p>
          <div></div>
        </div>
    </div>
  )
}
export default Tutorial
