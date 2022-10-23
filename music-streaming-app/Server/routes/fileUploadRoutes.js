const {Router} = require("express");
const {upload} = require("../config/multerConfig");
const {singleFileUpload, multipleFilesUpload, getAllSingleFiles, getAllMultipleFiles} = require("../controllers/fileUploaderController");
const router = Router();

router.post("/singleFile", upload.single("file"), singleFileUpload);
router.post("/multipleFiles", upload.array("files"), multipleFilesUpload);
router.get("/getSingleFiles", getAllSingleFiles);
router.get("/getMultipleFiles", getAllMultipleFiles);





module.exports = {
    routes: router
}