import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './items/search'
import Shelf from './items/shelf'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  // fetch all books
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelf books={books}/>
          )}
        />
        <Route path='/search' render={() => (
          <Search />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
