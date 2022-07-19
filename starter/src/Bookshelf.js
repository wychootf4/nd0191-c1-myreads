import Book from "./Book";

const Bookshelf = ({ title, currentShelf, books, onChangeBookshelf }) => {
  const currentShelfBooks = books.filter((book) => book.shelf === currentShelf);
  //   const [currentShelfBooks, setCurrentShelfBooks]
  const handleChangeBook = (book, shelf) => {
    onChangeBookshelf(book, shelf);
  };

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {currentShelfBooks.map((book) => {
            return (
              <li key={book.id}>
                <Book book={book} onChangeBook={handleChangeBook} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Bookshelf;
