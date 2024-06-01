'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Nav from '@/components/nav';
import { AspectRatio } from '@/components/ui/aspect-ratio'; // Import AspectRatio component from shadcn
import Image from 'next/image';

const generatePDFName = (index) => `Document_${index}.pdf`;

const CoursePage = ({ params }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Simulate fetching files from a server
    const fetchedFiles = Array.from({ length: 10 }, (_, index) => ({
      name: generatePDFName(index + 1),
      imageUrl: 'https://via.placeholder.com/150', // Placeholder image URL
    }));
    setFiles(fetchedFiles);
  }, []);

  return (
    <>
      <Nav page_name='Course Files' />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Uploaded Files</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file, index) => (
            <Link href="/course" key={index} className="w-full">
              <Card className="w-150 h-300"> {/* Width: 150px, Height: 300px */}
                <CardContent className="flex-1 flex flex-col items-center justify-center p-4">
                  <AspectRatio ratio={4 / 3} className="w-full mb-2">
                    <Image 
                      src={file.imageUrl} 
                      alt={`Placeholder for ${file.name}`} 
                      layout="fill" 
                      className="rounded-md object-cover"
                    />
                  </AspectRatio>
                  <div className="text-lg font-medium text-center">{file.name}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default CoursePage;
