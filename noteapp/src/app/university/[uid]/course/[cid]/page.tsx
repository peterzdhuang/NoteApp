// pages/index.js
'use client'
import Head from 'next/head';
import { useEffect, useState } from 'react';
export default function Home() {
    const [cid, setCid] = useState('');
    useEffect(() => {
        // Parse URL on the client side
        const pathArray = window.location.pathname.split('/');
        const uidFromPath = pathArray[pathArray.length - 1];
        setCid(uidFromPath);
    }, []);

  return (
    <div>
      cid : {cid}
    </div>
  );
}
