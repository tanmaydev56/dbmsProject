// src/components/ProductList.jsx
import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/ProductService';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Product List</h2>
      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.product_id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <span className="text-xl font-semibold text-gray-800">{product.name}</span> - 
            <span className="text-lg text-gray-600">${product.price}</span>
          </li>
        ))}
      </ul>
      <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-6">Product Description</h2>
      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.product_id}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <p className="text-gray-700">{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
