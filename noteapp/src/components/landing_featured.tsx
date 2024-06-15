import { useEffect, useRef, useState } from "react";
import PDFThumbnail from "./thumbnail";

const FeatureSection: React.FC = () => {
    const pdfUrl = ''//'https://dricandpeter.blob.core.windows.net/pdfblob/123.pdf#page=1';
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe && !iframeLoaded) {
            iframe.onload = () => {
                setIframeLoaded(true);
            };
            iframe.src = pdfUrl;
        }
    }, [iframeLoaded, pdfUrl]);

    return (
        <section
            className="featured-notes py-10 my-10 rounded-xl shadow-lg"
            style={{
                backgroundImage: "url('/featured_bg.svg')",
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
            }}
        >
            <div className="feature max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 drop-shadow-xl text-center">
                <h2 className="text-3xl font-bold mb-6 shadow-xl">Featured Notes</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="note-card p-4 bg-white shadow rounded-md dark:bg-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        <PDFThumbnail pdfUrl={"https://dricandpeter.blob.core.windows.net/pdfblob/seed-mixes.pdf"}></PDFThumbnail>
                        <h3 className="text-xl font-bold">Note 1</h3>
                        <p className="mt-2">Summary of Note 1...</p>
                    </div>

                    <div className="note-card p-4 bg-white shadow rounded-md dark:bg-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        <iframe
                            ref={iframeRef}
                            width="200px"
                            height="200px"
                            style={{ border: 'none', display: 'block', margin: 'auto', overflow: 'hidden'}}
                            loading="lazy"
                        ></iframe>
                        <h3 className="text-xl font-bold">Note 2</h3>
                        <p className="mt-2">Summary of Note 2...</p>
                    </div>

                    <div className="note-card p-4 bg-white shadow rounded-md dark:bg-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        <iframe
                            ref={iframeRef}
                            src={`https://dricandpeter.blob.core.windows.net/pdfblob/123.pdf#page=1`}
                            width="200px"
                            height="200px"
                            style={{ border: 'none', display: 'block', margin: 'auto', overflow: 'hidden'}}
                            loading="lazy"
                        ></iframe>
                        <h3 className="text-xl font-bold">Note 3</h3>
                        <p className="mt-2">Summary of Note 3...</p>
                    </div>
                </div>
                
            </div>
        </section>
    );
}

export default FeatureSection;
