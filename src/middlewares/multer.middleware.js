import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
   cb(null, file.filename) // originalname ki jagah bhot features milte hai check it out like file.size file.path etc.
  }
})
// storage is a method
export const upload = multer({
    storage,
})


