import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchImgUrl } from '../services/ImageUrl';

const CartPage = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgUrls, setImgUrls] = useState([]);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  // Fetch the cart and product data when the component mounts
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cart/${userId}`);
        setCartItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart data', error);
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    const fetchImages = async () => {
      try {
        const imgUrlsData = await fetchImgUrl();
        setImgUrls(imgUrlsData);
      } catch (error) {
        setError('Error fetching images');
      }
    };

    fetchImages();
    fetchCartData();
    fetchProducts();
  }, [userId]);

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity <= 0) return; // Prevent setting quantity to zero or negative

    try {
      const response = await axios.put(`http://localhost:5000/cart/item/${cartItemId}`, { quantity: newQuantity });
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cart_item_id === cartItemId ? { ...item, quantity: response.data.quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity', error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:5000/cart/item/${cartItemId}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.cart_item_id !== cartItemId));
      // If cart is empty after removal, update loading state to prompt the user.
      if (cartItems.length === 1) {
        setLoading(true);
      }
    } catch (error) {
      console.error('Error removing item', error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const product = products.find((prod) => prod.product_id === productId);
      const response = await axios.post('http://localhost:5000/cart', {
        userId,
        productId,
        quantity: 1, // Add 1 item by default
        price: product.price,
      });
      setCartItems((prevItems) => [...prevItems, response.data]);
    } catch (error) {
      console.error('Error adding item to cart', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Your Cart</h2>

      {/* Products list */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Available Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const productImage = imgUrls.find(img => img.product_id === product.product_id);

            return (
              <div
                key={product.product_id}
                className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col"
              >
                <img
                  src={productImage?.image_url || 'https://example.com/images/default-product.jpg'}
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-md mb-5"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3">{product.description}</p>
                <p className="text-lg font-bold text-gray-800">${product.price}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock_quantity}</p>

                <div className="mt-6">
                  <button
                    onClick={() => handleAddToCart(product.product_id)}
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-200 w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart Items */}
      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => {
            const productImage = imgUrls.find(img => img.product_id === item.product_id);

            return (
              <div
                key={item.cart_item_id}
                className="flex justify-between items-center p-4 mb-4 border rounded-lg shadow-lg bg-white"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={productImage?.image_url || 'https://example.com/images/default-product.jpg'}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-lg text-gray-600">Price: ${item.price}</p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.cart_item_id, item.quantity - 1)}
                        className="bg-gray-300 text-gray-800 py-1 px-3 rounded-full"
                      >
                        -
                      </button>
                      <p className="text-lg">{item.quantity}</p>
                      <button
                        onClick={() => handleQuantityChange(item.cart_item_id, item.quantity + 1)}
                        className="bg-gray-300 text-gray-800 py-1 px-3 rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.cart_item_id)}
                  className="text-red-500 hover:text-red-700 transition duration-200"
                >
                  Remove
                </button>
              </div>
            );
          })}
          <div className="text-right mt-4">
            <h3 className="text-2xl font-semibold">Total: ${calculateTotal()}</h3>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">Your cart is empty</p>
      )}
    </div>
  );
};

export default CartPage;
