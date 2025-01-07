import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import PDFThumbnail from "./thumbnail";

const client = createClient({
  projectId: "qejur137", // Replace with your Sanity project ID
  dataset: "production", // Replace with your dataset
  apiVersion: "2023-01-01", // Use the latest API version
  useCdn: true,
});

const proxyUrl = "http://localhost:3001/proxy"; // URL to your proxy server

interface PDFDocument {
  title: string;
  summary: string;
  pdfUrl: string;
  thumbnailUrl: string;
}

const FeatureSection: React.FC = () => {
  const [pdfs, setPdfs] = useState<PDFDocument[]>([]);

  useEffect(() => {
    const fetchPDFs = async () => {
      const query = `*[_type == "pdfDocument"] {
        title,
        summary,
        "pdfUrl": pdfFile.asset->url,
        "thumbnailUrl": thumbnail.asset->url
      }`;

      try {
        const response = await fetch(`${proxyUrl}?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        setPdfs(data.result || []);
      } catch (error) {
        console.error("Error fetching PDFs:", error);
      }
    };

    fetchPDFs();
  }, []);

  return (
    <section className="py-10 my-10 bg-gradient-to-r rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-black py-2 mb-6 text-center shadow-lg">Featured Notes</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdfs.map((pdf, index) => (
                <div
                key={index}
                className="bg-black bg-opacity-80 rounded-md shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                <PDFThumbnail pdfUrl={pdf.pdfUrl} />
                <div className="p-4">
                    <h3 className="text-xl font-semibold text-white text-bold">{pdf.title}</h3>
                    <p className="mt-2 text-white">{pdf.summary}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
    </section>

  );
};

export default FeatureSection;
