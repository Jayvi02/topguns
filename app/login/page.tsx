'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to home page
      router.push('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };  return (
    <div className="min-h-screen theme-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">      {/* Blurred background image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/cat.gif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          filter: 'blur(5px)'
        }}
      ></div>
      
      {/* Dark overlay to maintain readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-20">
        <div className="text-center mb-4">
          <span className="theme-text font-mono text-sm">root@topguns:~$</span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold theme-text font-mono">
          [LOGIN_SYSTEM]
        </h2>
        <div className="mt-2 mb-4 text-center">
          <span className="theme-text-tertiary font-mono text-sm">[AUTHENTICATION_REQUIRED]</span>
        </div>
        <p className="mt-2 text-center text-sm theme-text font-mono">
          Or{' '}
          <Link href="/register" className="font-medium theme-text-secondary hover:theme-text-tertiary transition-colors">
            [CREATE_NEW_ACCOUNT]
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-20">
        <div className="theme-bg py-8 px-4 border theme-border sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 font-mono text-sm">
                [ERROR]: {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium theme-text font-mono">
                [EMAIL_ADDRESS]
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border theme-border theme-bg theme-text placeholder-theme-text-tertiary focus:outline-none focus:ring-theme-accent focus:border-theme-accent font-mono"
                  placeholder="user@domain.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium theme-text font-mono">
                [PASSWORD]
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border theme-border theme-bg theme-text placeholder-theme-text-tertiary focus:outline-none focus:ring-theme-accent focus:border-theme-accent font-mono"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border theme-border text-sm font-medium theme-text theme-bg hover:theme-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-accent disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed transition-all duration-200 font-mono font-bold"
              >
                {loading ? '[AUTHENTICATING...]' : '[SIGN_IN]'}
              </button>
            </div>
          </form>        </div>
      </div>
    </div>
  );
} 