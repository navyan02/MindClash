import { Link } from "gatsby"
import * as React from "react"
import Header from "../components/Header"

import "../style/bubbles.css"
// import Logo from "../assets/logo.svg"
import SEO from "../components/SEO"
import Circuit from "../assets/cyberpunk-circuit-transparent.png"

const APIURL = process.env.GATSBY_LOCAL_SOCKET === "true"
  ? "http://localhost:3000/stats"
  : `${process.env.GATSBY_API_URL}/stats`

const Index = () => {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetch(APIURL)
      .then(response => response.json())
      .then(res => {
        setData(res)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <SEO title="Mind Clash" />
      <div className="relative h-full py-32 md:py-0 lg:py-0">
        <Header />

      {/* Enlarged Circuit Image */}
      <div className="absolute top-0 right-0 z-10 flex items-start justify-end h-full pr-16 pt-10">
        <img
          src={Circuit}
          alt="Neon Circuit"
          className="w-[400px] md:w-[500px] lg:w-[550px] opacity-80"
        />
      </div>


        <div className="px-2 h-screen flex flex-col items-start justify-center text-lightNeonBlue space-y-4 md:space-y-8 relative z-20 pl-10">

          {/* Updated Text */}
          <p className="text-xl md:text-2xl font-semibold text-left text-white">
            Speed Meets Strategy in a Clash of Minds
          </p>
          <p className="text-4xl md:text-6xl font-bold text-left text-white mt-1">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-red-500">
              THE BOARD IS YOURS
            </span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <Link
              to="/game"
              className="primary-btn text-lg md:text-2xl font-bold rounded-full"
            >
              <p className="px-3">Play Now</p>
            </Link>
            <Link
              to="/leaderboard"
              className="secondary-btn text-lg md:text-2xl font-bold rounded-full"
            >
              <p className="px-3">View Leaderboard</p>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="flex space-x-4 text-left pt-8">
            <div>
              <p className="text-xl md:text-3xl font-bold text-neonBlue">
                {loading ? "..." : data.online}
              </p>
              <p className="text-crimson">Active Players</p>
            </div>
            <div className="h-16 bg-neonPink my-auto" style={{ width: 2 }} />
            <div>
              <p className="text-xl md:text-3xl font-bold text-neonBlue">
                {loading ? "..." : data.activeRooms}
              </p>
              <p className="text-crimson">Current Games</p>
            </div>
            <div className="h-16 bg-neonPink my-auto" style={{ width: 2 }} />
            <div>
              <p className="text-xl md:text-3xl font-bold text-neonBlue">
                {loading ? "..." : data.gamesPlayed}
              </p>
              <p className="text-crimson">Games Played</p>
            </div>
          </div>
        </div>

        {/* Animated Bubbles */}
        <div className="absolute bottom-0 z-0 bubbles">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="bubble"></div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Index;
