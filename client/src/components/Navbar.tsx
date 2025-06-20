import { Link } from 'react-router-dom';
import { PlusIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-semibold text-primary">
            Todo Manager
          </Link>
          <div className="flex items-center gap-4">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 