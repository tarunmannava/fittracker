import React from 'react';
import { useSelector } from 'react-redux';
import { Dumbbell, Plus, TrendingUp, Calendar } from 'lucide-react';

function App() {
  const userState = useSelector(state => state.user);
  const workoutsState = useSelector(state => state.workouts);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Dumbbell className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">FitTracker</h1>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Workout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-xl font-semibold">3 workouts</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-xl font-semibold">24 workouts</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <Dumbbell className="h-6 w-6 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-xl font-semibold">5 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Workouts */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Recent Workouts</h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Upper Body Strength</p>
                  <p className="text-sm text-gray-600">45 minutes • Yesterday</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">Completed</p>
                  <p className="text-sm text-gray-600">285 calories</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Morning Cardio</p>
                  <p className="text-sm text-gray-600">30 minutes • 2 days ago</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">Completed</p>
                  <p className="text-sm text-gray-600">320 calories</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Leg Day</p>
                  <p className="text-sm text-gray-600">50 minutes • 3 days ago</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">Completed</p>
                  <p className="text-sm text-gray-600">400 calories</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;