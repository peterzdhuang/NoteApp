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
import { FileQuestionIcon, FlagIcon, List, NewspaperIcon, TagIcon, HeartIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const PlaceholderCard = () => (
  <Card className="w-full max-w-[300px] h-[400px] flex flex-col bg-gray-200 rounded-lg overflow-hidden shadow-md">
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

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="ml-4"><FlagIcon/></Button>
            <Button variant="outline" className="flex items-center text-blue-900 bg-blue-100 px-4 py-2">
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
          
          <CardContent>
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard/>
          </CardContent>


          <CardFooter className="flex justify-center">
            <Button variant="outline" className="">View More</Button>
          </CardFooter>

        </Card>

        {/* PDF Viewer */}
        <div className="ml-6 w-3/4 h-[600px] shadow-lg">
          <iframe src="http://www.africau.edu/images/default/sample.pdf" className="w-full h-[800px] rounded-lg border-gray-1000" title="PDF Viewer"></iframe>
        </div>
      </div>
    </>      
  );
}
