"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewBorrowBook from '../components/ViewBorrowBook';

const MyBook = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3005/user/viewBorrowedBook");
      setBorrowedBooks(response.data); 
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    
  };

  useEffect(() => {
    fetchBooks();
  }, []);

return (
  <div className="">
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mx-20 py-10 items-center justify-center">
      {Array.isArray(borrowedBooks) && borrowedBooks.length ? (
        borrowedBooks.map((book) => ( 
          <ViewBorrowBook key={book?.id} book={book} />
        ))
      ) : (
        <div className='text-4xl flex items-center justify-center h-screen '>{`You haven't borrowed any book`}</div>
      )}
    </div>
  </div>
);

}


export default MyBook;
