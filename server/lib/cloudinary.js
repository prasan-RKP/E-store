import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Resolve image directory
const imageDir = path.resolve(process.cwd(), 'public/slider');

// Ensure the directory exists
if (!fs.existsSync(imageDir)) {
  console.error(`❌ Directory not found: ${imageDir}`);
  process.exit(1);
}

// Read and filter image files
const imageFiles = fs.readdirSync(imageDir).filter(file =>
  ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase())
);

// Upload images to Cloudinary
const uploadImages = async () => {
  const uploadedData = [];

  for (const file of imageFiles) {
    const filePath = path.join(imageDir, file);
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'ecom_store/slider', // Cloudinary folder
      });

      //console.log(`✅ Uploaded: ${file}`);
      uploadedData.push({ name: file, url: result.secure_url });
    } catch (err) {
      console.error(`❌ Failed to upload ${file}:`, err.message || err);
    }
  }

  // Optional: write the uploaded data to a JS file
  
  const jsFileContent = `export const manImages = ${JSON.stringify(uploadedData, null, 2)};`;
  const outputPath = path.resolve(process.cwd(), 'assets/slider.js');
  fs.writeFileSync(outputPath, jsFileContent);
  //console.log(`🎉 All done! Data saved to ${outputPath}`);
  
};

// Run the uploader
uploadImages();
