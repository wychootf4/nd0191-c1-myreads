import { useState } from "react";
import * as BookAPI from "./BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";

const SearchPage = ({ onChangeBookshelf }) => {
  const [query, setQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const updateQuery = async (query) => {
    setQuery(query);
    const res = await BookAPI.search(query, 10);
    console.log("search result: ", res);
    setSearchResults(res);
  };

  const handleChangeBook = (book, shelf) => {
    onChangeBookshelf(book, shelf);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(event) => {
              updateQuery(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults &&
            !!!searchResults.error &&
            searchResults.map((searchResult) => {
              return (
                <li key={searchResult.id}>
                  <Book book={searchResult} onChangeBook={handleChangeBook} />
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
