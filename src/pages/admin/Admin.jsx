import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaCalendarPlus, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { toast } from 'react-hot-toast';

function Admin() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const adminOptions = [
    {
      title: 'Add Member',
      description: 'Add new team members with their details',
      icon: <FaUserPlus className="h-8 w-8" />,
      link: '/admin/add-member'
    },
    {
      title: 'Add Events',
      description: 'Create and manage team events',
      icon: <FaCalendarPlus className="h-8 w-8" />,
      link: '/admin/add-event'
    },
    {
      title: 'Recruits',
      description: 'Manage recruitment process',
      icon: <FaUsers className="h-8 w-8" />,
      link: '/admin/recruits'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary-600">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          <FaSignOutAlt className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminOptions.map((option) => (
          <Link
            key={option.title}
            to={option.link}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center text-center">
              <div className="text-primary-600 mb-4">
                {option.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h2>
              <p className="text-gray-600">{option.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Admin;