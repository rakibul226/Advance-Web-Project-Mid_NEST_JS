"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  name: string;
  author: string;
  category: string;
  price: number;
}

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get<Book[]>('http://localhost:3000/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-200 to-blue-250 min-h-screen flex items-center justify-center"
    
    style={{
      backgroundImage: "url(img1.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    >
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white">Book List</h1>
        <div className="flex flex-col gap-7">
          {books.map(book => (
            <div key={book.id} className="bg-white rounded-lg shadow-md p-2">
              <h2 className="text-xl font-semibold mb-4">{book.name}</h2>
              <p className="text-gray-600 mb-2">Author: {book.author}</p>
              <p className="text-gray-600 mb-2">Category: {book.category}</p>
              <p className="text-gray-600 mb-2">Price: {book.price} BDT</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookList;
