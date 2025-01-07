import { useEffect, useState } from 'react';

const NotesList = () => {
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    // Simulate fetching notes from an API
    setNotes([
      { id: 1, title: 'Math 101 Notes', description: 'A comprehensive set of notes on calculus.' },
      { id: 2, title: 'History Notes', description: 'Notes on World War II, key events and figures.' },
      { id: 3, title: 'Physics Notes', description: 'Physics notes on mechanics and thermodynamics.' },
    ]);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <div key={note.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
          <h3 className="text-xl font-semibold">{note.title}</h3>
          <p className="text-gray-600 mt-2">{note.description}</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
