'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CreateFile from '@/components/createFile';

interface FileData {
  rowKey: string;
  fileName: string;
  // Add other properties if needed
}

export default function Home() {
  const [cid, setCid] = useState('');
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<FileData[]>([]);

  useEffect(() => {
    // Parse URL on the client side
    const pathArray = window.location.pathname.split('/');
    const cidFromPath = pathArray[pathArray.length - 1];
    const uidFromPath = pathArray[pathArray.length - 3];
    setUid(uidFromPath);
    setCid(cidFromPath);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://pdfstoragefunctionapp.azurewebsites.net/api/getFilesByCid?code=BLf74B9qQ9FbLKg-O53iL0WLICDJhCbhJQ2cEh18QaoWAzFu_3A73w%3D%3D&cid=${encodeURIComponent(cid)}`);
        const data: FileData[] = await res.json();
        setFiles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching files:', error);
        setLoading(true);
      }
    };

    if (cid) {
      fetchData();
    }
  }, [cid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" >
        {files.map((file, index) => (
          <Link href={`/university/${uid}/course/${cid}/file/${file.rowKey}`} key={index}> {/* Use Link with href */}
            <a className="w-full">{file.fileName}</a>
          </Link>
        ))}
      </div>

      <CreateFile cid={cid} uid={uid} />
    </div>
  );
}
