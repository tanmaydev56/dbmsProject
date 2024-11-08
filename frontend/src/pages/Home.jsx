import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <div className="text-center px-6 md:px-12">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight tracking-wide animate__animated animate__fadeIn">
          Welcome to Shopify - Your Eco-Friendly Store!
        </h1>
        <p className="text-lg mb-8">
          Discover the best eco-friendly products that help you live sustainably.
        </p>
        <Link to="/products">
          <button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500">
            Shop Now
          </button>
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 w-full text-center text-lg text-gray-200 pb-4">
        <p>&copy; 2024 Shopify - Sustainable Living</p>
      </div>
    </div>
  );
};

export default Home;
