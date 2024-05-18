import { useState } from 'react';
import Swal from 'sweetalert2';
import Image from 'next/image';

const ViewBorrowBook = ({ book }) => {
    const { name, author, category, price, quantity } = book;
    const [returning, setReturning] = useState(false);
    const [returned, setReturned] = useState(false);

    const handleReturnBook = async () => {
        try {
            const confirmResult = await Swal.fire({
                title: 'Return Book',
                text: 'Are you sure you want to return this book?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, return it!',
                cancelButtonText: 'Cancel'
            });

            if (!confirmResult.isConfirmed) {
                return; 
            }
            setReturning(true); 

            const response = await fetch(`http://localhost:3005/user/delete/${name}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Book returned successfully');
                setReturned(true); 
                Swal.fire({
                    title: 'Success',
                    text: 'Our customer service team will collect the book soon.',
                    icon: 'success'
                });
            } else {
                console.error('Failed to return book:', response.statusText);
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to return book. Please try again later.',
                    icon: 'error'
                });
            }
        } catch (error) {
            console.error('Error returning book:', error.message);
            Swal.fire({
                title: 'Error',
                text: 'An error occurred while returning the book. Please try again later.',
                icon: 'error'
            });
        } finally {
            setReturning(false); 
        }
    };

    return (
        <div className="flex bg-gray-800 px-3 py-3 ">
            <div className='flex-1 flex'><Image src="https://i.ibb.co/Tb8NFRf/book.jpg" alt="Book" width={350} height={240} /></div>
            <div className="flex text-start h-60 pl-5 py-3">
                <div className="w-full flex flex-col">
                    <div className="flex-shrink-0">
                        <h1 className="text-3xl text-gray-300 font-bold mb-3">{name}</h1>
                        <p>Author: {author}</p>
                        <p className="mt-2">Category: {category}</p>
                        {/* <p className="font-light">Available: {quantity}</p> */}
                        {/* <p className='pt-5 font-bold text-3xl'>${price}</p> */}
                    </div>
                    <div className="flex flex-grow justify-center ml-32 items-end">
                        <button
                            className="bg-gray-600 py-2 px-3 rounded-sm hover:bg-gray-700 text-white"
                            onClick={handleReturnBook}
                            disabled={returning || returned} 
                        >
                            {returning ? 'Returning...' : (returned ? 'Returned' : 'Return book')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ViewBorrowBook;

