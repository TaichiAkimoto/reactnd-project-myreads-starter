import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './items/search'
import Shelf from './items/shelf'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
    this.changeShelfContent = this.changeShelfContent.bind(this);
  }
  fetchAllShelf() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  changeShelfContent(content, shelf) {
    // update value
    BooksAPI.update(content, shelf).then((books) => {
      if(books) {
        this.fetchAllShelf()
      }
    })
  }
  // fetch all books
  componentDidMount() {
    this.fetchAllShelf()
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelf books={books} changeShelf={ this.changeShelfContent }/>
          )}
        />
        <Route path='/search' render={() => (
          <Search changeShelf={ this.changeShelfContent }/>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
