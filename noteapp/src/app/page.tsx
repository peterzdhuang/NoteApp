'use client'
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { FileQuestionIcon, FlagIcon, NewspaperIcon, TagIcon, HeartIcon, MoonIcon, SunIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PDFViewer from "@/components/pdf";

const PlaceholderCard = () => (
  <Card className="w-full max-w-[300px] h-[200px] flex flex-col bg-gray-200 rounded-lg overflow-hidden shadow-md">
    <CardContent className="flex-1 p-4">
      <div className="animate-pulse h-full">
        <div className="h-8 bg-gray-300 mb-2"></div>
        <div className="h-6 bg-gray-300 mb-2"></div>
        <div className="h-4 bg-gray-300 mb-2"></div>
        <div className="h-4 bg-gray-300"></div>
      </div>
    </CardContent>
  </Card>
);

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

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
      <nav className="shadow-xl bg-gradient-to-r from-secondary to-white-400 border-b-4 border-gray-400">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/logo.png" alt="Brand Logo" className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 mr-4" />
              <Link href="/" className="text-3xl font-bold text-black-400 dark:text-white">NoteApp</Link>
            </div>
            
            <div className="flex-1 mx-4">
              <input 
                type="text" 
                placeholder="Search with course name and helpful keywords" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:text-white" 
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="default"><Link href="/sign-in">Sign-in</Link></Button>
              <Button variant="default" className="bg-primary/80"><Link href="/sign-up">Sign-up</Link></Button>
              <Button variant="outline" onClick={toggleDarkMode}>
                {darkMode ? <SunIcon /> : <MoonIcon />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="border-lg bg-secondary text-secondary-foreground hover:bg-white my-1 py-4 shadow-sm dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl my-6">
              Something.pdf
            </h1>

            <Breadcrumb>
              <BreadcrumbList className="flex items-center space-x-4 text-2xl">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/app/sign-in">
                    University
                  </BreadcrumbLink>
                </BreadcrumbItem>
                
                <BreadcrumbSeparator />
                
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">
                    Course
                  </BreadcrumbLink>
                </BreadcrumbItem>
                
                <BreadcrumbSeparator />
                
                <BreadcrumbItem>
                  <BreadcrumbPage>Date</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <div className="flex space-x-4 mt-4">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 text-lg px-4 py-2"><NewspaperIcon/>Upvoted</Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800 text-lg px-4 py-2"><FileQuestionIcon/>Popular</Badge>
              <Badge variant="outline" className="bg-red-100 text-red-800 text-lg px-4 py-2"><TagIcon/>Featured</Badge>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 text-lg px-4 py-2"><FlagIcon/>New</Badge>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="ml-4"><FlagIcon/></Button>
            <Button variant="default" className="flex items-center px-4 py-2 hover:bg-primary/80">
              <HeartIcon className="mr-2" />
              <span className="text-sm">Favorite</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex">
        <Card className="w-[300px] h-auto flex flex-col shadow-lg">
          <CardHeader>
            <CardTitle>Similar Content</CardTitle>
            <CardDescription>showing notes with similar Keywords</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button variant="outline" className="text-base md:text-lg lg:text-xl">View More</Button>
          </CardFooter>
        </Card>

        <div className="ml-20 w-3/4 h-[800px] shadow-lg overflow-auto">
          <PDFViewer pdfUrl="http://localhost:3001/pdf" />
        </div>
        
      </div>
    </>
  );
}
