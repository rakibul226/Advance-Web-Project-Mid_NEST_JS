"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import '../globals.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const InventoryManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get<Product[]>('http://localhost:3000/products/getallproducts');
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedProduct) {
      const { name, value } = e.target;
      setSelectedProduct({ ...selectedProduct, [name]: value });
    }
  };

  const handleUpdateProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSaveProduct = async () => {
    if (!selectedProduct) return;

    try {
      await axios.put(`http://localhost:3000/products/${selectedProduct.id}`, selectedProduct);
      setProducts(products.map(product => 
        product.id === selectedProduct.id ? selectedProduct : product
      ));
      setSuccessMessage('Product updated successfully');
      setSelectedProduct(null);
    } catch (error) {
      console.error('Failed to update product:', error);
      setErrorMessage('Failed to update product.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent
          products={products}
          selectedProduct={selectedProduct}
          handleInputChange={handleInputChange}
          handleUpdateProduct={handleUpdateProduct}
          handleSaveProduct={handleSaveProduct}
        />
      </div>
      <Footer />
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Ever-Neighbour</div>
      <nav>
        <Link href="/editpro" className="text-gray-300 hover:text-white px-3">Profile</Link>
        <Link href="/notifications" className="text-gray-300 hover:text-white px-3">Notifications</Link>
        <Link href="/login" className="text-gray-300 hover:text-white px-3">Logout</Link>
      </nav>
    </header>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="w-60 bg-gray-100 p-4">
      <nav className="flex flex-col space-y-2">
        <Link href="/dashboard" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Dashboard</Link>
        <Link href="/userprof" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Members</Link>
        <Link href="/notice" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Notice</Link>
        <Link href="/productadd" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Add Product</Link>
        <Link href="/salesrepo" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Sales Report</Link>
        <Link href="/sendmsg" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Send Message</Link>
        <Link href="/assigndel" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Assign Delivery</Link>
        <Link href="/picup" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Products pic upload</Link>
        <Link href="/inventory" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Inventory</Link>
        <Link href="/manageOrders" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Manage Orders</Link>
      </nav>
    </aside>
  );
};

interface MainContentProps {
  products: Product[];
  selectedProduct: Product | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateProduct: (product: Product) => void;
  handleSaveProduct: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  products,
  selectedProduct,
  handleInputChange,
  handleUpdateProduct,
  handleSaveProduct,
}) => {
  return (
    <main className="flex-1 p-4 flex flex-col space-y-4">
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold text-center mb-6">Inventory Management</h1>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="bg-white border-b">
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{product.description}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{product.quantity}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleUpdateProduct(product)}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedProduct && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
              <input
                type="text"
                name="name"
                value={selectedProduct.name}
                onChange={handleInputChange}
                className="border p-2 w-full"
                placeholder="Name"
              />
              <input
                type="text"
                name="description"
                value={selectedProduct.description}
                onChange={handleInputChange}
                className="border p-2 w-full"
                placeholder="Description"
              />
              <input
                type="number"
                name="price"
                value={selectedProduct.price}
                onChange={handleInputChange}
                className="border p-2 w-full"
                placeholder="Price"
              />
              <input
                type="number"
                name="quantity"
                value={selectedProduct.quantity}
                onChange={handleInputChange}
                className="border p-2 w-full"
                placeholder="Quantity"
              />
              <button
                onClick={handleSaveProduct}
                className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      &copy; 2024 Your Company. All rights reserved.
    </footer>
  );
};

export default InventoryManagement;
