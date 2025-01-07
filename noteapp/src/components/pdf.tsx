'use client'
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from './ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSearchPlus, faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Import necessary styles for annotations

// Ensure the workerSrc is correctly set for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

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

  return (
    <div className="flex flex-col justify-between bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-lg max-w-4xl mx-auto" style={{ height: '800px' }}>
      <div className="navbar flex justify-between items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-t-lg shadow" style={{ height: '10vh' }}>
        {/* Zoom buttons */}
        <div className="flex items-center space-x-2">
          <Button onClick={handleZoomIn} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 rounded">
            <FontAwesomeIcon icon={faSearchPlus as IconProp} />
          </Button>
          <Button onClick={handleZoomOut} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 rounded">
            <FontAwesomeIcon icon={faSearchMinus  as IconProp} />
          </Button>
        </div>
        {/* Page input */}
        <div className="flex items-center space-x-2">
          {numPages && (
            <input
              type="text"
              value={`${pageNumber} / ${numPages}`}
              readOnly
              className="w-24 px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded focus:outline-none focus:bg-gray-400 dark:focus:bg-gray-500"
            />
          )}
        </div>
        {/* Prev and Next buttons */}
        <div className="flex items-center space-x-2">
          <Button onClick={handlePrevPage} disabled={pageNumber <= 1} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 rounded">
            <FontAwesomeIcon icon={faArrowLeft  as IconProp} />
          </Button>
          <Button onClick={handleNextPage} disabled={pageNumber >= numPages!} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 rounded">
            <FontAwesomeIcon icon={faArrowRight  as IconProp} />
          </Button>
        </div>
      </div>
      {/* PDF container */}
      <div className="flex-grow mx-auto my-4 flex justify-center overflow-auto" style={{ height: 'calc(90vh - 64px)', maxWidth: '100%' }}>
        <div className="overflow-auto max-w-full">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex justify-center"
          >
            <Page 
              pageNumber={pageNumber} 
              scale={scale} 
              renderTextLayer={false}  
              renderAnnotationLayer={false} 
            />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
