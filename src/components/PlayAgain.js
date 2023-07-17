import React from 'react'
import { Link } from 'react-router-dom'

function reloadPage () {
  document.location.reload(true)
}

export default function PlayAgain () {
  return (
    <div className="playagainbutton">
      <button onClick={reloadPage}>Again!</button>
      <Link to="/"><button className="back">Go Back</button></Link>
    </div>
  )
}
