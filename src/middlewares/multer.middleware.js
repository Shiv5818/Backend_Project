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
export const upload = multer({storage})


/*
multer does NOT validate:
File exists?
File size?
File type?
Avatar required?
Cover image required?
What If Upload Fails?

Interesting question.

Suppose:

Disk full
Folder missing
Permission denied
Multer throws error.

Example:
MulterError
or
ENOENT
then controller never executed 
*/
