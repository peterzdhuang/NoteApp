import Nav from "@/components/nav";
import SearchBar from "@/components/SearchBar";
import '../app/globals.css';
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Nav page_name={"university"} />

      <main className="py-10">
        {/* Hero Section */}
        <section className="hero bg-secondary text-black dark:text-white text-center py-20">
          <h1 className="text-5xl font-bold">Welcome to NoteHub</h1>
          <p className="mt-4 text-xl">Your go-to platform for sharing and discovering course notes</p>

          <Button className="my-8">
            <a href="/sign-up">Get Started</a>
          </Button>

        </section>

        {/* Search Bar */}
        <div className="searchbar my-10">
          <SearchBar />
        </div>

        {/* Featured Notes Section */}
        <section className="featured-notes py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6">Featured Notes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add code to dynamically display featured notes */}
              <div className="note-card p-4 bg-white shadow rounded-md dark:bg-gray-800 dark:text-white">Note 1</div>
              <div className="note-card p-4 bg-white shadow rounded-md dark:bg-gray-800 dark:text-white">Note 2</div>
              <div className="note-card p-4 bg-white shadow rounded-md dark:bg-gray-800 dark:text-white">Note 3</div>
            </div>
          </div>
        </section>

        {/* Recent Notes Section */}
        <section className="recent-notes py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6">Recent Notes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add code to dynamically display recent notes */}
              <div className="note-card p-4 bg-white shadow rounded-md dark:bg-gray-800 dark:text-white">Recent Note 1</div>
              <div className="note-card p-4 bg-white shadow rounded-md dark:bg-gray-800 dark:text-white">Recent Note 2</div>
              <div className="note-card p-4 bg-white shadow rounded-md dark:bg-gray-800 dark:text-white">Recent Note 3</div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-black py-6 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p>&copy; 2024 NoteHub. All rights reserved.</p>
            <div className="space-x-4">
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms-of-service">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
