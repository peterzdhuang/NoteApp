'use client';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRightCircleIcon } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

interface NavProps {
  page_name: string;
}

const Nav: React.FC<NavProps> = ({ page_name }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('Authorization');
    if (token) {
      try {
        const decodedToken: { exp: number } = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsSignedIn(true);
        } else {
          Cookies.remove('jwtToken');
        }
      } catch (e) {
        console.error('Invalid token:', e);
        Cookies.remove('jwtToken');
      }
    }
  }, []);

  return (
    <nav className="shadow-lg bg-secondary border-b-1 border-gray-400 relative top-0 left-0 right-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="relative self-center">
            <Link href="/">
              <img src="/logo_light.png" alt="Brand Logo" className="h-15 w-16" />
            </Link>
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
            {!isSignedIn && (
              <>
                <Button variant="default" className='bg-zinc-700 dark:bg-zinc-200 dark:hover:bg-zinc-300'>
                  <Link href="/login">Login</Link>
                  <ArrowRightCircleIcon className='mx-1 animate-pulse will-change-auto'/>
                </Button>

                <Button variant="default" className='bg-zinc-700 dark:bg-zinc-200 dark:hover:bg-zinc-300'>
                  <Link href="/sign-up">Sign-up</Link>
                  <ArrowRightCircleIcon className='mx-1 animate-pulse will-change-auto'/>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
