"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookManagement = () => {
    const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  
  const [books, setBooks] = useState<any[]>([]);
  const [upbooks, setUpadate] = useState<{
    id: string;
    quantity: number;
    price: number;
  }>({
    id: '',
    quantity: 0,
    price: 0,
  });
  

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/books");
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  

  const handleUpdateBookInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpadate((prevBook) => ({ ...prevBook, [name]: value }));
  };
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/books/addbook', {
        name,
        author,
        quantity,
        price,
        category,
      });
      console.log(response.data); // Log the response
      alert('Book added successfully');
      toast.success('Book added successfully.');
    } catch (error) {
      console.error('Error adding book:', error); // Log the error
      
      toast.error('Failed to add book.');
    }
  };


  
  const handleUpdateBook = async () => {
    try {
      await axios.put(`http://localhost:3000/books/${upbooks.id}`, {
        price: upbooks.price,
        quantity: upbooks.quantity,
      });
      fetchBooks();
      setUpadate({ id: '', quantity: 0, price: 0 });
      toast.success('Book updated successfully.');
    } catch (error) {
      console.error('Error updating book:', error);
      toast.error('Failed to update book.');
    }
  };

  const handleDeleteBook = async () => {
    try {
      await axios.delete(`http://localhost:3000/books/${upbooks.id}`);
      fetchBooks();
      toast.success('Book deleted successfully.');
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-r from-green-200 to-blue-250">
      <h1 className="text-3xl font-bold mb-4 bg-gray-800 p-4 text-white">Book Management</h1>
      <ToastContainer />

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Add New Book</h2>
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 mb-2 border rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)} 
          className="p-2 mb-2 border rounded"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="p-2 mb-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="p-2 mb-2 border rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)} 
          className="p-2 mb-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Book
        </button>
        </form>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Update Book</h2>
        <select
          onChange={(e) =>
            setUpadate((prevBook) => ({ ...prevBook, id: e.target.value }))
          }
          className="p-2 mb-2 border rounded"
        >
          <option value="">Select a book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="price"
          placeholder="New Price"
          value={upbooks.price}
          onChange={handleUpdateBookInputChange}
          className="p-2 mb-2 border rounded"
        />
        <input
          type="number"
          name="quantity"
          placeholder="New Quantity"
          value={upbooks.quantity}
          onChange={handleUpdateBookInputChange}
          className="p-2 mb-2 border rounded"
        />
        <button
          onClick={handleUpdateBook}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Book
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 ">Delete Book</h2>
        <select
          onChange={(e) =>
            setUpadate((prevBook) => ({ ...prevBook, id: e.target.value }))
          }
          className="p-2 mb-2 border rounded"
        >
          <option value="">Select a book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleDeleteBook}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded"
        >
          Delete Book
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Book List</h2>
        <ul>
          {books.map((book) => (
            <li key={book.id} className="mb-2">
              {book.name} by {book.author}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookManagement;
