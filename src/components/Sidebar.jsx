import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white p-4">
      {/* <h2 className="text-xl font-semibold mb-8">Real Shyt</h2> */}
      <div className="space-y-4">
        <a 
          href="/login" 
          className="block text-lg text-gray-200 hover:text-gray-400"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default Sidebar;