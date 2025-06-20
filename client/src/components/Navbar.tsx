import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-semibold text-primary">
            Todo Manager
          </Link>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/add"
              className="btn btn-primary inline-flex items-center gap-2"
            >
              <PlusIcon className="h-5 w-5" />
              Add Todo
            </Link>
            {!user ? (
              <>
                <Link to="/login" className="btn btn-secondary">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1 text-gray-700 font-medium">
                  <UserCircleIcon className="h-6 w-6 text-primary" />
                  Hi, {user.username}
                </span>
                <button onClick={logout} className="btn btn-secondary">Logout</button>
              </>
            )}
          </div>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <XMarkIcon className="h-7 w-7 text-primary" />
            ) : (
              <Bars3Icon className="h-7 w-7 text-primary" />
            )}
          </button>
        </div>
        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 py-4 px-6 flex flex-col gap-4 animate-fade-in absolute left-0 right-0 mx-4">
            <Link
              to="/add"
              className="btn btn-primary inline-flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <PlusIcon className="h-5 w-5" />
              Add Todo
            </Link>
            {!user ? (
              <>
                <Link to="/login" className="btn btn-secondary" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1 text-gray-700 font-medium">
                  <UserCircleIcon className="h-6 w-6 text-primary" />
                  Hi, {user.username}
                </span>
                <button onClick={() => { logout(); setMenuOpen(false); }} className="btn btn-secondary">Logout</button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 