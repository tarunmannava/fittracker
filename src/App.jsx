import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dumbbell, Plus, TrendingUp, Calendar } from 'lucide-react';
import Onboarding from './Onboarding';
import ProfileDropdown from './components/ProfileDropdown';
import Settings from './components/Settings';
import ProfileView from './components/ProfileView';
import { resetOnboarding } from './features/user/userSlice';

function App() {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  const workoutsState = useSelector(state => state.workouts);
  
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'settings', 'profile'

  // Show onboarding if user hasn't completed it
  if (!userState.isOnboarded) {
    return <Onboarding />;
  }

  // Handle navigation from profile dropdown
  const handleNavigation = (action) => {
    switch (action) {
      case 'profile':
        setCurrentView('profile');
        break;
      case 'settings':
        setCurrentView('settings');
        break;
      case 'reset':
        if (window.confirm('This will reset all your data and return you to onboarding. Are you sure?')) {
          dispatch(resetOnboarding());
        }
        break;
      default:
        break;
    }
  };

  // Show profile page
  if (currentView === 'profile') {
    return (
      <ProfileView 
        onBack={() => setCurrentView('dashboard')} 
        onEdit={() => setCurrentView('settings')} 
      />
    );
  }

  // Show settings page
  if (currentView === 'settings') {
    return <Settings onBack={() => setCurrentView('dashboard')} />;
  }

  // Get user's name for personalization
  const userName = userState.profile?.name || 'There';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Dumbbell className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FitTracker</h1>
                <p className="text-sm text-gray-600">Welcome back, {userName}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ProfileDropdown onNavigate={handleNavigation} />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4" />
                <span>Add Workout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Welcome Message */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Ready for your next workout?
              </h2>
              <p className="text-gray-600 mt-1">
                {userState.goals?.primaryGoal 
                  ? `Goal: ${userState.goals.primaryGoal.replace('_', ' ')}`
                  : 'Track your fitness journey'
                }
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Weekly Target</p>
              <p className="text-2xl font-bold text-blue-600">
                {userState.goals?.weeklyWorkouts || 3}
              </p>
              <p className="text-sm text-gray-600">workouts</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-xl font-semibold">0 workouts</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-xl font-semibold">0 workouts</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <Dumbbell className="h-6 w-6 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-xl font-semibold">0 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Getting Started</h2>
          </div>
          <div className="p-4">
            <div className="text-center py-8">
              <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No workouts yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start your fitness journey by logging your first workout!
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Log Your First Workout
              </button>
            </div>
          </div>
        </div>

        {/* User Profile Summary (for testing) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 bg-gray-100 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Profile Debug Info:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Name:</strong> {userState.profile?.name}</p>
              <p><strong>Age:</strong> {userState.profile?.age || 'Not set'}</p>
              <p><strong>Height:</strong> {userState.profile?.height || 'Not set'} cm</p>
              <p><strong>Weight:</strong> {userState.profile?.weight || 'Not set'} kg</p>
              <p><strong>Goal:</strong> {userState.goals?.primaryGoal || 'Not set'}</p>
              <p><strong>Units:</strong> {userState.preferences?.units}</p>
              <p><strong>Rest Time:</strong> {userState.preferences?.defaultRestTime}s</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;