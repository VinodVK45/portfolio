import multer from "multer";

/* ===============================
   MEMORY STORAGE (Cloudinary)
================================ */
const storage = multer.memoryStorage();

/* ===============================
   4K IMAGE SAFE LIMIT
   JPG: 5–8MB
   PNG: 10–25MB
================================ */
const upload = multer({
  storage,
  limits: {
    fileSize: 30 * 1024 * 1024, // ✅ 30 MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(
        new Error("Only image files are allowed"),
        false
      );
    }
    cb(null, true);
  },
});

/* ===============================
   EXPORT MULTER INSTANCE
================================ */
export default upload;
