import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Swal from 'sweetalert2';


const ViewMyProducts = ({ product }) => {
    const { name, totalPrice, quantity, product_id } = product;
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [updateButtonText, setUpdateButtonText] = useState('Update');
    const [deleteButtonText, setDeleteButtonText] = useState('Delete');

    const handleUpdateQuantity = async () => {
        try {
            const { value: newQuantity } = await Swal.fire({
                title: 'Enter New Quantity',
                input: 'number',
                inputLabel: 'New Quantity',
                inputPlaceholder: 'Enter new quantity...',
                inputAttributes: {
                    min: 1,
                    step: 1
                },
                showCancelButton: true,
                confirmButtonText: 'Update',
                cancelButtonText: 'Cancel',
                showLoaderOnConfirm: true,
                preConfirm: async (newQuantity) => {
                    try {
                        setIsUpdating(true);
                        await axios.put("http://localhost:3005/user/updateQuantity", {
                            productName: name,
                            quantity: parseInt(newQuantity)
                        });

                        setIsUpdating(false);
                        setUpdateButtonText('Updated');
                    } catch (error) {
                        console.error("Error updating quantity:", error);
                        setIsUpdating(false);
                        Swal.showValidationMessage(`Error: ${error.message}`);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
            });

            if (newQuantity) {
                Swal.fire({
                    title: 'Updated!',
                    text: `Quantity updated to ${newQuantity}`,
                    icon: 'success'
                });
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handleDeleteProduct = async () => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                setIsDeleting(true);
                await axios.delete(`http://localhost:3005/user/cancel-order/${name}`);
                setIsDeleting(false);
                setDeleteButtonText('Deleted');
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Product has been deleted.',
                    icon: 'success'
                });
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            setIsDeleting(false);
            Swal.fire({
                title: 'Error!',
                text: `Failed to delete product: ${error.message}`,
                icon: 'error'
            });
        }
    };

    return (
        <div className="flex bg-gray-800 px-3 py-3 ">
            <div className='flex items-center justify-center flex-1'>
                <Image src="https://i.ibb.co/Jr36DVb/product.png" alt="Book" width={220} height={240}  />
            </div>
            <div className="flex flex-1 text-start h-60 pl-5 py-3">
                <div className="w-full flex flex-col">
                    <div className="flex-shrink-0">
                        <h1 className="text-3xl text-gray-300 font-bold mb-3">{name}</h1>
                        <p>Name: {name}</p>
                        <p className="mt-2">Quantity: {quantity}</p>
                        <p className="font-light">Total Price: ${totalPrice}</p>
                    </div>
                    <div className="flex flex-grow justify-center ml-32 items-end">
                        <button
                            className={`bg-gray-600 py-2 px-3 rounded-sm hover:bg-gray-700 text-white mr-2 ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleUpdateQuantity}
                            disabled={isUpdating || isDeleting}
                        >
                            {updateButtonText}
                        </button>
                        <button
                            className={`bg-red-600 py-2 px-3 rounded-sm hover:bg-red-700 text-white ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleDeleteProduct}
                            disabled={isUpdating || isDeleting}
                        >
                            {deleteButtonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewMyProducts;
