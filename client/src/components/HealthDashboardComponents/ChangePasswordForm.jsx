// src/components/HealthDashboardComponents/ChangePasswordForm.jsx

import React, { useState } from 'react';
import { Lock, Eye, EyeOff, X, Check, AlertTriangle } from 'lucide-react';
import { authAPI } from '../../services/authAPI';

const ChangePasswordForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 6) errors.push('At least 6 characters');
    if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
    if (!/\d/.test(password)) errors.push('One number');
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      setIsSubmitting(false);
      return;
    }

    // Validate password strength
    const passwordErrors = validatePassword(formData.newPassword);
    if (passwordErrors.length > 0) {
      setError(`Password must contain: ${passwordErrors.join(', ')}`);
      setIsSubmitting(false);
      return;
    }

    // Check if new password is different from current
    if (formData.currentPassword === formData.newPassword) {
      setError('New password must be different from current password');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await authAPI.changePassword(formData.currentPassword, formData.newPassword);
      
      if (response.success) {
        setSuccess('Password changed successfully!');
        setTimeout(() => {
          onSuccess && onSuccess();
          onClose && onClose();
        }, 2000);
      } else {
        setError(response.error || 'Failed to change password');
      }
    } catch (err) {
      setError(err.message || 'Network error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordStrength = validatePassword(formData.newPassword);
  const isStrongPassword = passwordStrength.length === 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Change Password
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Status Messages */}
          {error && (
            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}
          
          {success && (
            <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-700 text-sm">{success}</span>
            </div>
          )}

          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPasswords.current ? 'text' : 'password'}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter current password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('current')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.current ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPasswords.new ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formData.newPassword && !isStrongPassword 
                    ? 'border-red-300' 
                    : formData.newPassword && isStrongPassword 
                      ? 'border-green-300' 
                      : 'border-gray-300'
                }`}
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('new')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.new ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            
            {/* Password Requirements */}
            {formData.newPassword && (
              <div className="mt-2 space-y-1">
                <p className="text-xs font-medium text-gray-700">Password Requirements:</p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className={`flex items-center ${formData.newPassword.length >= 6 ? 'text-green-600' : 'text-red-600'}`}>
                    <Check className={`w-3 h-3 mr-1 ${formData.newPassword.length >= 6 ? 'text-green-600' : 'text-gray-400'}`} />
                    6+ characters
                  </div>
                  <div className={`flex items-center ${/[A-Z]/.test(formData.newPassword) ? 'text-green-600' : 'text-red-600'}`}>
                    <Check className={`w-3 h-3 mr-1 ${/[A-Z]/.test(formData.newPassword) ? 'text-green-600' : 'text-gray-400'}`} />
                    Uppercase
                  </div>
                  <div className={`flex items-center ${/[a-z]/.test(formData.newPassword) ? 'text-green-600' : 'text-red-600'}`}>
                    <Check className={`w-3 h-3 mr-1 ${/[a-z]/.test(formData.newPassword) ? 'text-green-600' : 'text-gray-400'}`} />
                    Lowercase
                  </div>
                  <div className={`flex items-center ${/\d/.test(formData.newPassword) ? 'text-green-600' : 'text-red-600'}`}>
                    <Check className={`w-3 h-3 mr-1 ${/\d/.test(formData.newPassword) ? 'text-green-600' : 'text-gray-400'}`} />
                    Number
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formData.confirmPassword && formData.newPassword !== formData.confirmPassword
                    ? 'border-red-300' 
                    : formData.confirmPassword && formData.newPassword === formData.confirmPassword
                      ? 'border-green-300' 
                      : 'border-gray-300'
                }`}
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
              <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                isSubmitting || 
                !formData.currentPassword || 
                !formData.newPassword || 
                !formData.confirmPassword ||
                formData.newPassword !== formData.confirmPassword ||
                !isStrongPassword
              }
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Changing...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
