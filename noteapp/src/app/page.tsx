'use client'
import Nav from "@/components/nav";
import SearchBar from "@/components/SearchBar";
import '../app/globals.css';
import { Button } from "@/components/ui/button";
import { ArrowRightFromLineIcon } from "lucide-react";
import LazyLoad from "react-lazy-load";


export default function LandingPage() {
  return (
    <div className="min-h-screen" 
      style={{
        backgroundImage: "url('/background.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'local',
      }}
    >
      <Nav page_name={"university"} />

      <main className="py-10"
      >
        {/* Hero Section */}
        <section 
          className="hero bg-secondary text-black dark:text-white text-center py-20 rounded-xl drop-shadow-lg"
          style={{
            backgroundImage: "url('/hero.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
          }}
          
        >

          <img src="/logo_light.png" className="h-[200px] w-[200px] mx-auto mb-6 dark:filter dark:invert" loading="lazy" alt="NoteHub Logo" />
          

          <h1 className="text-5xl text-primary dark:text-white font-sans  ">Welcome to NoteHub</h1>
          <p className="mt-4 text-xl text-primary dark:text-white font-sans">Your go-to platform for sharing and discovering course notes</p>

          <Button variant="default" className="my-14 text-white rounded-full shadow-md dark:text-black">
            <a href="/sign-up">Get Started</a>
            <ArrowRightFromLineIcon className="right-arrow"/>
          </Button>
        </section> 

        {/* Search Bar */}
        <div className="searchbar my-10 drop-shadow-2xl" >
          <SearchBar />
        </div>

        {/* About Section */}
        <LazyLoad>
        <section className="about py-10 bg-gray-100 dark:bg-secondary rounded-xl drop-shadow-xl"
          style={{
            backgroundImage: "url('/style.svg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">About NoteHub</h2>
            <p className="text-lg mb-6">NoteHub is a platform dedicated to helping students share and discover notes from their courses. Our mission is to create a collaborative environment where knowledge can be easily accessed and shared.</p>
          </div>
        </section>
        </LazyLoad>

        {/* Featured Notes Section */}
        <LazyLoad>
        <section className="featured-notes py-10 my-10 rounded-xl shadow-lg border-1 border-black"
                    style={{
                      backgroundImage: "url('/featured_bg.svg')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'bottom',
                      
                    }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 drop-shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Featured Notes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="note-card p-4 bg-white shadow rounded-md dark:bg-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                <h3 className="text-xl font-bold">Note 1</h3>
                <p className="mt-2">Summary of Note 1...</p>
              </div>
              <div className="note-card p-4 bg-white shadow rounded-md dark:bg-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                <h3 className="text-xl font-bold">Note 2</h3>
                <p className="mt-2">Summary of Note 2...</p>
              </div>
              <div className="note-card p-4 bg-white shadow rounded-md dark:bg-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                <h3 className="text-xl font-bold">Note 3</h3>
                <p className="mt-2">Summary of Note 3...</p>
              </div>
            </div>
          </div>
        </section>
        </LazyLoad>

        {/* Recent Notes Section */}
        <LazyLoad>
        <section className="recent-notes py-10 bg-gray-100 dark:bg-secondary rounded-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6">Recent Notes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="note-card p-4 bg-white shadow rounded-md dark:bg-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                <h3 className="text-xl font-bold">Recent Note 1</h3>
                <p className="mt-2">Summary of Recent Note 1...</p>
              </div>
              <div className="note-card p-4 bg-white shadow rounded-md dark:bg-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                <h3 className="text-xl font-bold">Recent Note 2</h3>
                <p className="mt-2">Summary of Recent Note 2...</p>
              </div>
              <div className="note-card p-4 bg-white shadow rounded-md dark:bg-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                <h3 className="text-xl font-bold">Recent Note 3</h3>
                <p className="mt-2">Summary of Recent Note 3...</p>
              </div>
            </div>
          </div>
        </section>
        </LazyLoad>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-black py-6 dark:text-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p>&copy; 2024 NoteHub. All rights reserved.</p>
            <div className="space-x-4">
              <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
