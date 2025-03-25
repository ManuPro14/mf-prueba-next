'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import ts from 'typescript';

const AngularUserDetail = dynamic(
  //@ts-ignore
  () => import('angularRemote/UserDetails'),
  { 
    ssr: false,
    loading: () => <p className="text-center p-4">Cargando componente Angular...</p>
  }
);

export default function AngularUserPage() {
  const router = useRouter();
  
  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-200 rounded-lg"
      >
        ← Volver
      </button>
      <AngularUserDetail />
    </div>
  );
}