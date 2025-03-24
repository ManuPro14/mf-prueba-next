import Image from "next/image";
import UserSearch from "./components/UserSearch";

export default function Home() {
  return (
    <main className="flex flex-col w-full items-center justify-center min-h-screen py-2 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">Buscar Usuarios de GitHub</h1>
      <UserSearch />
    </main>
  );
}
