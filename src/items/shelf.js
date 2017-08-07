import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookGrid from './bookGrid'

class Shelf extends React.Component {
  static propTypes = {
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render() {
    const { currentlyReading, wantToRead, read, changeShelf } = this.props
    let shelf = [currentlyReading, wantToRead, read]
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelf.map((category, index) => (
              <div key={index} className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <BookGrid books={category} changeShelf={changeShelf}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link
            to='./search'
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Shelf
