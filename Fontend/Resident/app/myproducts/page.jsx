"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewMyProducts from '../components/ViewMyProducts';

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3005/user/viewBoughtProduct");
      setProducts(response.data); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-5 mx-20 py-10 items-center justify-center">
        {Array.isArray(products) && products.length ? (
          products.map((product) => ( 
            <ViewMyProducts key={product?.product_id} product={product} />
          ))
        ) : (
          <div className='text-4xl flex items-center justify-center h-screen '>{`You haven't added any products yet`}</div>
        )}
      </div>
    </div>
  );
}

export default MyProducts;
