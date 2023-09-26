const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "viet-tai-" + uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });
const uploadSingle = upload.single("file");
const uploadMultiple = upload.array("multiple");
module.exports = {
  uploadSingle,
  uploadMultiple,
};
