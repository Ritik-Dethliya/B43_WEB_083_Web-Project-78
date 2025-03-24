import { useState } from "react";
import { Link } from "react-router-dom"; // If using React Router
import { Menu, X } from "lucide-react"; // Icons for mobile menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-700 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          <h1 className="text-2xl font-bold">Travel-Expnce</h1>

        
          <ul className="hidden md:flex space-x-6 font-semibold">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/addbuget" className="hover:text-gray-300">Add Budget</Link></li>
            <li><Link to="/analysis" className="hover:text-gray-300">Analysis</Link></li>
          </ul>

          
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden bg-green-800">
          <ul className="flex flex-col items-center space-y-4 py-4 font-semibold">
            <li><Link to="/" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/addbuget" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Add Budget</Link></li>
            <li><Link to="/analysis" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Analysis</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
