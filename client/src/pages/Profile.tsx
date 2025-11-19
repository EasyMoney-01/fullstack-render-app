import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { authAPI } from '../utils/api'

interface User {
  id: string
  username: string
  email: string
  createdAt: string
}

const Profile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAPI.getProfile()
        setProfile(response.data.user)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        {error}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        
        {profile && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <p className="mt-1 text-lg text-gray-900">{profile.username}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-lg text-gray-900">{profile.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Member Since</label>
              <p className="mt-1 text-lg text-gray-900">
                {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                User ID: {profile.id}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
