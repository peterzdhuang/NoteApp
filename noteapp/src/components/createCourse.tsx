'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from './ui/button';

interface CreateCourseProps {
  uid: string;
}

const CreateCourse: React.FC<CreateCourseProps> = ({ uid }) => {
  const [courseName, setCourseName] = useState('');
  const [professorName, setProfessorName] = useState('');
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('https://pdfstoragefunctionapp.azurewebsites.net/api/createCourse?code=kahFRRqGm546CL3_jg_oZN_gVIqZlUg_8SWj7XGBRCouAzFuoagPug%3D%3D', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: uid,
          courseName: courseName,
          professorName: professorName,
          semester: semester,
          year: year
        })
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/university/${uid}/course/${data.cid}`);
      } else {
        console.error('Failed to create course:', response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setMessage('');
  };

  const closeModal = () => {
    setShowModal(false);
    setCourseName('');
    setProfessorName('');
    setSemester('');
    setYear('');
  };

  const getLastTwentyYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 20 }, (_, i) => (currentYear - i).toString());
  };

  return (
    <div>
      <Button 
        variant="default"
        onClick={openModal} 
        className="bg-zinc-600 dark:bg-zinc-700 dark:hover:bg-secondary text-white my-4"
      >
        Create Course
      </Button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <Button 
              variant="default"
              className="absolute top-4 right-4 text-white"
              onClick={closeModal}>
              &times;
            </Button>
            <h2 className="text-xl font-semibold mb-4">Add a course</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
                  Course Name:
                </label>
                <input
                  type="text"
                  id="courseName"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required
                  placeholder='BIO 102'
                  className="mt-1 block w-full rounded-md px-2 border-black border-2 shadow-sm focus:ring focus:ring-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="professorName" className="block text-sm font-medium text-gray-700">
                  Professor Name:
                </label>
                <input
                  type="text"
                  id="professorName"
                  value={professorName}
                  onChange={(e) => setProfessorName(e.target.value)}
                  required
                  placeholder='John A. Smith'
                  className="mt-1 block w-full rounded-md px-2 border-black border-2 shadow-sm focus:ring focus:ring-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                  Semester:
                </label>
                <select
                  id="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                  className="mt-1 block w-full px-2 border-black border-2 shadow-sm focus:ring focus:ring-white "
                >
                  <option value="" disabled>Select semester</option>
                  <option value="fall">Fall</option>
                  <option value="winter">Winter</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                  Year:
                </label>
                <select
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required
                  className="mt-1 block w-full px-2 border-black border-2 shadow-sm focus:ring focus:ring-white"
                >
                  <option value="" disabled>Select year</option>
                  {getLastTwentyYears().map((yearOption) => (
                    <option key={yearOption} value={yearOption}>{yearOption}</option>
                  ))}
                </select>
              </div>
              <Button 
                type="submit" 
                className="mt-1 block w-full px-2 border-black border-2 shadow-sm focus:ring focus:ring-white"
              >
                Create Course
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCourse;
