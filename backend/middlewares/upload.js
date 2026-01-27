import multer from "multer";

/*
  ✅ MEMORY STORAGE (required for Cloudinary)
*/
const storage = multer.memoryStorage();

/*
  ✅ 4K IMAGE SAFE LIMIT
  Max ~30MB (covers PNG + high quality JPG)
*/
const upload = multer({
  storage,

  limits: {
    fileSize: 30 * 1024 * 1024, // 🔥 30 MB
  },

  fileFilter: (req, file, cb) => {
    // 🔒 Allow images only
    if (!file.mimetype.startsWith("image/")) {
      return cb(
        new Error("Only image files are allowed"),
        false
      );
    }
    cb(null, true);
  },
});

/*
  ✅ GLOBAL ERROR HANDLER FOR MULTER
  (prevents silent crashes → 500)
*/
export default (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("MULTER ERROR:", err.message);

      return res.status(400).json({
        message: err.message || "Image upload failed",
      });
    }
    next();
  });
};
