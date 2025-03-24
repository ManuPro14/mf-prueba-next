'use client';

import React, { useState } from 'react';
import { getUsers } from '../services/users';
import { GitHubUser } from '../types/github';
import { Search, Eye } from 'lucide-react';

export default function UserSearch() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<GitHubUser[]>([]);

  const fetchUsers = async () => {
    if (!query.trim()) return;
    const data = await getUsers(query);
    setUsers(data.items || []);
  };

  return (
    <div className="p-4 text-gray-800 w-full max-w-3xl">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') fetchUsers();
          }}
          placeholder="Escribe un nombre de usuario"
          className="border border-gray-400 px-4 py-2 rounded-full w-full text-xl"
        />
        <button onClick={fetchUsers} className="bg-blue-500 text-white px-4 py-2 rounded-full">
          <Search size={20} />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 mt-8">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col items-center gap-10">
            <img src={user.avatar_url} alt={user.login} width={400} height={400} className="rounded-lg shadow-2xl transition-discrete " />
            <div className='flex flex-col items-center gap-2'>
              <p className="m-0 text-2xl font-bold">{user.login}</p>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold transition hover:scale-130">
                <Eye size={30} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}