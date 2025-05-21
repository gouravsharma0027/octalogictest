import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-200">
      <div>
        <h1 className="text-2xl font-bold text-indigo-600">
          Octa Logic Vehicle Booker
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Simplify your ride — Fast. Easy. Reliable.
        </p>
      </div>
      <div className="transition-transform transform hover:scale-105 hover:drop-shadow-md">
        <img
          src="/octalogic.svg"
          alt="Octalogic Logo"
          className="h-10 w-auto cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
