import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError('');
    setUserData(null);

    try {
      const data = await fetchUserData(searchTerm.trim());
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">GitHub User Search</h1>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter GitHub username..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* User Data Display */}
      {userData && !isLoading && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-4">
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {userData.name || userData.login}
              </h2>
              <p className="text-gray-600">@{userData.login}</p>
              {userData.bio && (
                <p className="text-gray-700 mt-2">{userData.bio}</p>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
            {userData.location && (
              <div>
                <span className="font-medium">Location:</span> {userData.location}
              </div>
            )}
            <div>
              <span className="font-medium">Public Repos:</span> {userData.public_repos}
            </div>
            <div>
              <span className="font-medium">Followers:</span> {userData.followers}
            </div>
            <div>
              <span className="font-medium">Following:</span> {userData.following}
            </div>
          </div>

          <div className="mt-4">
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;