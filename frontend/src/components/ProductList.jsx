import React, { useEffect, useState } from 'react';
import { fetchProductsnew } from '../services/ProductServiceNew';
import { fetchImgUrl } from '../services/ImageUrl';
import { fetchTransactions } from '../services/transaction';
import { Link, useNavigate } from 'react-router-dom';

const ProductsListNew = () => {
  const [products, setProducts] = useState([]);
  const [imgUrls, setImgUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await fetchProductsnew();
        setProducts(productsData);
      } catch (error) {
        setError("Error fetching products");
      }
    };

    const fetchImages = async () => {
      try {
        const imgUrlsData = await fetchImgUrl();
        setImgUrls(imgUrlsData);
      } catch (error) {
        setError("Error fetching images");
      }
    };

    const fetchTransactionsData = async () => {
      try {
        const transactionsData = await fetchTransactions();
        setTransactions(transactionsData);
      } catch (error) {
        setError("Error fetching transactions");
      }
    };

    Promise.all([fetchProducts(), fetchImages(), fetchTransactionsData()])
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Products List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => {
            const productImage = imgUrls.find(img => img.product_id === product.product_id);
            const productTransactions = transactions.filter(transaction => transaction.product_id === product.product_id);

            return (
              <div key={product.product_id} className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col">
                <img
                  src={productImage?.image_url || "https://example.com/images/default-product.jpg"}
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-md mb-5"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3">{product.description}</p>
                <p className="text-lg font-bold text-gray-800">${product.price}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock_quantity}</p>

                <div className="mt-6 flex-grow">
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">Inventory Transactions</h4>
                  <div className="space-y-3">
                    {productTransactions.length > 0 ? (
                      productTransactions.map((transaction) => (
                        <div
                          key={transaction.transaction_id}
                          className={`p-4 border-l-4 ${transaction.transaction_type === 'Stock In' ? 'border-green-500' : 'border-red-500'} bg-gray-50 rounded-md`}
                        >
                          <p className="text-sm font-medium text-gray-700">{transaction.transaction_type}</p>
                          <p className="text-sm text-gray-600">Quantity: {transaction.quantity}</p>
                          <p className="text-xs text-gray-400">Date: {new Date(transaction.transaction_date).toLocaleString()}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No transactions found</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => navigate('/carts')}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200 w-full"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-xl text-gray-500">No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductsListNew;
