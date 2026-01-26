import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  // 🔥 SUPPORT 4K / HQ IMAGES
  limits: {
    fileSize: 20 * 1024 * 1024, // ✅ 20 MB
  },

  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

export default upload;
