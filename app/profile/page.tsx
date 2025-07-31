'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
  killStats?: {
    totalKills: number;
    preferredWeapons: Array<{
      weaponName: string;
      kills: number;
      weaponType: string;
    }>;
    missionType: string;
    yearsActive: number;
    location: string;
    rank: string;
    achievements: string[];
    isPublic: boolean;
  };
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isEditingKillStats, setIsEditingKillStats] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [killStatsForm, setKillStatsForm] = useState({
    totalKills: 0,
    missionType: 'Other',
    yearsActive: 0,
    location: '',
    rank: '',
    isPublic: false,
    achievements: [] as string[],
    preferredWeapons: [{ weaponName: '', kills: 0, weaponType: 'handgun' }]
  });
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
    
    // Initialize kill stats form
    if (parsedUser.killStats) {
      setKillStatsForm({
        totalKills: parsedUser.killStats.totalKills || 0,
        missionType: parsedUser.killStats.missionType || 'Other',
        yearsActive: parsedUser.killStats.yearsActive || 0,
        location: parsedUser.killStats.location || '',
        rank: parsedUser.killStats.rank || '',
        isPublic: parsedUser.killStats.isPublic || false,
        achievements: parsedUser.killStats.achievements || [],
        preferredWeapons: parsedUser.killStats.preferredWeapons || [{ weaponName: '', kills: 0, weaponType: 'handgun' }]
      });
    }
    
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
      }

      // Update local storage and state
      if (user?._id) {
        const updatedUser: User = { 
          ...user,
          name: editForm.name,
          email: editForm.email,
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

  const handleUpdateKillStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/kill-stats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(killStatsForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update kill stats');
      }

      // Update local storage and state
      if (user?._id) {
        const updatedUser: User = { 
          ...user,
          killStats: killStatsForm
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditingKillStats(false);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update kill stats');
    } finally {
      setUpdateLoading(false);
    }
  };

  const addWeapon = () => {
    setKillStatsForm({
      ...killStatsForm,
      preferredWeapons: [...killStatsForm.preferredWeapons, { weaponName: '', kills: 0, weaponType: 'handgun' }]
    });
  };

  const removeWeapon = (index: number) => {
    const weapons = killStatsForm.preferredWeapons.filter((_, i) => i !== index);
    setKillStatsForm({
      ...killStatsForm,
      preferredWeapons: weapons
    });
  };

  const updateWeapon = (index: number, field: string, value: string | number) => {
    const weapons = [...killStatsForm.preferredWeapons];
    weapons[index] = { ...weapons[index], [field]: value };
    setKillStatsForm({
      ...killStatsForm,
      preferredWeapons: weapons
    });
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
      
      <div className="flex relative z-20">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-30 p-2 theme-accent hover:theme-hover text-theme-hover-text border theme-border font-mono transition-all duration-200"
        >
          {sidebarOpen ? '[CLOSE]' : '[MENU]'}
        </button>

        {/* Sidebar Navigation */}
        <div className={`w-64 h-screen bg-black/90 backdrop-blur-md border-r theme-border/50 fixed left-0 top-0 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } z-20 cursor-bullet`}>
          {/* Sidebar Header - Account for navigation bar height */}
          
          
          <div className="flex-1 p-6 overflow-y-auto">
            <nav className="space-y-4">
              <Link
                href="/products"
                className="flex items-center px-4 py-3 border theme-border theme-text hover:theme-text-secondary hover:bg-gray-800/50 font-mono transition-all duration-200 group cursor-bullet"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="mr-3 group-hover:text-red-400">🔫</span>
                [BROWSE_FIREARMS]
              </Link>
              
              <Link
                href="/cart"
                className="flex items-center px-4 py-3 border theme-border theme-text hover:theme-text-secondary hover:bg-gray-800/50 font-mono transition-all duration-200 group cursor-bullet"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="mr-3 group-hover:text-yellow-400">🛒</span>
                [VIEW_CART]
              </Link>
              
              <Link
                href="/"
                className="flex items-center px-4 py-3 border theme-border theme-text hover:theme-text-secondary hover:bg-gray-800/50 font-mono transition-all duration-200 group cursor-bullet"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="mr-3 group-hover:text-blue-400">🏠</span>
                [HOME]
              </Link>

              {user?.killStats?.isPublic && (
                <Link
                  href="/#leaderboard"
                  className="flex items-center px-4 py-3 border theme-border theme-text hover:theme-text-secondary hover:bg-gray-800/50 font-mono transition-all duration-200 group cursor-bullet"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3 group-hover:text-green-400">🏆</span>
                  [LEADERBOARD]
                </Link>
              )}
            </nav>
          </div>
          
          {/* Logout Button at Bottom */}
          <div className="p-6 border-t theme-border/50">
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/');
              }}
              className="flex items-center w-full px-4 py-3 bg-red-900/50 border border-red-500 text-red-300 hover:bg-red-900/70 font-mono transition-all duration-200 group cursor-bullet"
            >
              <span className="mr-3 group-hover:scale-110 transition-transform">⚠️</span>
              [LOGOUT]
            </button>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-15"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64 px-4 sm:px-6 lg:px-8 pt-16 lg:pt-4 pb-8">
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

        <div className="grid grid-cols-1 gap-8">
          {/* Profile Information */}
          <div>
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
                    <p className="theme-text-tertiary font-mono text-sm break-all">
                      {user._id}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Kill Statistics */}
          <div>
            <div className="theme-bg/80 backdrop-blur-md border theme-border/50 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold theme-text font-mono">
                  [KILL_STATISTICS]
                </h2>
                {!isEditingKillStats && (
                  <button
                    onClick={() => setIsEditingKillStats(true)}
                    className="px-4 py-2 border theme-border theme-text hover:theme-text-secondary font-mono text-sm transition-colors"
                  >
                    [EDIT]
                  </button>
                )}
              </div>

              {isEditingKillStats ? (
                <form onSubmit={handleUpdateKillStats} className="space-y-6">
                  <div>
                    <label htmlFor="totalKills" className="block text-sm font-medium theme-text font-mono mb-2">
                      [TOTAL_KILLS]
                    </label>
                    <input
                      type="number"
                      id="totalKills"
                      value={killStatsForm.totalKills}
                      onChange={(e) => setKillStatsForm({ ...killStatsForm, totalKills: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border theme-border theme-bg theme-text font-mono focus:outline-none focus:ring-theme-accent focus:border-theme-accent"
                      min="0"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="missionType" className="block text-sm font-medium theme-text font-mono mb-2">
                        [MISSION_TYPE]
                      </label>
                      <select
                        id="missionType"
                        value={killStatsForm.missionType}
                        onChange={(e) => setKillStatsForm({ ...killStatsForm, missionType: e.target.value })}
                        className="w-full px-3 py-2 border theme-border theme-bg theme-text font-mono focus:outline-none focus:ring-theme-accent focus:border-theme-accent"
                      >
                        <option value="Infiltration">Infiltration</option>
                        <option value="Reconnaissance">Reconnaissance</option>
                        <option value="Assault">Assault</option>
                        <option value="Demolition">Demolition</option>
                        <option value="VIP Elimination">VIP Elimination</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="yearsActive" className="block text-sm font-medium theme-text font-mono mb-2">
                        [YEARS_ACTIVE]
                      </label>
                      <input
                        type="number"
                        id="yearsActive"
                        value={killStatsForm.yearsActive}
                        onChange={(e) => setKillStatsForm({ ...killStatsForm, yearsActive: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border theme-border theme-bg theme-text font-mono focus:outline-none focus:ring-theme-accent focus:border-theme-accent"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium theme-text font-mono mb-2">
                        [LOCATION]
                      </label>
                      <input
                        type="text"
                        id="location"
                        value={killStatsForm.location}
                        onChange={(e) => setKillStatsForm({ ...killStatsForm, location: e.target.value })}
                        className="w-full px-3 py-2 border theme-border theme-bg theme-text font-mono focus:outline-none focus:ring-theme-accent focus:border-theme-accent"
                        placeholder="e.g., Eastern Europe"
                      />
                    </div>

                    <div>
                      <label htmlFor="rank" className="block text-sm font-medium theme-text font-mono mb-2">
                        [RANK]
                      </label>
                      <input
                        type="text"
                        id="rank"
                        value={killStatsForm.rank}
                        onChange={(e) => setKillStatsForm({ ...killStatsForm, rank: e.target.value })}
                        className="w-full px-3 py-2 border theme-border theme-bg theme-text font-mono focus:outline-none focus:ring-theme-accent focus:border-theme-accent"
                        placeholder="e.g., Lieutenant, Agent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium theme-text font-mono mb-2">
                      [PREFERRED_WEAPONS]
                    </label>
                    <div className="space-y-3">
                      {killStatsForm.preferredWeapons.map((weapon, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 items-end">
                          <div className="col-span-4">
                            <input
                              type="text"
                              value={weapon.weaponName}
                              onChange={(e) => updateWeapon(index, 'weaponName', e.target.value)}
                              className="w-full px-3 py-2 border theme-border theme-bg theme-text font-mono focus:outline-none focus:ring-theme-accent focus:border-theme-accent text-sm"
                              placeholder="Weapon name"
                            />
                          </div>
                          <div className="col-span-3">
                            <select
                              value={weapon.weaponType}
                              onChange={(e) => updateWeapon(index, 'weaponType', e.target.value)}
                              className="w-full px-3 py-2 border theme-border theme-bg theme-text font-mono focus:outline-none focus:ring-theme-accent focus:border-theme-accent text-sm"
                            >
                              <option value="handgun">Handgun</option>
                              <option value="rifle">Rifle</option>
                              <option value="sniper_rifle">Sniper Rifle</option>
                              <option value="submachine_gun">SMG</option>
                              <option value="shotgun">Shotgun</option>
                              <option value="explosive">Explosive</option>
                              <option value="melee">Melee</option>
                            </select>
                          </div>
                          <div className="col-span-3">
                            <input
                              type="number"
                              value={weapon.kills}
                              onChange={(e) => updateWeapon(index, 'kills', parseInt(e.target.value) || 0)}
                              className="w-full px-3 py-2 border theme-border theme-bg theme-text font-mono focus:outline-none focus:ring-theme-accent focus:border-theme-accent text-sm"
                              placeholder="Kills"
                              min="0"
                            />
                          </div>
                          <div className="col-span-2">
                            {killStatsForm.preferredWeapons.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeWeapon(index)}
                                className="w-full px-2 py-2 bg-red-900/50 border border-red-500 text-red-300 hover:bg-red-900/70 font-mono text-sm transition-colors"
                              >
                                [X]
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addWeapon}
                        className="px-4 py-2 border theme-border theme-text hover:theme-text-secondary font-mono text-sm transition-colors"
                      >
                        [ADD_WEAPON]
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={killStatsForm.isPublic}
                        onChange={(e) => setKillStatsForm({ ...killStatsForm, isPublic: e.target.checked })}
                        className="w-4 h-4 theme-accent focus:ring-theme-accent focus:ring-2"
                      />
                      <span className="text-sm font-medium theme-text font-mono">
                        [DISPLAY_ON_PUBLIC_LEADERBOARD]
                      </span>
                    </label>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={updateLoading}
                      className="px-6 py-2 theme-accent hover:theme-hover text-theme-hover-text border theme-border font-mono font-bold transition-all duration-200 disabled:opacity-50"
                    >
                      {updateLoading ? '[UPDATING...]' : '[SAVE_STATS]'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingKillStats(false);
                        setError('');
                        // Reset form to user data
                        if (user?.killStats) {
                          setKillStatsForm({
                            totalKills: user.killStats.totalKills || 0,
                            missionType: user.killStats.missionType || 'Other',
                            yearsActive: user.killStats.yearsActive || 0,
                            location: user.killStats.location || '',
                            rank: user.killStats.rank || '',
                            isPublic: user.killStats.isPublic || false,
                            achievements: user.killStats.achievements || [],
                            preferredWeapons: user.killStats.preferredWeapons || [{ weaponName: '', kills: 0, weaponType: 'handgun' }]
                          });
                        }
                      }}
                      className="px-6 py-2 border theme-border theme-text hover:theme-text-secondary font-mono transition-colors"
                    >
                      [CANCEL]
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  {user?.killStats ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium theme-text-tertiary font-mono mb-1">
                            [TOTAL_KILLS]
                          </label>
                          <p className="theme-text font-mono text-2xl font-bold text-red-400">
                            {user.killStats.totalKills}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium theme-text-tertiary font-mono mb-1">
                            [MISSION_TYPE]
                          </label>
                          <p className="theme-text font-mono">{user.killStats.missionType}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium theme-text-tertiary font-mono mb-1">
                            [YEARS_ACTIVE]
                          </label>
                          <p className="theme-text font-mono">{user.killStats.yearsActive}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium theme-text-tertiary font-mono mb-1">
                            [RANK]
                          </label>
                          <p className="theme-text font-mono">{user.killStats.rank || 'Not specified'}</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium theme-text-tertiary font-mono mb-1">
                          [LOCATION]
                        </label>
                        <p className="theme-text font-mono">{user.killStats.location || 'Not specified'}</p>
                      </div>

                      {user.killStats.preferredWeapons && user.killStats.preferredWeapons.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium theme-text-tertiary font-mono mb-3">
                            [PREFERRED_WEAPONS]
                          </label>
                          <div className="space-y-2">
                            {user.killStats.preferredWeapons
                              .filter(weapon => weapon.weaponName)
                              .map((weapon, index) => (
                              <div key={index} className="flex justify-between items-center bg-gray-800/50 px-3 py-2 border theme-border/30">
                                <div>
                                  <span className="theme-text font-mono">{weapon.weaponName}</span>
                                  <span className="theme-text-tertiary font-mono text-sm ml-2">
                                    ({weapon.weaponType.replace('_', ' ')})
                                  </span>
                                </div>
                                <span className="theme-text-secondary font-mono font-bold">
                                  {weapon.kills} kills
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium theme-text-tertiary font-mono mb-1">
                          [LEADERBOARD_STATUS]
                        </label>
                        <p className="theme-text font-mono">
                          {user.killStats.isPublic ? 
                            <span className="text-green-400">[PUBLIC] - Visible on leaderboard</span> : 
                            <span className="text-yellow-400">[PRIVATE] - Hidden from leaderboard</span>
                          }
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="theme-text-tertiary font-mono mb-4">
                        [NO_KILL_STATISTICS_RECORDED]
                      </p>
                      <button
                        onClick={() => setIsEditingKillStats(true)}
                        className="px-6 py-2 theme-accent hover:theme-hover text-theme-hover-text border theme-border font-mono font-bold transition-all duration-200"
                      >
                        [ADD_KILL_STATS]
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8">
          {/* Account Status */}
          <div>
            <div className="theme-bg/80 backdrop-blur-md border theme-border/50 p-6 shadow-lg">
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
                {user?.killStats && (
                  <div className="flex justify-between">
                    <span className="theme-text-tertiary font-mono text-sm">[OPERATOR_LEVEL]</span>
                    <span className="theme-text-secondary font-mono text-sm">
                      {user.killStats.totalKills > 100 ? '[ELITE]' : 
                       user.killStats.totalKills > 50 ? '[VETERAN]' : 
                       user.killStats.totalKills > 10 ? '[EXPERIENCED]' : '[ROOKIE]'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
