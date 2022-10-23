const SingleFile = require("../models/singleFile");
const MultipleFiles = require("../models/multipleFiles");


// Upload a Single Track
const singleFileUpload = async (req, res, next) => {

    try {
        
        const file = new SingleFile ({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2),
            songTitle: req.body.title,
            artist: req.body.artist
        });
        await file.save();
        res.status(201).send("File uploaded successfully");
        
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


// Upload an Album
const multipleFilesUpload = async (req, res, next) => {
    try {
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
            fileName: element.originalname,
            filePath: element.path,
            fileType: element.mimetype,
            fileSize: fileSizeFormatter(element.size, 2)
        };
        filesArray.push(file);
        });
        console.log(filesArray);
        const multipleFiles = new MultipleFiles({
            albumTitle: req.body.title,
            files: filesArray,
            artist: req.body.artist
            
        })
       
        await multipleFiles.save();
        res.status(201).send("Files Uploaded Successfully");
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

// Retrieve all Single Tracks
const getAllSingleFiles = async (req, res, next) => {
    try {
        const files = await SingleFile.find();
        res.status(200).send(files);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

// Retrieve All Albums
const getAllMultipleFiles = async (req, res, next) => {
    try{
        const files = await MultipleFiles.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}

// Format the size of the File
const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

module.exports = {
    singleFileUpload,
    multipleFilesUpload,
    getAllSingleFiles,
    getAllMultipleFiles
}