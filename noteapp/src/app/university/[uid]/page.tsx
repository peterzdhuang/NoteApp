'use client'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AboutPage = ({ params }) => { 
  
  return (
    <div>
      <Link href="/">
        id of university {params.uid}
      </Link>
    </div>
  );
};

export default AboutPage;
