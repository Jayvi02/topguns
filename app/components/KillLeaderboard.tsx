'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface LeaderboardUser {
  _id: string;
  name: string;
  killStats: {
    totalKills: number;
    missionType: string;
    yearsActive: number;
    location: string;
    rank: string;
    preferredWeapons: Array<{
      weaponName: string;
      kills: number;
      weaponType: string;
    }>;
  };
}

export default function KillLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/auth/kill-stats');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch leaderboard');
      }

      setLeaderboard(data.leaderboard || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return `#${index + 1}`;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'text-yellow-400';
      case 1:
        return 'text-gray-300';
      case 2:
        return 'text-yellow-600';
      default:
        return 'theme-text-secondary';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="theme-text text-center font-mono">[LOADING_KILL_LEADERBOARD...]</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-red-400 text-center font-mono">[ERROR]: {error}</div>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold theme-text text-center mb-8 font-mono">
          [KILL_LEADERBOARD]
        </h2>
        <div className="text-center py-8">
          <div className="theme-text-tertiary font-mono mb-4">
            [NO_PUBLIC_KILL_STATISTICS_AVAILABLE]
          </div>
          <p className="theme-text-tertiary font-mono text-sm">
            Be the first to share your kill count on the leaderboard!
          </p>
          <Link
            href="/profile"
            className="inline-block mt-4 px-6 py-2 border theme-border theme-text hover:theme-text-secondary font-mono transition-colors"
          >
            [ADD_YOUR_STATS]
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold theme-text text-center mb-8 font-mono">
        [KILL_LEADERBOARD]
      </h2>
      <div className="theme-text-tertiary text-center mb-6 font-mono text-sm">
        [TOP_OPERATORS_BY_CONFIRMED_KILLS]
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaderboard.slice(0, 9).map((user, index) => (
          <div 
            key={user._id} 
            className={`theme-bg/90 backdrop-blur-md border p-6 font-mono relative overflow-hidden transition-all duration-300 hover:scale-105 ${
              index === 0 ? 'border-yellow-400 shadow-lg shadow-yellow-400/25' : 
              index === 1 ? 'border-gray-300 shadow-lg shadow-gray-300/25' :
              index === 2 ? 'border-yellow-600 shadow-lg shadow-yellow-600/25' :
              'theme-border hover:theme-border-secondary'
            }`}
          >
            {/* Background pattern for top 3 */}
            {index < 3 && (
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    ${index === 0 ? '#fbbf24' : index === 1 ? '#d1d5db' : '#d97706'} 10px,
                    ${index === 0 ? '#fbbf24' : index === 1 ? '#d1d5db' : '#d97706'} 20px
                  )`
                }}></div>
              </div>
            )}

            {/* Rank Badge */}
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`text-2xl font-bold ${getRankColor(index)}`}>
                {getRankIcon(index)}
              </div>
              <div className="text-right">
                <div className="theme-text-tertiary text-xs">[MISSION_TYPE]</div>
                <div className="theme-text text-sm">{user.killStats.missionType}</div>
              </div>
            </div>

            {/* Operator Info */}
            <div className="relative z-10">
              <div className="mb-3">
                <div className="theme-text font-bold text-lg break-words">
                  [{user.name}]
                </div>
                {user.killStats.rank && (
                  <div className="theme-text-secondary text-sm">
                    {user.killStats.rank}
                  </div>
                )}
              </div>

              {/* Kill Count - Main Feature */}
              <div className="text-center mb-4 p-3 border theme-border bg-black/30">
                <div className={`text-3xl font-bold ${getRankColor(index)}`}>
                  {user.killStats.totalKills.toLocaleString()}
                </div>
                <div className="theme-text-tertiary text-sm">[CONFIRMED_KILLS]</div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div>
                  <span className="theme-text-tertiary">[YEARS_ACTIVE]:</span>
                  <div className="theme-text font-bold">{user.killStats.yearsActive}</div>
                </div>
                {user.killStats.location && (
                  <div>
                    <span className="theme-text-tertiary">[LOCATION]:</span>
                    <div className="theme-text font-bold text-xs break-words">{user.killStats.location}</div>
                  </div>
                )}
              </div>

              {/* Preferred Weapon */}
              {user.killStats.preferredWeapons && user.killStats.preferredWeapons.length > 0 && (
                <div className="border-t theme-border pt-3">
                  <div className="theme-text-tertiary text-xs mb-1">[PRIMARY_WEAPON]:</div>
                  <div className="theme-text text-sm font-bold">
                    {user.killStats.preferredWeapons[0].weaponName}
                  </div>
                  <div className="theme-text-secondary text-xs">
                    {user.killStats.preferredWeapons[0].kills} kills ({user.killStats.preferredWeapons[0].weaponType})
                  </div>
                </div>
              )}

              {/* Special styling for top 3 */}
              {index < 3 && (
                <div className="absolute top-2 right-2 opacity-30">
                  <div className={`w-8 h-8 rounded-full border-2 ${
                    index === 0 ? 'border-yellow-400' : 
                    index === 1 ? 'border-gray-300' : 
                    'border-yellow-600'
                  }`}>
                    <div className={`w-full h-full rounded-full ${
                      index === 0 ? 'bg-yellow-400' : 
                      index === 1 ? 'bg-gray-300' : 
                      'bg-yellow-600'
                    } opacity-20`}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {leaderboard.length > 9 && (
        <div className="text-center mt-8">
          <div className="theme-text-tertiary font-mono text-sm">
            ...and {leaderboard.length - 9} more operators
          </div>
        </div>
      )}

      <div className="text-center mt-8">
        <Link
          href="/profile"
          className="inline-block px-6 py-3 border theme-border theme-text hover:theme-text-secondary font-mono transition-colors hover:scale-105 transform"
        >
          [JOIN_THE_LEADERBOARD]
        </Link>
      </div>

      <div className="text-center mt-4 text-xs theme-text-tertiary font-mono">
        * Only public profiles with verified kill counts are displayed
      </div>
    </div>
  );
}
