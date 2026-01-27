import multer from "multer";

/*
  ✅ 4K IMAGE SIZE EXPLANATION
  ---------------------------
  4K image (3840x2160):
  - JPEG/WebP: 2–6 MB
  - PNG: 6–15 MB
  - RAW / HQ PNG: can reach 20–25 MB

  👉 We allow up to 25 MB safely
*/

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    fileSize: 25 * 1024 * 1024, // ✅ 25 MB (4K SAFE)
  },

  fileFilter: (req, file, cb) => {
    // ✅ Accept only images
    if (!file.mimetype.startsWith("image/")) {
      return cb(
        new Error("Only image files are allowed"),
        false
      );
    }

    cb(null, true);
  },
});

export default upload;
