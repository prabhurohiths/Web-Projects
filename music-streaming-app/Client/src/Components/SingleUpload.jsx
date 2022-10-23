import React, {useState} from "react";
import {Box, Button, TextField} from '@mui/material';
import {singleFileUpload} from "../data/api";


function SingleUpload(){
    const [singleFile, setSingleFile] = useState("");
    const [uploaded, setUploaded] = useState(false);
    const [songTitle, setSongTitle] = useState("");
    const [artistName, setArtistName] = useState("");
    
    const singleFileChange = (event) => {
        setSingleFile(event.target.files[0]);
    }
    const setTitle = (event) => {
        setSongTitle(event.target.value);
    }
    const setArtist = (event) => {
      setArtistName(event.target.value);
    }

    const uploadSingleFile = async () => {
        
        const formData = new FormData();
        formData.append("file", singleFile);
        formData.append("title", songTitle);
        formData.append("artist", artistName);
        console.log(formData);
        await singleFileUpload(formData);
        setUploaded(true);
        console.log(singleFile);

    }

   
    return (
      <Box>
        {uploaded ? (
          <>
            <Box className="container uploaded">
              <h1>
                Congratulations! Your song is uploaded! Would you like to
                display all singles?
              </h1>
              <Box className="uploaded-btn">
                <a href="/displaySongs">
                  <Button color="warning" variant="contained">
                    Yes, take me there
                  </Button>
                </a>
              </Box>

              <Box className="uploaded-btn">
                <a href="/singleUpload">
                  <Button color="warning" variant="contained">
                    No, I want to upload another track
                  </Button>
                </a>
              </Box>
            </Box>
          </>
        ) : (<>
          <Box className="container">
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <h1> Tell us more about your track! </h1>
              <TextField
                label="Track Title"
                variant="outlined"
                name="trackTitle"
                margin="dense"
                fullWidth
                required
                onChange={(event) => setSongTitle(event.target.value)}
              />
              <TextField
                label="Artist Name"
                variant="outlined"
                name="artistName"
                margin="dense"
                fullWidth
                required
                onChange={setArtist}
              />
              <label>Select a file: </label>
              <input
                type="file"
                name="file"
                onChange={singleFileChange}
                accept="audio/mp3,audio/aac,audio/wav,audio/mpeg"
              />
              <Button
                className="submitButton"
                type="submit"
                variant="contained"
                fullWidth
                onClick={uploadSingleFile}
              >
                Upload!
              </Button>
            </form>
          </Box>
          </>
        )
      
        }
        </Box>
    );
  
    
}

export default SingleUpload;