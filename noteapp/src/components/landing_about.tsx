import React from "react";
const About: React.FC = () => {
    return (
        <>
            <section className="about py-10 bg-gray-100 dark:bg-secondary rounded-xl drop-shadow-xl text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-6 shadow-md">About NoteHub</h2>
                    <p className="text-lg mb-6">NoteHub is a platform dedicated to helping students share and discover notes from their courses. Our mission is to create a collaborative environment where knowledge can be easily accessed and shared.</p>
                    
                    <div className="text-left">
                        <ul className="list-disc pl-6 mb-6 font-bold">
                            <li>Find notes uploaded by other students for your courses</li>
                            <li>Share your own to foster collaboration and keep your notes in cloud storage</li>
                            <li>Create an account to save your favorites</li>
                        </ul>
                        <h3 className="text-xl font-bold mb-4">Future goals:</h3>
                        <ul className="list-disc pl-6">
                            <li>Discussion Forums: Introduce discussion forums where students can engage in academic discussions, ask questions, and exchange ideas on specific topics or courses.</li>
                            <li>Real-Time Chat: Implement a real-time chat feature that allows students to communicate with each other instantly, fostering instant communication, collaboration, and support.</li>
                        </ul>
                    </div>
                </div>
            </section>

        </>
    );
}

export default About;