'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from './ui/button';

const CreateUniversity: React.FC = () => {
    const [universityName, setUniversityName] = useState('');
    const [uid, setUid] = useState('');
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('https://pdfstoragefunctionapp.azurewebsites.net/api/createUniversity?code=Ob8e1Eg3bLBzEmRfSMr6fs_55qlBjT7MruclAl-GlYhkAzFu_wuvEw%3D%3D', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ universityName: universityName })
            });

            if (response.ok) {
                const data = await response.json();

                router.push(`/university/${data.uid}`)
            } else {
                const errorData = await response.json();
            }
        } catch (error) {
            console.error(error)
        }
    };

    const openModal = () => {
        setShowModal(true);
        setUid('');
    };

    const closeModal = () => {
        setShowModal(false);
        setUniversityName('');
    };

    return (
        <div>
            <Button 
                onClick={openModal} 
                className="bg-zinc-700 dark:bg-zinc-200 dark:hover:bg-zinc-300 text-white py-2 px-4 rounded"
            >
                Add your University
            </Button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        <Button 
                            variant="default"
                            className="absolute top-4 right-4 text-white"
                            onClick={closeModal}
                        >
                            &times;
                        </Button>
                        <h2 className="text-xl font-semibold mb-4">Create University</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="universityName" className="block text-sm font-medium text-gray-700">
                                    University Name:
                                </label>
                                <input
                                    type="text"
                                    id="universityName"
                                    value={universityName}
                                    onChange={(e) => setUniversityName(e.target.value)}
                                    placeholder='Enter the name of your university here'
                                    required
                                    className="mt-1 block w-full rounded-md px-2 border-black border-2 shadow-sm focus:ring focus:ring-white"
                                />
                            </div>
                            <Button 
                                variant="default"
                                type="submit" 
                                className="bg-zinc-700 dark:bg-zinc-200 dark:hover:bg-zinc-300 text-white py-2 px-4 rounded"
                            >
                                Create University
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateUniversity;
