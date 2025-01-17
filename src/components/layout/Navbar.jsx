import { Link } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-600">Team Challengers</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="text-gray-900 hover:text-primary-600 px-3 py-2 rounded-md">
                Home
              </Link>
              <Link to="/team" className="text-gray-900 hover:text-primary-600 px-3 py-2 rounded-md">
                Team
              </Link>
              <Link to="/contact" className="text-gray-900 hover:text-primary-600 px-3 py-2 rounded-md">
                Contact
              </Link>
              <Link to="/feedback" className="text-gray-900 hover:text-primary-600 px-3 py-2 rounded-md">
                Feedback
              </Link>
              {user && (
                <Link to="/admin" className="text-gray-900 hover:text-primary-600 px-3 py-2 rounded-md">
                  Admin
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;