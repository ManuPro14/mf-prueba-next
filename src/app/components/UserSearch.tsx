'use client';

import React, { useState } from 'react';
import { getUsers } from '../services/users';
import { GitHubUser } from '../types/github';
import { Search, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Carga dinámica del componente Angular
const AngularUserDetail = dynamic<{ user: GitHubUser }>(
  //@ts-ignore
  () => import('angularRemote/UserDetails'),
  { 
    ssr: false,
    loading: () => <div className="text-center p-4">Cargando detalles del usuario...</div>
  }
);

export default function UserSearch() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<GitHubUser | null>(null);
  const router = useRouter();

  const fetchUsers = async () => {
    if (!query.trim()) return;
    const data = await getUsers(query);
    setUsers(data.items || []);
  };

  const handleViewDetails = (user: GitHubUser) => {
    setSelectedUser(user);
  };

  return (
    <div className="p-4 text-gray-800 w-full max-w-3xl mx-auto">
      {/* Buscador*/}
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
        <button 
          onClick={fetchUsers} 
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          <Search size={20} />
        </button>
      </div>

      {/* Lista de usuarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center gap-4">
              <img 
                src={user.avatar_url} 
                alt={user.login} 
                width={200} 
                height={200} 
                className="rounded-full border-4 border-blue-100"
              />
              <h3 className="text-xl font-bold text-center">{user.login}</h3>
              
              <div className="flex gap-4 mt-2">
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-blue-500 transition-colors"
                >
                  Ver en GitHub
                </a>
                <button 
                  onClick={() => handleViewDetails(user)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Eye size={18} /> Detalles (Angular)
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para el componente Angular */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Detalles de {selectedUser.login}</h3>
              <button 
                onClick={() => setSelectedUser(null)} 
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <AngularUserDetail user={selectedUser} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}