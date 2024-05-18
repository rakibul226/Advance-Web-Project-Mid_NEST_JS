"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import ViewAllBooks from '../components/ViewAllBooks';

export default function Registration() {
  const [books, setBooks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3005/user/view-all-books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = () => {
    setSearchClicked(true);
    const filteredBooks = books.filter(book =>
      book.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchedBooks(filteredBooks);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="px-14">
      <div className="flex justify-end py-4 pr-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search book"
            className="input input-ghost w-full max-w-xs border border-gray-500 pr-10"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="absolute right-0 top-0 h-full flex items-center justify-center p-3 border border-gray-500 rounded-r-md bg-gray-500 hover:bg-gray-600"
            onClick={handleSearch}
          >
            <FaSearch />
          </button>
        </div>
      </div>

      <h1 className='text-3xl pb-3 font-semibold'>Total Books:{books.length}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">
        {(searchClicked && inputValue.trim() !== '' && searchedBooks.length === 0) ? (
          <div>Book not found</div>
        ) : (
          (searchedBooks.length > 0 ? searchedBooks : books).map((book) => (
            <ViewAllBooks key={book.id} allbook={book} />
          ))
        )}
      </div>
    </div>
  );
}
