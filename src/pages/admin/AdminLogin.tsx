import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Film, Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setError('An unexpected login error occurred.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#6B6861] hover:text-[#121212] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return To Public Website</span>
        </Link>

        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#121212] rounded-none flex items-center justify-center text-white shadow-xs">
            <Film className="w-5 h-5 text-[#B69A65]" />
          </div>
          <span className="font-cinematic text-xl font-bold tracking-widest text-[#121212]">
            KAVIN PRODUCTION
          </span>
        </div>

        <h2 className="text-center font-editorial text-3xl font-semibold text-[#121212]">
          Content Management Portal
        </h2>
        <p className="mt-1 text-center text-xs text-[#6B6861]">
          Authorized production executives and studio editors only
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 border border-[#E8E6E0] shadow-sm">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#121212] mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6B6861] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@kavinproduction.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF9F5] border border-[#E8E6E0] focus:outline-hidden focus:border-[#B69A65] text-[#121212] placeholder:text-[#A09D94] rounded-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#121212] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6B6861] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FAF9F5] border border-[#E8E6E0] focus:outline-hidden focus:border-[#B69A65] text-[#121212] placeholder:text-[#A09D94] rounded-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 bg-[#121212] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors disabled:opacity-50 cursor-pointer shadow-xs mt-2 rounded-none"
            >
              {isLoggingIn ? 'Authenticating...' : 'Enter Admin CMS'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
