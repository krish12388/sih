const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

// Simulate OCR and challan generation
// Accept both image and video uploads
app.post('/api/generate-challan', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // If video, simulate multiple challans
  if (file.mimetype.startsWith('video/')) {
    // Simulate detection of multiple crimes in the video
    const challans = [
      {
        vehicleNumber: 'MH12AB1234',
        violation: 'Red Light Jump',
        date: new Date().toLocaleString(),
        fine: 1500,
        challanId: 'CHLN' + Math.floor(Math.random() * 1000000),
      },
      {
        vehicleNumber: 'MH14XY5678',
        violation: 'Overspeeding',
        date: new Date().toLocaleString(),
        fine: 1000,
        challanId: 'CHLN' + Math.floor(Math.random() * 1000000),
      }
    ];
    return res.json({ type: 'video', challans });
  }

  // If image, return a single challan
  res.json({
    type: 'image',
    challan: {
      vehicleNumber: 'MH12AB1234',
      violation: 'Red Light Jump',
      date: new Date().toLocaleString(),
      fine: 1500,
      challanId: 'CHLN' + Math.floor(Math.random() * 1000000),
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
