'use client'
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from './ui/button';

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load worker from the pdf.js package
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handleZoomIn = () => {
    setScale(prevScale => prevScale + 0.25);
  };

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(0.25, prevScale - 0.25));
  };

  const handleNextPage = () => {
    setPageNumber(prevPage => Math.min(prevPage + 1, numPages!));
  };

  const handlePrevPage = () => {
    setPageNumber(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleGoToPage = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`h-screen flex flex-col justify-between ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="navbar flex justify-between items-center px-4 py-2">
        <div>
          <Button variant="outline" onClick={handlePrevPage} disabled={pageNumber <= 1} className="mr-2 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">
            Prev
          </Button>
          <span>
            Page {pageNumber} of {numPages}
          </span>
          <button onClick={handleNextPage} disabled={pageNumber >= numPages!} className="ml-2 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">
            Next
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={handleZoomIn} className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">Zoom In</button>
          <button onClick={handleZoomOut} className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">Zoom Out</button>
          <input
            type="number"
            value={pageNumber}
            onChange={(e) => handleGoToPage(parseInt(e.target.value))}
            min={1}
            max={numPages}
            className="w-16 px-2 py-1 rounded bg-gray-200 focus:outline-none focus:bg-gray-300"
          />
        </div>
      </div>
      <div className="pdf-container mx-auto my-4">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>
      </div>
      <button onClick={toggleTheme} className="mx-auto mb-4 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    </div>
  );
};

export default PDFViewer;
