import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { User, Settings, LogOut, ChevronDown } from 'lucide-react';

const ProfileDropdown = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const userState = useSelector(state => state.user);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate initials from user name
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleMenuClick = (action) => {
    setIsOpen(false);
    onNavigate(action);
  };

  const userName = userState.profile?.name || 'User';
  const initials = getInitials(userName);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {/* Profile Picture (Initials) */}
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                {initials}
              </div>
              <div>
                <p className="font-medium text-gray-900">{userName}</p>
                <p className="text-sm text-gray-600">
                  {userState.goals?.primaryGoal?.replace('_', ' ') || 'No goal set'}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <button
              onClick={() => handleMenuClick('profile')}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
            >
              <User className="h-4 w-4" />
              <span>View Profile</span>
            </button>
            
            <button
              onClick={() => handleMenuClick('settings')}
              className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-3"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-1"></div>

          {/* Additional Actions */}
          <div className="py-1">
            <button
              onClick={() => handleMenuClick('reset')}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center space-x-3"
            >
              <LogOut className="h-4 w-4" />
              <span>Reset App</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;