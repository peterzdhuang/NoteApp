import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface CreateFileProps {
  cid: string;
  uid: string;
}

const CreateFile: React.FC<CreateFileProps> = ({ cid, uid }) => {
  const router = useRouter();
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFileName = event.target.value;
    if (selectedFileName) {
      setFileName(selectedFileName);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!file) {
        setMessage('Please select a file');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`https://pdfstoragefunctionapp.azurewebsites.net/api/UploadPDF?code=dXAZBrP7X2vMdEFx6H26y7ZwleM3M4QpmiXTu81_TPKUAzFu-owBeg%3D%3D&cid=${encodeURIComponent(cid)}&fileName=${encodeURIComponent(fileName)}`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        
        router.push(`/university/${uid}/course/${cid}/file/${data.fid}`);
      } else {
        console.error('Failed to upload file:', response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setMessage('');
  };

  const closeModal = () => {
    setShowModal(false);
    setFileName('');
    setFile(null);
  };

  return (
    <div>
      <button 
        onClick={openModal} 
        className="bg-zinc-600 dark:bg-zinc-700 dark:hover:bg-secondary text-white my-4 py-2 px-4 rounded"
      >
        Create File
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
            <h2 className="text-xl font-semibold mb-4">Upload PDF File</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fileName" className="block text-sm font-medium text-gray-700">
                  PDF Name:
                </label>
                <input
                  type="text"
                  id="fileName"
                  value={fileName}
                  onChange={handleFileNameChange}
                  required
                  className="mt-1 block w-full rounded-md px-2 border-black border-2 shadow-sm focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                  Choose a PDF File:
                </label>
                <input
                  type="file"
                  id="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  required
                  className="mt-1 block w-full rounded-md px-2 border-black border-2 shadow-sm focus:ring focus:ring-blue-500 focus:ring-opacity-50 hover:cursor-pointer"
                />
              </div>
              <button 
                type="submit" 
                className="bg-zinc-600 dark:bg-zinc-700 dark:hover:bg-secondary text-white py-2 px-4 rounded"
              >
                Upload File
              </button>
              {message && <p className="text-red-500 mt-2">{message}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );

};

export default CreateFile;
