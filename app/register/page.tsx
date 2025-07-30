'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Redirect to login page
      router.push('/login?message=Registration successful! Please sign in.');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen theme-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-4">
          <span className="theme-text font-mono text-sm">root@topguns:~$</span>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold theme-text font-mono">
          [CREATE_ACCOUNT]
        </h2>
        <div className="mt-2 mb-4 text-center">
          <span className="theme-text-tertiary font-mono text-sm">[NEW_USER_REGISTRATION]</span>
        </div>
        <p className="mt-2 text-center text-sm theme-text font-mono">
          Or{' '}
          <Link href="/login" className="font-medium theme-text-secondary hover:theme-text-tertiary transition-colors">
            [SIGN_IN_EXISTING]
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="theme-bg py-8 px-4 border theme-border sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 font-mono text-sm">
                [ERROR]: {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium theme-text font-mono">
                [FULL_NAME]
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border theme-border theme-bg theme-text placeholder-theme-text-tertiary focus:outline-none focus:ring-theme-accent focus:border-theme-accent font-mono"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border theme-border theme-bg theme-text placeholder-theme-text-tertiary focus:outline-none focus:ring-theme-accent focus:border-theme-accent font-mono"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium theme-text font-mono">
                [CONFIRM_PASSWORD]
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? '[CREATING_ACCOUNT...]' : '[CREATE_ACCOUNT]'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 