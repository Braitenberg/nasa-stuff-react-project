import React, { useState, useEffect } from 'react'
import $ from 'jquery'

import { Link } from 'react-router-dom'

function Game () {
  const [image, setImage] = useState('')
  const [answer, setAnswer] = useState('')
  const [lost, setLost] = useState(false)
  const [loading, setLoading] = useState(true)
  const [points, setPoints] = useState(0)

  // ajax request to get the image for the game
  const getGameImage = () => {
    const spaceSearch = ['moon', 'earth', 'jupiter', 'saturn', 'pluto', 'mars', 'venus']
    const randomSearchItem = spaceSearch[Math.floor(Math.random() * spaceSearch.length)]
    const oneHundred = []
    for (let i = 0; i <= 100; i++) {
      oneHundred.push(i)
    }
    const randomNumber = oneHundred[Math.floor(Math.random() * oneHundred.length)]

    const url = 'https://images-api.nasa.gov/search?q='

    // sending the call to the NASA API
    $.ajax({
      url: url + randomSearchItem,
      type: 'GET',
      dataType: 'json'
    }).done(function (json) {
    }).then(json => {
      setImage(json.collection.items[randomNumber].links[0].href)
      setAnswer(randomSearchItem)
    })
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
    const spaceWords = ['moon', 'earth', 'jupiter', 'saturn', 'pluto', 'mars', 'venus']

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
  )
}

export default Game
