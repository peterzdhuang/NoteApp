import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { BanIcon, FileQuestionIcon, FlagIcon, FlagOffIcon, NewspaperIcon, TagIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Home() {
  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/path-to-your-logo.png" alt="Brand Logo" className="h-8 w-auto mr-4" />
              <a href="#" className="text-xl font-bold text-black-400">NoteApp</a>
            </div>
            
            <div className="flex-1 mx-4">
              <input 
                type="text" 
                placeholder="Search with course name and helpful keywords" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="default">Sign in</Button>
              <Button variant="secondary">Sign up</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white my-1 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="scroll-m-20 text-2xl tracking-tight lg:text-5xl my-6">
            Something.pdf
          </h1>
          
          <Button variant="outline" className=""><FlagOffIcon/></Button>

          <Breadcrumb>
            <BreadcrumbList className="flex items-center space-x-4">
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href="/">University</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              
              <BreadcrumbSeparator />
              
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link href="/components">Course</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              
              <BreadcrumbSeparator />
              
              <BreadcrumbItem>
                <BreadcrumbPage>Date</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex space-x-2 mt-4">
            <Badge variant="outline" className="bg-blue-100 text-blue-800"><NewspaperIcon/>Upvoted</Badge>
            <Badge variant="outline" className="bg-green-100 text-green-800"><FileQuestionIcon/>Popular</Badge>
            <Badge variant="outline" className="bg-red-100 text-red-800"><TagIcon/>Featured</Badge>
          </div>
        </div>
      </div>

      <Card className="w-[300px] h-[900px] flex flex-col mt-[40px] ml-[50px]">
        <CardHeader>
          <CardTitle>Similar Content</CardTitle>
          <CardDescription>showing notes with similar Keywords</CardDescription>
        </CardHeader>
        
        <CardContent>
          
        </CardContent>


        <CardFooter className="flex justify-center">
          <Button variant="link" className="">View More</Button>
        </CardFooter>

      </Card>

    </>      
  );
}
