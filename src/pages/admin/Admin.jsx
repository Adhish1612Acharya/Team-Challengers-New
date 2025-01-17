import { Link } from 'react-router-dom';
import { FaUserPlus, FaCalendarPlus, FaUsers } from 'react-icons/fa';

function Admin() {
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
      <h1 className="text-3xl font-bold text-primary-600 mb-8 text-center">Admin Dashboard</h1>
      
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