import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

class SearchResult {
  constructor(data, links) {
    this.data = data
    this.links = links
  }

  title() {
    return this.data[0].title
  }

  description() {
    return this.data[0].description
  }

  preview() {
    if (!this.links) { return [] } 
    return this.links.find(link => link.rel === "preview").href
  }
}

const Search = () => {
  const [searchResults, setSearchResults] = useState([])

  // This determines the HTML to render and the card structure, mapping the images from the state onto each card
  const results = (results) => {
    if (results.length > 0) {
      return results.map(searchResult => {
         return (
         <div className="cardborder">
          <div className="leftbox">
            <div className="image"><img src={searchResult.preview()} alt="" /></div>
          </div>
          <div className="rightbox">
            <div className="title">{searchResult.title()}</div>
          </div>
          <div className="clearfix">
            <div className="bottombox">
              <div className="desc">
                {searchResult.description()}
              </div>
            </div>
          </div>
        </div>
        )
      })
    }
  }

  const fetchResults = async (query) => {
    let response = await fetch(`https://images-api.nasa.gov/search?q=${query}`)
    return await response.json()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let data = await fetchResults(event.target.query.value)

    setSearchResults(data.collection.items.map(resultData => {
      return new SearchResult(resultData.data, resultData.links)
    }))
  }

  return (
    <div className="searchcontent">
      <h3 className="searchtext">Enter a Celestial Term:</h3>
      <form onSubmit={e => { handleSubmit(e) }}>
        <input name="query" type="text"/>
        <input type="submit" id="searchformbutton"/>
      </form>
      {results(searchResults)}
    </div>
  )
}

Search.propTypes = {
  fetchImages: PropTypes.func
}

export default Search
