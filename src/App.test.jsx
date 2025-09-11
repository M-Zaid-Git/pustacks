import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Simple test component
const TestComponent = () => {
  return (
    <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">ZESHO Test Page</h1>
      <p className="text-gray-700">If you can see this message, the basic React rendering is working correctly.</p>
      <div className="mt-4 p-4 bg-blue-50 rounded">
        <h2 className="text-lg font-medium">Next Steps:</h2>
        <ul className="list-disc pl-5 mt-2">
          <li>Check browser console for errors</li>
          <li>Enable full application step by step</li>
        </ul>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestComponent />} />
        <Route path="*" element={<TestComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
