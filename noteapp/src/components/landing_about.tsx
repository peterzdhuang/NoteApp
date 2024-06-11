import React from "react"
const About: React.FC = () => {
    return (
        <>
            <section className="about py-10 bg-gray-100 dark:bg-secondary rounded-xl drop-shadow-xl"
                style={{
                    backgroundImage: "url('/style.svg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                }}
                >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6">About NoteHub</h2>
                    <p className="text-lg mb-6">NoteHub is a platform dedicated to helping students share and discover notes from their courses. Our mission is to create a collaborative environment where knowledge can be easily accessed and shared.</p>
                </div>
            </section>
        </>
    );
}

export default About;