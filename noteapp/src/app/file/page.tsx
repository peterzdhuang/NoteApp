'use client'
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { FileQuestionIcon, FlagIcon, NewspaperIcon, TagIcon, HeartIcon, MoonIcon, SunIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PDFViewer from "@/components/pdf";
import Nav from '@/components/nav';

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
  return (
    <>
      <Nav page_name={'notes'}></Nav>

      <div className="border-lg bg-secondary text-secondary-foreground hover:bg-white my-1 py-4 shadow-sm dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl my-6">
              Something.pdf
            </h1>

            <Breadcrumb>
              <BreadcrumbList className="flex items-center space-x-4 text-2xl">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/university">
                    University
                  </BreadcrumbLink>
                </BreadcrumbItem>
                
                <BreadcrumbSeparator />
                
                <BreadcrumbItem>
                  <BreadcrumbLink href="/class">
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
