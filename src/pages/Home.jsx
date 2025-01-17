function Home() {
  const domains = [
    {
      name: 'Coding',
      description: 'Developing innovative software solutions and applications.',
      icon: '💻'
    },
    {
      name: 'Robotics',
      description: 'Building and programming autonomous robots and systems.',
      icon: '🤖'
    },
    {
      name: 'Aeromodelling',
      description: 'Designing and constructing model aircraft and drones.',
      icon: '✈️'
    },
    {
      name: 'Media',
      description: 'Creating engaging content and managing social media presence.',
      icon: '📱'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary-600 mb-4">Welcome to Team Challengers</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We are a dynamic team of innovators, creators, and problem solvers working together to push the boundaries of technology.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {domains.map((domain) => (
          <div key={domain.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">{domain.icon}</div>
            <h3 className="text-xl font-semibold text-primary-600 mb-2">{domain.name}</h3>
            <p className="text-gray-600">{domain.description}</p>
          </div>
        ))}
      </section>
      
    </div>
  );
}

export default Home;