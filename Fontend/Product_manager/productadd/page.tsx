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

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://localhost:3000/products/getallproducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!name || !description || price <= 0 || quantity <= 0) {
      setErrorMessage('Please fill in all fields correctly.');
      return;
    }

    try {
      const response = await axios.post<{ message: string }>('http://localhost:3000/products/addProduct', {
        name,
        description,
        price,
        quantity,
      });
      setSuccessMessage(response.data.message);
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Failed to add product.');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent
          products={products}
          name={name}
          description={description}
          price={price}
          quantity={quantity}
          setName={setName}
          setDescription={setDescription}
          setPrice={setPrice}
          setQuantity={setQuantity}
          handleAddProduct={handleAddProduct}
          handleDeleteProduct={handleDeleteProduct}
          errorMessage={errorMessage}
          successMessage={successMessage}
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
  name: string;
  description: string;
  price: number;
  quantity: number;
  setName: (value: string) => void;
  setDescription: (value: string) => void;
  setPrice: (value: number) => void;
  setQuantity: (value: number) => void;
  handleAddProduct: (e: React.FormEvent<HTMLFormElement>) => void;
  handleDeleteProduct: (id: number) => void;
  errorMessage: string;
  successMessage: string;
}

const MainContent: React.FC<MainContentProps> = ({
  products,
  name,
  description,
  price,
  quantity,
  setName,
  setDescription,
  setPrice,
  setQuantity,
  handleAddProduct,
  handleDeleteProduct,
  errorMessage,
  successMessage,
}) => {
  return (
    <main className="flex-1 p-4 flex flex-col space-y-4">
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Products</h1>

        {errorMessage && <div className="bg-red-100 text-red-700 p-2 mb-4">{errorMessage}</div>}
        {successMessage && <div className="bg-green-100 text-green-700 p-2 mb-4">{successMessage}</div>}

        <form onSubmit={handleAddProduct} className="mb-4 space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Product</button>
        </form>

        <h2 className="text-xl font-bold mb-4">Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id} className="mb-2 border p-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
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

export default ProductsPage;

























// "use client"

// import { useState, ChangeEvent, FormEvent } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import '../globals.css';

// interface Product {
//   name: string;
//   description: string;
//   price: string; 
//   category: string;
//   quantity: number; 
//   tags: string[];
// }

// const ProductEntry = () => {
//   const [product, setProduct] = useState<Product>({
//     name: '',
//     description: '',
//     price: '',
//     category: '',
//     quantity: 0, 
//     tags: []
//   });
//   const [message, setMessage] = useState<string>('');
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setErrors(prevErrors => ({ ...prevErrors, [name]: '' })); 
//     if (name === "tags") {
     
//       setProduct(prev => ({ ...prev, tags: value.split(',').map(tag => tag.trim()) }));
//     } else if (name === "quantity") {
     
//       setProduct(prev => ({ ...prev, quantity: parseInt(value) || 0 }));
//     } else {
//       setProduct(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const validateForm = () => {
//     let valid = true;
//     let newErrors: { [key: string]: string } = {};

//     if (!product.name.trim()) {
//       newErrors.name = 'Please enter a valid name.';
//       valid = false;
//     }
//     if (!product.description.trim()) {
//       newErrors.description = 'Please enter a valid description.';
//       valid = false;
//     }
//     if (!product.price || isNaN(parseFloat(product.price)) || parseFloat(product.price) <= 0) {
//       newErrors.price = 'Please enter a valid price.';
//       valid = false;
//     }
//     if (!product.category.trim()) {
//       newErrors.category = 'Please enter a valid category.';
//       valid = false;
//     }
//     if (product.quantity <= 0) {
//       newErrors.quantity = 'Please enter a valid quantity.';
//       valid = false;
//     }
    
//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!validateForm()) {
//       setMessage('Please fix the errors above.');
//       return;
//     }

//     try {
     
//       const response = await axios.post('/api/products', {
//         ...product,
//         price: parseFloat(product.price) 
//       });
//       if (response.status === 200) {
//         setMessage('Product added successfully!');
//         setProduct({ name: '', description: '', price: '', category: '', quantity: 0, tags: [] }); 
//         setErrors({});
//       } else {
//         setMessage('Failed to add product.');
//       }
//     } catch (error: any) {
//       setMessage('Failed to add product: ' + error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <div className="flex flex-1">
//         <Sidebar />
//         <MainContent product={product} handleChange={handleChange} handleSubmit={handleSubmit} message={message} errors={errors} />
//       </div>
//       <Footer />
//     </div>
//   );
// };

// const Header = () => {
//   return (
//     <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
//       <div className="text-xl font-bold">Ever-Neighbour</div>
//       <nav>
//       <Link href="/editpro" className="text-gray-300 hover:text-white px-3">Profile</Link>
//         <Link href="/notifications" className="text-gray-300 hover:text-white px-3">notifications</Link>
//         <Link href="/login" className="text-gray-300 hover:text-white px-3">Logout</Link></nav>
//     </header>
//   );
// };

// const Sidebar = () => {
//   return (
//     <aside className="w-60 bg-gray-100 p-4">
//       <nav className="flex flex-col space-y-2">
//       <Link href="/dashboard" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Dashboard</Link>
//         <Link href="/userprof" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Members</Link>
//         <Link href="/notice" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Notice</Link>
//         <Link href="/productadd" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Add-Product</Link>
//         <Link href="/salesrepo" className="text-gray-700 hover:bg-gray-200 p-2 rounded">SalesReport</Link>
//         <Link href="/sendmsg" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Send-Message</Link>
//         <Link href="/assigndel" className="text-gray-700 hover:bg-gray-200 p-2 rounded">assigndel</Link>
//         <Link href="/deletepro" className="text-gray-700 hover:bg-gray-200 p-2 rounded">Delete-Products</Link>
//         <Link href="/inventory" className="text-gray-700 hover:bg-gray-200 p-2 rounded">inventory</Link>
//         <Link href="/manageOrders" className="text-gray-700 hover:bg-gray-200 p-2 rounded">manageOrders</Link></nav>
//     </aside>
//   );
// };

// interface MainContentProps {
//   product: Product;
//   handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
//   handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
//   message: string;
//   errors: { [key: string]: string };
// }

// const MainContent: React.FC<MainContentProps> = ({ product, handleChange, handleSubmit, message, errors }) => {
//   return (
//     <main className="flex-1 p-4 flex flex-col space-y-4">
//       <div className="max-w-2xl mx-auto mt-10 p-8 border rounded-lg shadow-lg bg-white">
//         <h1 className="text-xl font-bold mb-8">Add New Product</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={product.name}
//               onChange={handleChange}
//               placeholder="Name"
//               required
//               className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
//           </div>
//           <div>
//             <label className="block font-medium text-gray-700">Description</label>
//             <textarea
//               name="description"
//               value={product.description}
//               onChange={handleChange}
//               placeholder="Description"
//               required
//               className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
//           </div>
//           <div>
//             <label className="block font-medium text-gray-700">Price</label>
//             <input
//               type="number"
//               name="price"
//               value={product.price}
//               onChange={handleChange}
//               placeholder="Price"
//               required
//               className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
//           </div>
//           <div>
//             <label className="block font-medium text-gray-700">Category</label>
//             <input
//               type="text"
//               name="category"
//               value={product.category}
//               onChange={handleChange}
//               placeholder="Category"
//               required
//               className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.category && <p className="text-red-500 text-xs italic">{errors.category}</p>}
//           </div>
//           <div>
//             <label className="block font-medium text-gray-700">Quantity</label>
//             <input
//               type="number"
//               name="quantity"
//               value={product.quantity}
//               onChange={handleChange}
//               placeholder="Quantity"
//               required
//               className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
//             />
//             {errors.quantity && <p className="text-red-500 text-xs italic">{errors.quantity}</p>}
//           </div>
//           <div>
//             <label className="block font-medium text-gray-700">Tags</label>
//             <input
//               type="text"
//               name="tags"
//               value={product.tags.join(',')}
//               onChange={handleChange}
//               placeholder="Tags (comma-separated)"
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             />
//           </div>
//           <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             Add Product
//           </button>
//         </form>
//         {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
//       </div>
//     </main>
//   );
// };

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white p-4 text-center">
//       &copy; 2024 Your Company. All rights reserved.
//     </footer>
//   );
// };

// export default ProductEntry;
