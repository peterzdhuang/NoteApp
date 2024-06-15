'use client'
import Nav from "@/components/nav";
import SearchBar from "@/components/SearchBar";
import '../app/globals.css';
import Hero from "@/components/landing_hero";
import About from "@/components/landing_about";
import FeatureSection from "@/components/landing_featured"
import RecentSection from "@/components/landing_recent";
import FooterSection from "@/components/footer_section";
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

        {/* About Section */}
        <div className="my-10">
          <About></About>
        </div>

        {/* Featured Notes Section */}
        <FeatureSection/>

        {/* Recent Notes Section */}
        <RecentSection/>
      </main>
      {/* Footer Section */}
      <FooterSection/>
    </div>
  );
}
