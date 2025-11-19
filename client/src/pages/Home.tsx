import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Welcome to Full-Stack Render App
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        A complete full-stack application built with React, Express, and MongoDB, 
        ready for deployment on Render.com
      </p>
      <div className="space-x-4">
        <Link
          to="/posts"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          View Posts
        </Link>
        <Link
          to="/register"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          Get Started
        </Link>
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">🚀 Fast & Modern</h3>
          <p className="text-gray-600">
            Built with React 18, TypeScript, and Vite for optimal performance
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">🔒 Secure</h3>
          <p className="text-gray-600">
            JWT authentication, CORS protection, and input validation
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">📱 Responsive</h3>
          <p className="text-gray-600">
            Mobile-first design that works perfectly on all devices
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
