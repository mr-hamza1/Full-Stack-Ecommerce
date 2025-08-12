import multer from 'multer';

// ✅ Use memory storage so you can read file.buffer
const storage = multer.memoryStorage();

const multerUpload = multer({
    storage, // <-- IMPORTANT
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB per file
        files: 5 // Maximum 5 files
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// For multiple image uploads
const multipleUpload = multerUpload.array("images", 5);

// For single image upload
const singleUpload = multerUpload.single("image");

export { multipleUpload, singleUpload };
