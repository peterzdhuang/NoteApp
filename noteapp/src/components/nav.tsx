'use client'
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoonIcon, SunIcon } from "lucide-react";


interface NavProps {
    page_name: string;
}

const Nav: React.FC<NavProps> = ({ page_name }) => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <nav className="shadow-lg bg-secondary border-b-1 border-gray-400">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
            <Link href="/">
                
                  <img src={darkMode ? "/logo_dark.png" : "/logo_light.png"} alt="Brand Logo" className="h-15 w-16" />
              </Link>
              <Link href="/" className="ml-4 text-2xl font-bold text-black-400 dark:text-white">NoteHub</Link>
            </div>
            
            {page_name !== "university" && (
              <div className="flex-1 mx-4">
                <input 
                  type="text" 
                  placeholder="Search with course name and helpful keywords" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white" 
                />
              </div>
            )}
            
            <div className="flex items-center space-x-4">
              <Button variant="default"><Link href="/sign-in">Sign-in</Link></Button>
              <Button variant="default" className="bg-primary/80"><Link href="/sign-up">Sign-up</Link></Button>
              <Button variant="default" onClick={toggleDarkMode}>
                {darkMode ? <SunIcon /> : <MoonIcon />}
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;