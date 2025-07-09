import React from 'react';
import { useSelector } from 'react-redux';
import { ArrowLeft, User, Target, Calendar, Settings, Edit } from 'lucide-react';

const ProfileView = ({ onBack, onEdit }) => {
  const userState = useSelector(state => state.user);

  // Get user's initials for profile picture
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userName = userState.profile?.name || 'User';
  const initials = getInitials(userName);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                <p className="text-sm text-gray-600">Your fitness profile overview</p>
              </div>
            </div>
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {initials}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{userName}</h2>
              <p className="text-gray-600 mb-4">
                {userState.goals?.primaryGoal?.replace('_', ' ')?.toLowerCase() || 'No specific goal'}
              </p>
              <div className="text-sm text-gray-600 space-y-1">
                {userState.profile?.age && (
                  <p><strong>Age:</strong> {userState.profile.age} years</p>
                )}
                {userState.profile?.gender && (
                  <p><strong>Gender:</strong> {userState.profile.gender}</p>
                )}
                <p><strong>Activity Level:</strong> {userState.profile?.activityLevel?.replace('_', ' ') || 'Not set'}</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Physical Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Physical Stats</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Height</p>
                  <p className="text-xl font-semibold">
                    {userState.profile?.height ? `${userState.profile.height} cm` : 'Not set'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Weight</p>
                  <p className="text-xl font-semibold">
                    {userState.profile?.weight ? `${userState.profile.weight} kg` : 'Not set'}
                  </p>
                </div>
              </div>
              {userState.profile?.height && userState.profile?.weight && (
                <div className="mt-4 bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-700">BMI</p>
                  <p className="text-xl font-semibold text-blue-800">
                    {((userState.profile.weight / Math.pow(userState.profile.height / 100, 2))).toFixed(1)}
                  </p>
                </div>
              )}
            </div>

            {/* Goals */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Fitness Goals</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Primary Goal</p>
                  <p className="text-lg font-semibold capitalize">
                    {userState.goals?.primaryGoal?.replace('_', ' ') || 'Not set'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Target Weight</p>
                  <p className="text-lg font-semibold">
                    {userState.goals?.targetWeight ? `${userState.goals.targetWeight} kg` : 'Not set'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Weekly Workouts</p>
                  <p className="text-lg font-semibold">
                    {userState.goals?.weeklyWorkouts || 3} per week
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Timeframe</p>
                  <p className="text-lg font-semibold capitalize">
                    {userState.goals?.timeframe?.replace('_', ' ') || '3 months'}
                  </p>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Units</p>
                  <p className="text-lg font-semibold capitalize">
                    {userState.preferences?.units || 'Metric'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Default Rest</p>
                  <p className="text-lg font-semibold">
                    {userState.preferences?.defaultRestTime || 90}s
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Reminders</p>
                  <p className="text-lg font-semibold">
                    {userState.preferences?.workoutReminders ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileView;