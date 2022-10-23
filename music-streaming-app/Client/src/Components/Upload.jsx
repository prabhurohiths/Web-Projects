import React from "react";
import {Box, Button} from '@mui/material';


function Upload(){

  
    return  <Box className= "container">
        <Box className="upload-box" >
          <h1> Hi! Do you want to upload a Single track or an Album? </h1>
          <a href="/singleUpload">
          <Box className="uploadOptions">
            Single
          </Box>
           </a>
           <a href="/multipleUpload">
          <Box className="uploadOptions">
            Album
           </Box>
           </a>
        </Box>
    </Box>
  
    
}

export default Upload;