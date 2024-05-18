import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Swal from 'sweetalert2';

const Allproducts = ({ product }) => {
    const { name, description, price,quantity} = product;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleBuyProduct = async () => {
        try {
            const { value: quantityToBuy } = await Swal.fire({
                title: 'Enter Quantity',
                input: 'number',
                inputLabel: 'Quantity',
                inputPlaceholder: 'Enter the quantity',
                inputAttributes: {
                    min: 1,
                    step: 1
                },
                showCancelButton: true,
                confirmButtonText: 'Buy Now',
                cancelButtonText: 'Cancel',
                inputValidator: (value) => {
                    if (!value || value < 1) {
                        return 'Please enter a valid quantity';
                    }
                }
            });

            if (quantityToBuy) {
                setIsLoading(true);
                const response = await axios.post("http://localhost:3005/user/buyProduct", {
                    productName: name,
                    quantity: quantityToBuy,
                });

                if (response.data === "already_purchased") {
                    setIsLoading(false);
                    return Swal.fire({
                        icon: 'info',
                        title: 'Already Purchased.! ',
                        text: 'please update the quantity',
                    });
                }
                else if (response.data === "lowQuantity") {
                    setIsLoading(false);
                    return Swal.fire({
                        icon: 'warning',
                        title: 'Low Quantity! ',
                        text: 'enough quantity is not available',
                    });
                }

                console.log(response.data); 


                const totalPrice = parseFloat(price) * parseInt(quantityToBuy);

                setIsLoading(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Purchase Successful',
                    text: `You have successfully purchased ${quantityToBuy} ${name}(s). Total price: $${totalPrice.toFixed(2)}`,
                });
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="card card-compact glass">
            <figure>
                <Image src="https://i.ibb.co/Jr36DVb/product.png" alt="product" width={350} height={240} priority={true} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <p>Quantity Available: {quantity}</p>
                <p className="text-xl">Price: <span className="font-bold text-2xl">${price}</span></p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={handleBuyProduct} disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Buy Now'}
                    </button>
                </div>
                {error && <p>Error: {error}</p>}
            </div>
        </div>
    );
};

export default Allproducts;





