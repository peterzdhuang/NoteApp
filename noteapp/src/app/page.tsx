'use client';
import NotesList from "@/components/noteslist";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import '../app/globals.css';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Search } from "lucide-react";
import { motion } from 'framer-motion'
import { UserPlusIcon, SearchIcon, ArrowUpIcon, BookmarkIcon, PhoneCallIcon, RefreshCwIcon } from 'lucide-react'

export default function LandingPage() {
    const steps = [
        {
          title: 'Create an Account',
          description: 'Sign up for free to start uploading and saving notes.',
          icon: UserPlusIcon,
        },
        {
          title: 'Search Notes',
          description: 'Use the search bar to find notes by relevant keywords.',
          icon: SearchIcon,
        },
        {
          title: 'Upload Notes',
          description: 'Share your notes with the "Upload" button in the dashboard.',
          icon: ArrowUpIcon,
        },
        {
          title: 'Bookmark Favorites',
          description: 'Bookmark frequently accessed notes for quick access.',
          icon: BookmarkIcon,
        },
        {
          title: 'Access Anywhere',
          description: 'Login from any device to access your notes.',
          icon: PhoneCallIcon,
        },
        {
            title: 'Note Syncing',
            description: 'Keep your notes in sync across all your devices instantly.',
            icon: RefreshCwIcon,
        }        
      ]
    const [authToken, setAuthToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const token = Cookies.get('authToken');
        setAuthToken(token);
        console.log('Auth Token:', token);
    }, []);

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        console.log("Searching for:", searchQuery);
    };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed bg-gray-100">
      {/* Hero Section */}
      <header className="relative min-h-screen bg-black text-center flex flex-col justify-center items-center text-white px-6">
        <Image
          src="/logo_light.png"
          alt="NoteHub Logo"
          width={150}
          height={150}
          className="mb-6"
        />
        <h1 className="text-6xl font-extrabold mb-6 transition-all duration-500 transform hover:scale-105">
          Welcome to NoteHub
        </h1>
        <p className="text-2xl text-slate-300 mb-8 opacity-80 transition-all duration-500 hover:opacity-100">
          Share, Search, and Access Study Materials
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-lg mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for courses, study materials through keywords..."
              className="w-full p-4 pr-10 pl-4 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"
              aria-label="Search"
              onClick={handleSearch}
            />
          </div>
                  {/* Auth buttons / Upload Notes Button */}
        {authToken ? (
        <div className="auth-buttons text-center mt-10">
            <Button className="bg-blue-600 text-white px-8 py-3 rounded-full text-base font-medium shadow-md hover:bg-blue-700 active:shadow-lg transition-all duration-200 transform hover:scale-105">
            Upload New Notes
            </Button>
        </div>
        ) : (
        <div className="auth-buttons text-center mt-10">
            <p className="text-white mb-4 text-sm font-medium">
            Login or Sign Up to view your uploads and favorites!
            </p>
            <div className="flex justify-center space-x-4">
            <Button className="bg-gray-800 text-white px-8 py-3 rounded-full text-base font-medium shadow-md hover:bg-gray-900 active:shadow-lg transition-all duration-200 transform hover:scale-105">
                Login
            </Button>
            <Button className="bg-gray-500 text-white px-8 py-3 rounded-full text-base font-medium shadow-md hover:bg-gray-600 active:shadow-lg transition-all duration-200 transform hover:scale-105">
                Sign Up
            </Button>
            </div>
        </div>
        )}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 text-white cursor-pointer flex flex-col items-center">

          <span
            className="text-lg mb-2"
            onClick={() => {
              const target = document.getElementById("notes-list-container");
              target?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Scroll Down To Learn More
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white animate-bounce"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => {
              const target = document.getElementById("notes-list-container");
              target?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <path fillRule="evenodd" d="M5 7l5 5 5-5H5z" clipRule="evenodd" />
          </svg>
        </div>
        </header>

        {/* Notes Display */}
        <div id="notes-list-container" className="notes-list-container px-4 py-20">
            <NotesList />
        </div>

        {/* Features Section */}
        <section id="features" className="bg-gray-100 py-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
            className="text-4xl font-extrabold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            >
            Features of NoteHub
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <Image src="/share.png" alt="Share Notes" width={80} height={80} className="rounded-lg" />
                <h3 className="text-xl font-semibold mt-4">Share Notes</h3>
                <p className="text-gray-600 mt-2">
                Easily upload and share your study materials with classmates and peers.
                </p>
            </motion.div>
            {/* Feature 2 */}
            <motion.div
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Image src="/search.png" alt="Search Notes" width={80} height={80} />
                <h3 className="text-xl font-semibold mt-4">Search Effortlessly</h3>
                <p className="text-gray-600 mt-2">
                Quickly find relevant study materials using our powerful search engine.
                </p>
            </motion.div>
            {/* Feature 3 */}
            <motion.div
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Image src="/access.png" alt="Access Anywhere" width={80} height={80} />
                <h3 className="text-xl font-semibold mt-4">Access Anywhere</h3>
                <p className="text-gray-600 mt-2">
                Access your study materials from any device, anytime, anywhere.
                </p>
            </motion.div>
            </div>
        </div>
        </section>

        <section id="how-to-use" className="py-20 bg-gray-100 text-center">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2 
                className="text-4xl font-extrabold text-center text-gray-800 mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
                How to Use NoteHub
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <motion.div
                    key={step.title}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4 mx-auto">
                        <step.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    </motion.div>
                ))}
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 bg-gray-800 text-gray-300 py-6">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg font-semibold">
            &copy; 2025 <span className="text-blue-500">NoteHub</span>. All rights reserved.
            </p>
            <div className="flex justify-center mt-4 space-x-6">
            <a
                href="#"
                className="hover:text-blue-400 transition-all duration-300"
                aria-label="Privacy Policy"
            >
                Privacy Policy
            </a>
            <a
                href="#"
                className="hover:text-blue-400 transition-all duration-300"
                aria-label="Terms of Service"
            >
                Terms of Service
            </a>
            <a
                href="#"
                className="hover:text-blue-400 transition-all duration-300"
                aria-label="Contact Us"
            >
                Contact Us
            </a>
            </div>
            <div className="mt-4">
            <p>Follow us on:</p>
            <div className="flex justify-center space-x-4 mt-2">
                <a
                href="#"
                aria-label="Facebook"
                className="hover:text-blue-400 transition-all duration-300"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    d="M22.675 0H1.325C.594 0 0 .593 0 1.326v21.348C0 23.407.594 24 1.325 24h11.49v-9.294H9.692v-3.62h3.123V8.408c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.793.143v3.24l-1.917.001c-1.504 0-1.796.715-1.796 1.763v2.309h3.587l-.467 3.62h-3.12V24h6.117C23.406 24 24 23.407 24 22.674V1.326C24 .593 23.406 0 22.675 0z"
                    />
                </svg>
                </a>
                <a
                href="#"
                aria-label="Twitter"
                className="hover:text-blue-400 transition-all duration-300"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.956-2.178-1.555-3.594-1.555-2.717 0-4.917 2.203-4.917 4.917 0 .39.044.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.735-.667 1.59-.667 2.503 0 1.723.878 3.243 2.212 4.134-.816-.026-1.582-.25-2.253-.625v.064c0 2.404 1.71 4.412 3.976 4.867-.416.112-.855.171-1.307.171-.32 0-.631-.031-.935-.089.632 1.974 2.463 3.413 4.63 3.452-1.7 1.33-3.847 2.123-6.187 2.123-.402 0-.798-.023-1.19-.07 2.21 1.419 4.83 2.246 7.649 2.246 9.16 0 14.173-7.589 14.173-14.173 0-.217-.005-.433-.014-.648.975-.704 1.822-1.581 2.491-2.583z"
                    />
                </svg>
                </a>
                <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-blue-400 transition-all duration-300"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                    d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.46C0 23.23.79 24 1.77 24h20.46c.96 0 1.77-.77 1.77-1.77V1.77C24 .8 23.2 0 22.23 0zM7.08 20.48H3.56V9h3.52v11.48zM5.32 7.44c-1.1 0-1.99-.89-1.99-1.99 0-1.1.89-1.99 1.99-1.99 1.1 0 1.99.89 1.99 1.99 0 1.1-.89 1.99-1.99 1.99zm15.17 13.04h-3.53v-5.44c0-1.3-.03-2.98-1.83-2.98-1.83 0-2.11 1.43-2.11 2.89v5.53H9.5V9h3.39v1.56h.05c.47-.89 1.61-1.83 3.31-1.83 3.54 0 4.2 2.33 4.2 5.36v6.39z"
                    />
                </svg>
                </a>
            </div>
            </div>
        </div>
        </footer>

    </div>
  );
}
