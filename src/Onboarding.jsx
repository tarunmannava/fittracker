import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ChevronRight, ChevronLeft, User, Target, Settings, CheckCircle } from 'lucide-react';
import { setProfile, setGoals, setPreferences, completeOnboarding } from './features/user/userSlice';

const Onboarding = () => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Profile
    name: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    activityLevel: 'lightly_active',
    // Goals
    primaryGoal: '',
    targetWeight: '',
    weeklyWorkouts: 3,
    timeframe: '3_months',
    // Preferences
    units: 'metric',
    defaultRestTime: 90,
    workoutReminders: true
  });

  const steps = [
    { title: 'Welcome', icon: User, description: 'Let\'s get to know you' },
    { title: 'About You', icon: User, description: 'Basic information' },
    { title: 'Your Goals', icon: Target, description: 'What do you want to achieve?' },
    { title: 'Preferences', icon: Settings, description: 'Customize your experience' },
    { title: 'Complete', icon: CheckCircle, description: 'You\'re all set!' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep === 0 && !formData.name.trim()) {
      alert('Please enter your name to continue');
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Dispatch data to Redux
    dispatch(setProfile({
      name: formData.name,
      age: formData.age || null,
      height: formData.height || null,
      weight: formData.weight || null,
      gender: formData.gender || null,
      activityLevel: formData.activityLevel
    }));

    dispatch(setGoals({
      primaryGoal: formData.primaryGoal || null,
      targetWeight: formData.targetWeight || null,
      weeklyWorkouts: formData.weeklyWorkouts,
      timeframe: formData.timeframe
    }));

    dispatch(setPreferences({
      units: formData.units,
      defaultRestTime: formData.defaultRestTime,
      workoutReminders: formData.workoutReminders
    }));

    dispatch(completeOnboarding());
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Welcome to FitTracker!</h2>
              <p className="text-gray-600">Let's set up your profile to personalize your fitness journey.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's your name? <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Tell us about yourself</h2>
              <p className="text-gray-600">This helps us provide better recommendations (all optional)</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="30"
                />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="170"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="70"
                />
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

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">What are your goals?</h2>
              <p className="text-gray-600">This helps us tailor your experience</p>
            </div>
            <div className="space-y-4">
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
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Preferences</h2>
              <p className="text-gray-600">Customize your app experience</p>
            </div>
            <div className="space-y-4">
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
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">You're all set, {formData.name}!</h2>
              <p className="text-gray-600">
                Welcome to FitTracker. Your personalized fitness journey starts now!
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-gray-900">Your Profile Summary:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Goal:</strong> {formData.primaryGoal?.replace('_', ' ')?.toUpperCase() || 'Not specified'}</p>
                <p><strong>Weekly Target:</strong> {formData.weeklyWorkouts} workouts</p>
                <p><strong>Rest Time:</strong> {formData.defaultRestTime}s between sets</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      index <= currentStep
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-xs mt-2 text-center">
                    <div className={index <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-400'}>
                      {step.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleComplete}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <span>Get Started</span>
              <CheckCircle className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;