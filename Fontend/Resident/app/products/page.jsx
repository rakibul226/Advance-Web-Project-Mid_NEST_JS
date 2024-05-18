"use client"

import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Allproducts from '../components/Allproducts';

export default function BuyProduct() {
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3005/user/view-all-product"); 
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = () => {
    setSearchClicked(true);
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchedProducts(filteredProducts);
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
            placeholder="Search product"
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

      <h1 className='text-3xl pb-3 font-semibold'>Total Products:{products.length}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 ">
        {(searchClicked && inputValue.trim() !== '' && searchedProducts.length === 0) ? (
          <div>Product not found</div>
        ) : (
          (searchedProducts.length > 0 ? searchedProducts : products).map((product) => (
            <Allproducts key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}





