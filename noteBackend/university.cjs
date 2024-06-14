// Assuming you're using Node.js with Express
const express = require('express');
const app = express();

// Mock database of universities
const universities = [
  { name: "University of Alberta", uid: "eb88e979-c5d4-486a-98de-aa4e62136916" },
  { name: "Harvard University", uid: "15b3106b-5db6-43c1-90ab-150627440648" },
  { name: "Stanford University", uid: "bc924826-8033-4b0b-9605-9a02cebf3e27" },
  { name: "University of Toronto", uid: "26e248ac-a76c-4a5d-acb2-162adb20ba3c" }
];

app.get('/api/getAllUniversities', (res) => {
  res.json(universities);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



//testing university realtime 