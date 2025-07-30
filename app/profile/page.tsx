'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [updateLoading, setUpdateLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setEditForm({ name: parsedUser.name, email: parsedUser.email });
    setLoading(false);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }      // Update local storage and state
      if (user?._id) {
        const updatedUser: User = { 
          _id: user._id,
          name: editForm.name,
          email: editForm.email,
          createdAt: user.createdAt
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setUpdateLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen theme-bg flex items-center justify-center pt-20">
        <div className="theme-text font-mono">[LOADING_PROFILE...]</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen theme-bg flex items-center justify-center pt-20">
        <div className="theme-text font-mono">[USER_NOT_FOUND]</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen theme-bg pt-20 pb-12 relative">
      {/* Blurred background image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/gif2.gif)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          filter: 'blur(3px)'
        }}
      ></div>
      
      {/* Dark overlay to maintain readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold theme-text font-mono">
                [USER_PROFILE]
              </h1>
              <p className="mt-2 theme-text-tertiary font-mono text-sm">
                [ACCOUNT_MANAGEMENT_SYSTEM]
              </p>
            </div>
            <Link
              href="/"
              className="theme-text-secondary hover:theme-text font-mono text-sm transition-colors"
            >
              ← [BACK_TO_HOME]
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="theme-bg/80 backdrop-blur-md border theme-border/50 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold theme-text font-mono">
                  [PROFILE_INFORMATION]
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 border theme-border theme-text hover:theme-text-secondary font-mono text-sm transition-colors"
                  >
                    [EDIT]
                  </button>
                )}
              </div>

              {error && (
                <div className="mb-6 bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 font-mono text-sm">
                  [ERROR]: {error}
                </div>
              )}

              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium theme-text font-mono mb-2">
                      [NAME]
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 border theme-border theme-bg theme-text font-mono focus:outline-none focus:ring-theme-accent focus:border-theme-accent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium theme-text font-mono mb-2">
                      [EMAIL]
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-3 py-2 border theme-border theme-bg theme-text font-mono focus:outline-none focus:ring-theme-accent focus:border-theme-accent"
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={updateLoading}
                      className="px-6 py-2 theme-accent hover:theme-hover text-theme-hover-text border theme-border font-mono font-bold transition-all duration-200 disabled:opacity-50"
                    >
                      {updateLoading ? '[UPDATING...]' : '[SAVE_CHANGES]'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setEditForm({ name: user.name, email: user.email });
                        setError('');
                      }}
                      className="px-6 py-2 border theme-border theme-text hover:theme-text-secondary font-mono transition-colors"
                    >
                      [CANCEL]
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium theme-text-tertiary font-mono mb-1">
                      [NAME]
                    </label>
                    <p className="theme-text font-mono text-lg">{user.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium theme-text-tertiary font-mono mb-1">
                      [EMAIL]
                    </label>
                    <p className="theme-text font-mono text-lg">{user.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium theme-text-tertiary font-mono mb-1">
                      [MEMBER_SINCE]
                    </label>
                    <p className="theme-text font-mono text-lg">
                      {user.createdAt ? formatDate(user.createdAt) : 'Unknown'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium theme-text-tertiary font-mono mb-1">
                      [USER_ID]
                    </label>
                    <p className="theme-text-tertiary font-mono text-sm font-mono break-all">
                      {user._id}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="theme-bg/80 backdrop-blur-md border theme-border/50 p-6 shadow-lg">
              <h3 className="text-lg font-bold theme-text font-mono mb-4">
                [QUICK_ACTIONS]
              </h3>
              <div className="space-y-3">
                <Link
                  href="/products"
                  className="block w-full px-4 py-2 border theme-border theme-text hover:theme-text-secondary font-mono text-center transition-colors"
                >
                  [BROWSE_FIREARMS]
                </Link>
                <Link
                  href="/cart"
                  className="block w-full px-4 py-2 border theme-border theme-text hover:theme-text-secondary font-mono text-center transition-colors"
                >
                  [VIEW_CART]
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    router.push('/');
                  }}
                  className="w-full px-4 py-2 bg-red-900/50 border border-red-500 text-red-300 hover:bg-red-900/70 font-mono transition-colors"
                >
                  [LOGOUT]
                </button>
              </div>
            </div>            <div className="theme-bg/80 backdrop-blur-md border theme-border/50 p-6 shadow-lg">
              <h3 className="text-lg font-bold theme-text font-mono mb-4">
                [ACCOUNT_STATUS]
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="theme-text-tertiary font-mono text-sm">[STATUS]</span>
                  <span className="theme-text-secondary font-mono text-sm">[ACTIVE]</span>
                </div>
                <div className="flex justify-between">
                  <span className="theme-text-tertiary font-mono text-sm">[TYPE]</span>
                  <span className="theme-text-secondary font-mono text-sm">[STANDARD]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
