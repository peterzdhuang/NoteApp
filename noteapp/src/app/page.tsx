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
import { FileQuestionIcon, FlagIcon, List, NewspaperIcon, TagIcon } from "lucide-react";
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl my-6">
              Something.pdf
            </h1>

            <Breadcrumb>
              <BreadcrumbList className="flex items-center space-x-4 text-lg">
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
            
            <div className="flex space-x-4 mt-4">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 text-lg px-4 py-2"><NewspaperIcon/>Upvoted</Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800 text-lg px-4 py-2"><FileQuestionIcon/>Popular</Badge>
              <Badge variant="outline" className="bg-red-100 text-red-800 text-lg px-4 py-2"><TagIcon/>Featured</Badge>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 text-lg px-4 py-2"><FlagIcon/>New</Badge>
            </div>
          </div>

          <div>
            <Button variant="outline" className="ml-4"><FlagIcon/></Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex">
        <Card className="w-[300px] h-[900px] flex flex-col">
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

        {/* PDF Viewer */}
        <div className="ml-6 w-3/4">
          <iframe src="path-to-your-pdf.pdf" className="w-full h-[600px]" title="PDF Viewer"></iframe>
        </div>
      </div>
    </>      
  );
}
