const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for Tracks
const singleFileSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    filePath : {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    },
    songTitle: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    }
}, {timeStamps: true});

module.exports = mongoose.model("SingleFile", singleFileSchema)