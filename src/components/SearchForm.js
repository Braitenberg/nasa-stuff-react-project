import React from 'react'
import PropTypes from 'prop-types'

function SearchForm ({ fetchImages }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    fetchImages(event.target.query.value)
  }

  return (
    <div className="searchcontent">
      <h3 className="searchtext">Enter a Celestial Term:</h3>
      <form onSubmit={e => { handleSubmit(e) }}>
        <input name="query" type="text"/>
        <input type="submit" id="searchformbutton"/>
      </form>
    </div>
  )
}

SearchForm.propTypes = {
  fetchImages: PropTypes.func
}

export default SearchForm
