import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Confetti from 'react-confetti'
import { useRef } from 'react'

function Game () {
  const spaceWords = ['moon', 'earth', 'jupiter', 'saturn', 'pluto', 'mars', 'venus']
  const imageUrl = 'https://images-api.nasa.gov/search?q='

  const [image, setImage] = useState('')
  const [answer, setAnswer] = useState('')
  const [lost, setLost] = useState(false)
  const [loading, setLoading] = useState(true)
  const [points, setPoints] = useState(0)

  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  // http request to get the image for the game
  const getGameImage = async () => {
    let randomSearchItem = spaceWords[Math.floor(Math.random() * spaceWords.length)]

    // sending the call to the NASA API
    let response = await fetch(
      imageUrl + randomSearchItem, { headers: { "Content-Type": "application/json" } }
    )

    let data = await response.json()
    let items = data.collection.items
    let randomNumber = Math.floor(Math.random() * items.length)

    setImage(items[randomNumber].links[0].href)
  }

  // the player chooses one item and this function determines if it's a win
  const guessChoice = (e) => {
    if (answer !== e.target.id) {
      setLost(true)
    } else {
      setPoints(points + 1)
    }
  }

  useEffect(() => {
    if (!lost) { getGameImage() }
  }, [points, lost])

  const youLost = () => {
    return (
      <div className="playagainbutton">
        <p>Incorrect! Correct answer: {answer}</p>
        <button onClick={() => { document.location.reload(true) }}>Play again!</button>
        <Link to="/"><button className="back">Go Back</button></Link>
      </div>
    )
  }

  const game = () => {
    return (
      <div>
        {spaceWords.map(
          (word) => {
            return <button id={word} disabled={loading} onClick={e => { guessChoice(e) }}>{word}</button>
          }
        )}
      </div>
    )
  }

  return (
    <>
      { (points > 0) ? (
        <Confetti width={windowSize.current[0]} height={windowSize.current[1]} recycle={false} />
      ) : (null) }
      
      <div className="namegame">

        <h1>Score: {points}</h1>
      {
        lost ? (youLost()) : (
          <>
          <h2>Guess which one is associated with this image:</h2>
          <div style={{display: loading ? "block" : "none"}}>
             Loading...
          </div>
          <div style={{display: loading ? "none" : "block"}}>
            <img src={image} alt="" id="namegameimage" onLoad={() => {setLoading(false)}} />
          </div>
          {game()}
          </>
          )
      }
    </div>
  </>
  )
}

export default Game
