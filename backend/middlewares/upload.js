import multer from "multer";

/*
  4K image sizes:
  - JPEG/PNG 4K ≈ 6–12 MB
  - Safe limit = 20 MB
*/

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // ✅ 20MB (4K safe)
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed"), false);
    }
    cb(null, true);
  },
});

export default upload;
