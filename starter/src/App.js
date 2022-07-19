import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import SearchPage from "./SearchPage";
import * as BookAPI from "./BooksAPI";
import Bookshelf from "./Bookshelf";

function App() {
  const [allBooks, setAllBooks] = useState([]);
  console.log("allBooks: ", allBooks);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BookAPI.getAll();
      setAllBooks(res);
    };

    getBooks();
  }, []);

  const handleChangeBookshelf = async (book, shelf) => {
    await BookAPI.update(book, shelf);
    console.log(`move book ${book.title} to shelf ${shelf}`);
    const updatedAllBooks = allBooks.map((currBook) => {
      return {
        ...currBook,
        shelf: currBook.id === book.id ? shelf : currBook.shelf,
      };
    });

    setAllBooks(updatedAllBooks);
  };

  return (
    // <div className="app">
    <Routes>
      <Route
        exact
        path="/"
        element={
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  title="Currently Reading"
                  currentShelf="currentlyReading"
                  books={allBooks}
                  onChangeBookshelf={handleChangeBookshelf}
                />
                <Bookshelf
                  title="Want to Read"
                  currentShelf="wantToRead"
                  books={allBooks}
                  onChangeBookshelf={handleChangeBookshelf}
                />
                <Bookshelf
                  title="Read"
                  currentShelf="read"
                  books={allBooks}
                  onChangeBookshelf={handleChangeBookshelf}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        }
      />
      <Route
        path="/search"
        element={<SearchPage onChangeBookshelf={handleChangeBookshelf} />}
      />
    </Routes>
  );
}

export default App;
