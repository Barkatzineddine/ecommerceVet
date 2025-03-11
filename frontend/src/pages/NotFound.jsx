import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-black">404 Not Found</h1>
      <p className="text-gray-600 mt-2">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="mt-3 bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
