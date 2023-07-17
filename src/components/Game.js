import React, { useState, useEffect } from 'react'
import $ from 'jquery'

import PlayAgain from './PlayAgain'

function Game () {
  const [image, setImage] = useState('')
  const [item, setItem] = useState('')
  const [gamePlayed, setGamePlayed] = useState(false)

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
      setItem(randomSearchItem)
    })
  }

  // the game choices are rendered
  const playGame = () => {
    const spaceWords = ['moon', 'earth', 'jupiter', 'saturn', 'pluto', 'mars', 'venus']
    return spaceWords.map(word =>
        <div className="guessing">
          <button onClick={ e => guessChoice(e)} id={word}>{word}</button>
        </div>
    )
  }

  // the player chooses one item and this function determines if it's a win
  const guessChoice = (e) => {
    setGamePlayed(true)

    if (item === e.target.id) {
      $('.namegamebutton').html("You're Right!")
    } else {
      $('.namegamebutton').html('Wrong, Try Again. Correct Answer: ' + item)
    }
  }

  useEffect(() => {
    getGameImage()
  })

  const renderGame = () => {
    return <div>{playGame()}</div>
  }

  return (
    <div className="namegame">
      <div className="titlegame">Guess which one is associated with this image:</div>
      <img src={image} alt="" id="namegameimage" />
      {renderGame()}
      {gamePlayed ? <PlayAgain /> : null }
    </div>
  )
}

export default Game
