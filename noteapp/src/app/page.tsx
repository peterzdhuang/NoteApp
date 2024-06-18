'use client'
import Nav from "@/components/nav";
import SearchBar from "@/components/SearchBar";
import '../app/globals.css';
import Hero from "@/components/landing_hero";
import About from "@/components/landing_about";
import FeatureSection from "@/components/landing_featured"
import RecentSection from "@/components/landing_recent";
import Cookies from 'js-cookie';

export default function LandingPage() {
  const authToken = Cookies.get('authToken');
  console.log(authToken)

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/background.svg')" }}>
      <Nav page_name={"university"} />

      <main className="">
        {/* Hero Section */}
        <div className="">
          <Hero></Hero>
        </div>

        {/* Search Bar */}
        <div className="searchbar my-10 drop-shadow-2xl" >
          <SearchBar />
        </div>

        {/* Featured Notes Section */}
        <FeatureSection/>

        {/* Recent Notes Section */}
        {/* <RecentSection/> */}
        
        {/* About Section */}
        <div className="my-10">
          <About></About>
        </div>
        
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
