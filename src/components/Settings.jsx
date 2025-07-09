import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, User, Target, Settings as SettingsIcon, Save, RotateCcw, AlertCircle, CheckCircle } from 'lucide-react';
import { setProfile, setGoals, setPreferences, resetOnboarding } from '../features/user/userSlice';

const Settings = ({ onBack }) => {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  
  const [activeTab, setActiveTab] = useState('profile');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});
  
  // Form state
  const [formData, setFormData] = useState({
    // Profile
    name: userState.profile?.name || '',
    age: userState.profile?.age || '',
    height: userState.profile?.height || '',
    weight: userState.profile?.weight || '',
    gender: userState.profile?.gender || '',
    activityLevel: userState.profile?.activityLevel || 'lightly_active',
    // Goals
    primaryGoal: userState.goals?.primaryGoal || '',
    targetWeight: userState.goals?.targetWeight || '',
    weeklyWorkouts: userState.goals?.weeklyWorkouts || 3,
    timeframe: userState.goals?.timeframe || '3_months',
    // Preferences
    units: userState.preferences?.units || 'metric',
    defaultRestTime: userState.preferences?.defaultRestTime || 90,
    workoutReminders: userState.preferences?.workoutReminders || true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Profile validation
    if (activeTab === 'profile') {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (formData.age && (formData.age < 13 || formData.age > 120)) {
        newErrors.age = 'Age must be between 13 and 120';
      }
      if (formData.height && (formData.height < 100 || formData.height > 250)) {
        newErrors.height = 'Height must be between 100-250 cm';
      }
      if (formData.weight && (formData.weight < 30 || formData.weight > 300)) {
        newErrors.weight = 'Weight must be between 30-300 kg';
      }
    }

    // Goals validation
    if (activeTab === 'goals') {
      if (formData.targetWeight && (formData.targetWeight < 30 || formData.targetWeight > 300)) {
        newErrors.targetWeight = 'Target weight must be between 30-300 kg';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      setMessage({ type: 'error', text: 'Please fix the errors above' });
      return;
    }

    try {
      if (activeTab === 'profile') {
        dispatch(setProfile({
          name: formData.name,
          age: formData.age || null,
          height: formData.height || null,
          weight: formData.weight || null,
          gender: formData.gender || null,
          activityLevel: formData.activityLevel
        }));
      } else if (activeTab === 'goals') {
        dispatch(setGoals({
          primaryGoal: formData.primaryGoal || null,
          targetWeight: formData.targetWeight || null,
          weeklyWorkouts: formData.weeklyWorkouts,
          timeframe: formData.timeframe
        }));
      } else if (activeTab === 'preferences') {
        dispatch(setPreferences({
          units: formData.units,
          defaultRestTime: formData.defaultRestTime,
          workoutReminders: formData.workoutReminders
        }));
      }

      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings' });
    }
  };

  const handleReset = (type) => {
    const confirmMessage = type === 'all' 
      ? 'This will reset all your data and return you to onboarding. Are you sure?'
      : 'This will reset your goals to default values. Are you sure?';
    
    if (window.confirm(confirmMessage)) {
      if (type === 'all') {
        dispatch(resetOnboarding());
      } else if (type === 'goals') {
        const defaultGoals = {
          primaryGoal: null,
          targetWeight: null,
          weeklyWorkouts: 3,
          timeframe: '3_months'
        };
        dispatch(setGoals(defaultGoals));
        setFormData(prev => ({ ...prev, ...defaultGoals }));
        setMessage({ type: 'success', text: 'Goals reset successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.age ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="30"
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.age}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.height ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="170"
                />
                {errors.height && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.height}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.weight ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="70"
                />
                {errors.weight && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.weight}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
              <select
                value={formData.activityLevel}
                onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sedentary">Sedentary (little/no exercise)</option>
                <option value="lightly_active">Lightly Active (light exercise 1-3 days/week)</option>
                <option value="moderately_active">Moderately Active (moderate exercise 3-5 days/week)</option>
                <option value="very_active">Very Active (hard exercise 6-7 days/week)</option>
                <option value="extremely_active">Extremely Active (very hard exercise, physical job)</option>
              </select>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Goal</label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'lose_weight', label: 'Lose Weight', desc: 'Reduce body weight and body fat' },
                  { value: 'gain_muscle', label: 'Gain Muscle', desc: 'Build strength and muscle mass' },
                  { value: 'general_fitness', label: 'General Fitness', desc: 'Stay healthy and active' }
                ].map((goal) => (
                  <div
                    key={goal.value}
                    onClick={() => handleInputChange('primaryGoal', goal.value)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.primaryGoal === goal.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{goal.label}</div>
                    <div className="text-sm text-gray-600">{goal.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Weight (kg)</label>
                <input
                  type="number"
                  value={formData.targetWeight}
                  onChange={(e) => handleInputChange('targetWeight', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.targetWeight ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="65"
                />
                {errors.targetWeight && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.targetWeight}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weekly Workout Goal</label>
                <select
                  value={formData.weeklyWorkouts}
                  onChange={(e) => handleInputChange('weeklyWorkouts', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map(num => (
                    <option key={num} value={num}>{num} workout{num > 1 ? 's' : ''} per week</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
              <select
                value={formData.timeframe}
                onChange={(e) => handleInputChange('timeframe', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1_month">1 Month</option>
                <option value="3_months">3 Months</option>
                <option value="6_months">6 Months</option>
                <option value="1_year">1 Year</option>
              </select>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-yellow-800">Reset Goals</h4>
                  <p className="text-sm text-yellow-700">Reset all goals to default values</p>
                </div>
                <button
                  onClick={() => handleReset('goals')}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center space-x-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Units</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'metric', label: 'Metric (kg, cm)' },
                  { value: 'imperial', label: 'Imperial (lbs, ft)' }
                ].map((unit) => (
                  <div
                    key={unit.value}
                    onClick={() => handleInputChange('units', unit.value)}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-colors text-center ${
                      formData.units === unit.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {unit.label}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Rest Time: {formData.defaultRestTime} seconds
              </label>
              <input
                type="range"
                min="30"
                max="300"
                step="15"
                value={formData.defaultRestTime}
                onChange={(e) => handleInputChange('defaultRestTime', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>30s</span>
                <span>5min</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <div className="font-medium">Workout Reminders</div>
                <div className="text-sm text-gray-600">Get notified about scheduled workouts</div>
              </div>
              <button
                onClick={() => handleInputChange('workoutReminders', !formData.workoutReminders)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.workoutReminders ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.workoutReminders ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-600">Manage your profile and preferences</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Message Display */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
            message.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              onClick={() => handleReset('all')}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset All Data</span>
            </button>
            
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;