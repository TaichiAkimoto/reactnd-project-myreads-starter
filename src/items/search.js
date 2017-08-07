import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'

const CURRENTLYREADING = "currentlyReading"
const WANTTOREAD = "wantToRead"
const READ = "read"
const NONE = "none"

class Search extends React.Component {
  static propTypes = {
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }
  state = {
    result: [],
    query: "",
    noquery: false
  }
  updateQuery = (query) => {
    if(query){
      this.setState({ query })
      BooksAPI.search(query.trim(), 20).then((result) => {
        if(result.error) {
          this.setState({ result: [], noquery: true })
        } else {
          result.map((book) => {
            let currentlyReadingMatch = this.props.currentlyReading.filter((item) => item.id === book.id)
            if (currentlyReadingMatch.length !== 0) {
              book.shelf = CURRENTLYREADING
            }else{
              let wantToReadMatch = this.props.wantToRead.filter((item) => item.id === book.id)
              if(wantToReadMatch.length !== 0) {
                book.shelf = WANTTOREAD
              }else{
                let readMatch = this.props.read.filter((item) => item.id === book.id)
                if(readMatch.length !== 0) {
                  book.shelf = READ
                }else{
                  book.shelf = NONE
                }
              }
            }
            return true
          })
          this.setState({ result: result, noquery: false })
        }
      })
    } else {
      this.setState({ query: "", result:[], noquery: false })
    }
  }

  render() {
    const { changeShelf } = this.props
    const { result, query, noquery } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
        {noquery && (
          <h2>No results found</h2>
        )}
          <ol className="books-grid">
          {result.map((book) => (
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
                {book.authors ? (<div className="book-authors">{book.authors[0]}</div>):
                                (<div className="book-authors">Unknow Author</div>)}
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
