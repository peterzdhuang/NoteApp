'use client';
import React, { useEffect } from 'react';
import { Document, Thumbnail, pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Import necessary styles for annotations

// Ensure the workerSrc is correctly set for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


interface PDFThumbnailProps {
  pdfUrl: string;
}

const PDFThumbnail: React.FC<PDFThumbnailProps> = ({ pdfUrl }) => {
      useEffect(() => {
    // Load worker from the pdf.js package
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);
  return (
    <div className="overflow-hidden rounded-lg shadow">
      <Document
        file={pdfUrl}
      >
        <Thumbnail
          pageNumber={1}  // Change this as needed for different page thumbnails
          scale={1}
          width={300}
        />
      </Document>
    </div>
  );
};

export default PDFThumbnail;
