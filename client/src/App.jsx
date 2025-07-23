import React, { useState, createContext, useContext, useEffect } from 'react';
import { User, Lock, Heart, UserCheck, Shield, Stethoscope, Activity } from 'lucide-react';
import HealthDashboard from './pages/HealthDashboard';
import DoctorsHealthDashboard from './pages/DoctorDashboard';
import NurseDashboard from './pages/NurseDashboard';
import AdminDashboard from './pages/AdminDashboard';


const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const mockUsers = [
  { id: 1, username: 'patient1', password: 'patient123', role: 'patient', name: 'John Doe' },
  { id: 2, username: 'doctor1', password: 'doctor123', role: 'doctor', name: 'Dr. Smith' },
  { id: 3, username: 'nurse1', password: 'nurse123', role: 'nurse', name: 'Nurse Johnson' },
  { id: 4, username: 'admin1', password: 'admin123', role: 'admin', name: 'Admin Wilson' }
];

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const foundUser = mockUsers.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      const userData = { ...foundUser };
      delete userData.password;
      setUser(userData);
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Login Component
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(username, password);
    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Health Management System</h1>
          <p className="text-gray-600 mt-2">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition duration-200"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</p>
          <div className="text-xs text-gray-600 space-y-1">
            <div>Patient: patient1 / patient123</div>
            <div>Doctor: doctor1 / doctor123</div>
            <div>Nurse: nurse1 / nurse123</div>
            <div>Admin: admin1 / admin123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Role-based Dashboard Router
const DashboardRouter = () => {
  const { user } = useAuth();

  switch (user.role) {
    case 'patient':
      return <HealthDashboard />;
    case 'doctor':
      return <DoctorsHealthDashboard />;
    case 'nurse':
      return <NurseDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <div>Invalid role</div>;
  }
};

// Main App Component
const App = () => {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
};

const AuthenticatedApp = () => {
  const { user } = useAuth();

  return user ? <DashboardRouter /> : <LoginForm />;
};

export default App;