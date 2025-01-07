'use client';
import NotesList from "@/components/NotesList";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import '../app/globals.css';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Search } from "lucide-react";

export default function LandingPage() {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const token = Cookies.get('authToken');
    setAuthToken(token);
    console.log('Auth Token:', token);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = () => {
    // You can handle the search logic here, for example:
    console.log("Searching for:", searchQuery);
  };
  
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed bg-gray-100">
        {/* Hero Section */}
        <header className="relative min-h-screen bg-black text-center flex flex-col justify-center items-center text-white px-6"
        >
            <Image
                src="/logo_light.png"  // This assumes your logo is located in the public folder
                alt="NoteHub Logo"
                width={150}  // You can adjust the width based on your design
                height={150}  // Adjust height as needed to keep the aspect ratio
                className="mb-6" // Margin below the logo
            />
            <h1 className="text-6xl font-extrabold mb-6 transition-all duration-500 transform hover:scale-105">
                Welcome to NoteHub
            </h1>
            <p className="text-2xl text-slate-300 mb-8 opacity-80 transition-all duration-500 hover:opacity-100">
                Share, Search, and Access Study Materials
            </p>

            {/* Search Bar Container */}
            <div className="w-full max-w-lg mb-12">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for courses, study materials through keywords..."
                        className="w-full p-4 pr-10 pl-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    
                    {/* Search Icon from Lucid React Icons on the right */}
                    <Search
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                        aria-label="Search"
                        onClick={handleSearch}
                    />
                </div>
            </div>



            {/* Scroll Indicator */}
            <div className="absolute bottom-6 text-white cursor-pointer flex flex-col items-center">
            <span className="text-lg mb-2">Scroll Down To Learn More</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 7l5 5 5-5H5z" clip-rule="evenodd" />
            </svg>
            </div>

            </header>



      {/* Notes Display */}
      <div className="notes-list-container px-4 py-20">
        <NotesList />
      </div>

      {/* Auth buttons / Upload Notes Button */}
      {authToken ? (
        <div className="auth-buttons text-center mt-10">
          <Button className="bg-slate-500 text-white p-3 rounded hover:bg-blue-600">Upload New Notes</Button>
        </div>
      ) : (
        <div className="auth-buttons text-center mt-10">
          <Button className="bg-black text-white p-3 rounded-xl hover:bg-slate-500 transition-all duration-300 mr-4">Login</Button>
          <Button className="bg-slate-500 text-white p-3 rounded-xl hover:bg-black transition-all duration-300 mr-4">Sign Up</Button>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-600">
        <p>&copy; 2025 School Notes Platform | All rights reserved</p>
      </footer>
    </div>
  );
}
