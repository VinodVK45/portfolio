import multer from "multer";

/*
  4K image sizes (safe):
  - JPEG: ~8–12MB
  - PNG: ~20–30MB
*/
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 30 * 1024 * 1024, // ✅ 30MB (4K SAFE)
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files allowed"), false);
      return;
    }
    cb(null, true);
  },
});

export default upload;
