
const multer  = require('multer');
const path = require("path");

// Configure Disk Storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
         cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

// Filter the kind of files stored
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "audio/aac" || file.mimetype === "audio/mpeg" 
    || file.mimetype === "audio/wav" ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

// Configure Multer
const upload = multer({
    storage:storage,
    fileFilter: fileFilter
});

module.exports = {upload};