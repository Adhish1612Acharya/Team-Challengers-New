import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram, FaLock } from 'react-icons/fa';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';

function Footer() {
  const [user] = useAuthState(auth);

  return (
    <footer className="bg-white shadow-lg mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-gray-600">© 2024 Team Challengers. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex space-x-6">
              <a href="https://github.com/team-challengers" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com/company/team-challengers" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="https://instagram.com/team.challengers" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600">
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
            <div className="border-l border-gray-300 h-6 mx-2"></div>
            <Link 
              to={user ? "/admin" : "/login"}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <FaLock className="h-4 w-4" />
              <span>{user ? "Admin" : "Admin Login"}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;