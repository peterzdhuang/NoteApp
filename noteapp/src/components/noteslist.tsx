import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Importing motion from framer-motion

const NotesList = () => {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching notes from an API
    setNotes([
      { 
        id: 1, 
        title: 'Math 101 Notes', 
        description: 'A comprehensive set of notes on calculus.', 
        image: '/math.jpg' // Add your image path here
      },
      { 
        id: 2, 
        title: 'History Notes', 
        description: 'Notes on World War II, key events and figures.', 
        image: '/history.jpg' // Add your image path here
      },
      { 
        id: 3, 
        title: 'Physics Notes', 
        description: 'Physics notes on mechanics and thermodynamics.', 
        image: '/physics.jpg' // Add your image path here
      },
      { 
        id: 4, 
        title: 'Chemistry Notes', 
        description: 'Detailed notes on organic chemistry and reactions.', 
        image: '/chemistry.jpg' // Add your image path here
      }, 
    ]);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {notes.map((note, index) => (
        <motion.div
          key={note.id}
          className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all w-[300px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }} // Delayed motion for each note
        >
          {/* Hardcoded image at the top */}
          <img 
            src={note.image} 
            alt={note.title} 
            className="w-full aspect-video object-cover rounded-t-lg" 
          />
          <div className="p-4">
            <h3 className="text-xl text-center font-semibold">{note.title}</h3>
            <p className="text-gray-600 text-center mt-2">{note.description}</p>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600 mx-auto block">
              View Details
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NotesList;
