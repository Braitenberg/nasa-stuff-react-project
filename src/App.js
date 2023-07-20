import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Game from './components/Game'
import Search from './components/Search'

import './App.css'

import Header from './containers/Header'
import MainContainer from './containers/MainContainer'

export default class App extends Component {
  // the welcome component has the header/navbar and the button to choose to search is toggled
  render () {
    return (
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={MainContainer} />
            <Route exact path="/game" component={Game} />
            <Route path="/search" component={Search} />
          </div>
        </BrowserRouter>
    )
  }
}
