// pages/api/pdf.js
import fetch from 'node-fetch';

export default async (req, res) => {
  const { pdfUrl } = req.query;

  try {
    const response = await fetch(pdfUrl);
    const pdfBuffer = await response.buffer();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error fetching PDF:', error);
    res.status(500).send('Error fetching PDF');
  }
};
