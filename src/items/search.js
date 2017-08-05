import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'

class Search extends React.Component {
  static propTypes = {
    changeShelf: PropTypes.func.isRequired
  }
  state = {
    result: [],
    query: "",
    noquery: true
  }
  updateQuery = (query) => {
    if(query){
      this.setState({ query: query })
      BooksAPI.search(query.trim(), 20).then((result) => {
        if(result.error) {
          this.setState({ result: [], noquery: true })
        } else {
          console.log(result);
          this.setState({ result: result, noquery: false })
        }
      })
    } else {
      this.setState({ query: "", result:[], noquery: true })
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
            { /*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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
                {book.authors && (<div className="book-authors">{book.authors[0]}</div>)}
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
