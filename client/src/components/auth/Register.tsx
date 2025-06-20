import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error, user } = useAuth();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    if (form.password !== form.confirmPassword) {
      return;
    }
    await register(form.username, form.email, form.password);
    if (user) {
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required minLength={6} className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
        </div>
        {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
        {success && <div className="text-green-600 text-sm font-medium">{success}</div>}
        <button type="submit" disabled={loading} className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 mt-2">
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className="text-sm text-gray-500 mt-2 text-center">
          Already have an account?{' '}
          <span className="text-primary cursor-pointer" onClick={() => navigate('/login')}>Login</span>
        </div>
      </form>
    </div>
  );
};

export default Register; 