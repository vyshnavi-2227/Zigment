import React, { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = ({ jsonSchema, setJsonSchema, downloadJSON, copyToClipboard, resetSchema }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow p-4 flex flex-col md:flex-row justify-between items-center">
      <div className="text-xl font-bold flex justify-between w-full md:w-auto">
        Dynamic Form Generator
        <button
          className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <div
        className={`flex-col md:flex md:flex-row items-center gap-4 mt-4 md:mt-0 w-full md:w-auto ${isOpen ? 'flex' : 'hidden'
          } md:flex`}
      >
        <button
          onClick={downloadJSON}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full md:w-auto"
        >
          Download JSON
        </button>

        <button
          onClick={copyToClipboard}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded w-full md:w-auto"
        >
          Copy to Clipboard
        </button>

        <button
          onClick={resetSchema}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded w-full md:w-auto"
        >
          Reset
        </button>

        <div className="w-full md:w-auto">
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
