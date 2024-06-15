import React from "react";
import PDFThumbnail from "./thumbnail";

const RecentSection: React.FC = () => {
    return (
      <>
        <section className="recent-notes py-10 bg-gray-100 dark:bg-secondary rounded-xl"
          style={{
              backgroundImage: "url('/featured_bg.svg')",
              backgroundSize: 'cover',
              backgroundPosition: 'bottom',
          }}
        >
          <div className="recent max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6 shadow-xl">Recent Notes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="note-card p-4 bg-white shadow rounded-md dark:bg-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                  <PDFThumbnail pdfUrl={"https://dricandpeter.blob.core.windows.net/pdfblob/seed-mixes.pdf"}></PDFThumbnail>
                  <h3 className="text-xl font-bold">Note 1</h3>
                  <p className="mt-2">Summary of Note 1...</p>
              </div>

              <div className="note-card p-4 bg-white shadow rounded-md dark:bg-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                  <PDFThumbnail pdfUrl={"https://dricandpeter.blob.core.windows.net/pdfblob/123123123123.pdf"}></PDFThumbnail>
                  <h3 className="text-xl font-bold">Note 2</h3>
                  <p className="mt-2">Summary of Note 2...</p>
              </div>

              <div className="note-card p-4 bg-white shadow rounded-md dark:bg-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                  <PDFThumbnail pdfUrl={"https://dricandpeter.blob.core.windows.net/pdfblob/PeterHuangResumeV1.docx (1).pdf"}></PDFThumbnail>
                  <h3 className="text-xl font-bold">Note 3</h3>
                  <p className="mt-2">Summary of Note 3...</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}
export default RecentSection;