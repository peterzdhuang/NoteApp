'use client'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

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

const AboutPage = ({ params }) => { 

  return (
    <div>
      <Link href="/">
        id of university {params.uid}
      </Link>

      <PlaceholderCard />
      <PlaceholderCard />
      <PlaceholderCard />
      <PlaceholderCard />

    </div>
  );
};

export default AboutPage;
