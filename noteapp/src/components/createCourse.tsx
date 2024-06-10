'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CreateCourse: React.FC = (params) => {
    const uid = params.uid
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
                    uid : uid,
                    courseName : courseName,
                    professorName : professorName,
                    semester : semester,
                    year: year})
            });

            if (response.ok) {
                
                const data = await response.json();
                router.push(`/university/${uid}/course/${data.cid}`);
            } else {
                // Handle non-OK response
                // For example, display an error message to the user
                console.error('Failed to create course:', response.statusText);
            }
        } catch (error) {
            console.error(error)
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

    return (
        <div>
            <button 
                onClick={openModal} 
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Create Course
            </button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        <button 
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Create University</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="universityName" className="block text-sm font-medium text-gray-700">
                                    Course Name:
                                </label>
                                <input
                                    type="text"
                                    id="courseName"
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
                                <input
                                    type="text"
                                    id="year"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                            >
                                Create Course
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateCourse;
