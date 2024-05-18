import Image from 'next/image';
import axios from 'axios';
import Swal from "sweetalert2";

const ViewAllBooks = ({ allbook }) => {
    const { id, name, author, category, quantity, price } = allbook;

    const borrowBook = async () => {
        const formData = {
            bookName: name,
        };
    
        Swal.fire({
            title: "Are you sure want to borrow this book?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes, borrow it",
            denyButtonText: "No, cancel",
            icon: "question"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post('http://localhost:3005/user/borrow-book', formData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.data === "already borrowed") {
                        Swal.fire("Book Already Borrowed", "", "warning");
                    } else if (response.data === "successfully borrowed") {
                        Swal.fire("Book Borrowed Successfully", "", "success");
                    } else {
                        Swal.fire("Failed to Borrow Book", "", "error");
                    }
                } catch (error) {
                    Swal.fire("Failed to Borrow Book", "", "error");
                }
            } else if (result.isDenied) {
                Swal.fire("Borrowing Canceled", "", "info");
            }
        });
    }

    return (
        <div className="flex bg-gray-800 px-3 py-3 w-96 rounded-lg shadow-md"> 
           <div className="card card-compact flex justify-center ml-1 mt-1">
                <div className='rounded-lg '>
                    <figure><Image src="https://i.ibb.co/Tb8NFRf/book.jpg" alt="Book" width={350} height={240} priority={true} />
                    </figure>
                    </div>
                        <div className="pt-4">
                            <h2 className="card-title">{name}</h2>
                            <p>Author: {author}</p>
                            <p className="mt-2">category: {category}</p>                
                            <p className='pt-5 ml-10 font-bold text-3xl'>${price}</p>
                        <div className="card-actions justify-end">
                        <button onClick={borrowBook} className="btn bg-gray-600 hover:bg-gray-700  text-white ">Borrow</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewAllBooks;
