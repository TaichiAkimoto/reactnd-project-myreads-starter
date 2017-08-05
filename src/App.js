import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './items/search'
import Shelf from './items/shelf'
import { Route } from 'react-router-dom'

const CURRENTLYREADING = "currentlyReading"
const WANTTOREAD = "wantToRead"
const READ = "read"

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
    let currentlyReading, wantToRead, read
    if (books) {
      currentlyReading = books.filter((jenre) =>
        jenre.shelf === CURRENTLYREADING
      )
      wantToRead = books.filter((jenre) =>
        jenre.shelf === WANTTOREAD
      )
      read = books.filter((jenre) =>
        jenre.shelf === READ
      )
    } else {
      currentlyReading=[]
      wantToRead=[]
      read = []
    }
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelf currentlyReading={currentlyReading} wantToRead={wantToRead} read={read} changeShelf={ this.changeShelfContent }/>
          )}
        />
        <Route path='/search' render={() => (
          <Search currentlyReading={currentlyReading} wantToRead={wantToRead} read={read} changeShelf={ this.changeShelfContent }/>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
