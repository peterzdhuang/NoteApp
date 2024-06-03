'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Nav from '@/components/nav';

const coursePage = () => { 
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [uid, setUid] = useState('');

  useEffect(() => {
    // Parse URL on the client side
    const pathArray = window.location.pathname.split('/');
    const uidFromPath = pathArray[pathArray.length - 1];
    setUid(uidFromPath);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://pdfstoragefunctionapp.azurewebsites.net/api/getClassesByUid?code=E9eyEuZNzKgqPruXoIuWOeUg7p9B4YyrAF2XNExxPGOxAzFujBjnPQ%3D%3D&uid=${encodeURIComponent(uid)}`);
        const data = await res.json()
        setClasses(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setLoading(false);
      }
    };

    if (uid) {
      fetchData();
    }
  }, [uid]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  

  
  const placeholderDescription = 'This is a placeholder description for the course.';
  const placeholderSemester = 'Select a Semester';
  const placeholderDepartment = 'Select a Department';


  
  if (loading) {
    return <div>Loading...</div>;
  } 
  // const cardTitles = ["test"];
  // const filteredCards = cardTitles.filter(title => 
  //   title.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //   (selectedSemester ? title.includes(selectedSemester) : true) &&
  //   (selectedDepartment ? title.includes(selectedDepartment) : true)
  // );
  return (
    <>
      <Nav page_name='university' />
      <div className="p-4">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-lg w-full max-w-xs"
            />
            <svg className="w-6 h-6 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M15 10a5 5 0 11-10 0 5 5 0 0110 0z"></path>
            </svg>
          </div>
          <div className="flex items-center">
            <select 
              value={selectedSemester} 
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="p-2 border rounded-lg ml-4"
            >
              <option value="">{placeholderSemester}</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
            </select>
            <select 
              value={selectedDepartment} 
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="p-2 border rounded-lg ml-4"
            >
              <option value="">{placeholderDepartment}</option>
              <option value="CMPT">Computer Science</option>
              <option value="MATH">Mathematics</option>
              <option value="PHYS">Physics</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((course, index) => (
            <Link href={`/university/${uid}/course/${course.rowKey}`} key={index}> {/* Use Link with href */}
              <a className="w-full"> {/* Add anchor tag for styling */}
                <Card className="flex flex-col items-start bg-primary hover:bg-secondary rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 w-full">
                  <CardContent className="flex-1 flex flex-col p-4">
                    <div className="text-lg text-white font-medium mb-2">{course.courseName}</div>
                    <div className="text-gray-600">{placeholderDescription}</div>
                    <div className="text-xs mt-auto text-gray-500">{selectedSemester ? selectedSemester : placeholderSemester} - {selectedDepartment ? selectedDepartment : placeholderDepartment}</div>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default coursePage;
