import React from 'react'
import '../App.css'
import PropTypes from 'prop-types'

class BookGrid extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }
  render() {
    const { books, changeShelf } = this.props
    return (
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select value={ book.shelf } onChange={(e) => changeShelf(book, e.target.value)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              {book.authors && book.authors[0] ? (<div className="book-authors">{book.authors[0]}</div>):
                              (<div className="book-authors">Unknow Author</div>)}
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default BookGrid
