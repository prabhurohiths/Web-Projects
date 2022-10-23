import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { multipleFilesUpload } from "../data/api";


function MultipleUpload() {
  const [multipleFiles, setMultipleFiles] = useState("");
  const [title, setTitle] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [artistName, setArtistName] = useState("");
  
  const [numberOfSongs, setNumber] = useState(1);
  
  const [songTitle, setSongTitle] = useState("");
  const [titlesArray, setTitlesArray] = useState([]);
  
  const multipleFileChange = (event) => {
    setMultipleFiles((prev) => [...prev, event.target.files[0]]);
  };

  const setArtist = (event) => {
    setArtistName(event.target.value);
  };
  const handleNumberOfSongs = (event) => {
      setNumber(event.target.value);
 
  };
  const createTitlesArray = () => {
    setTitlesArray((prev) => [...prev, songTitle ])
  }
  const displayOptions = () => {
    let menuItems = [];

    for (let i=1; i<=10; i++) {
      menuItems.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    return menuItems;
  }
  const displayInputs = () => {
    let inputs = [];
  
    for (let i = 0; i < numberOfSongs; i++) {
      inputs.push(
        <Box>
          <TextField
            label="Track Title"
            variant="outlined"
            name="trackName"
            margin="dense"
            fullWidth
            required
            onChange={event => setSongTitle(event.target.value)}
            onFocus={event => setSongTitle("")}
          />
          <br/>
          <input
            type="file"
            name="files"
            onChange={multipleFileChange}
            accept="audio/mp3,audio/aac,audio/wav,audio/mpeg"
          />
          <Button
          onClick={createTitlesArray}>
            Confirm
          </Button>
        </Box>
      );
    }
    return inputs;
  };

  const uploadMultipleFiles = async (event) => {
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artistName);
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }
    await multipleFilesUpload(formData);
    console.log(titlesArray);

    setUploaded(true);
  };
  return (
    <Box>
      {uploaded ? (
        <Box class="container upload-success">
          <h1>
            Congratulations! Your Album is uploaded! Would you like to display
            all Albums?
          </h1>
          <a href="/displaySongs">
            <Button class="upload-success-options"> Yes, take me there </Button>
          </a>
          <a href="/multipleUpload">
            <Button class="upload-success-options"> No, I want to upload another Album </Button>
          </a>
        </Box>
      ) : (
        <Box className="container">
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1> Tell us more about your Album! </h1>
            <TextField
              label="Album Title"
              variant="outlined"
              name="title"
              margin="dense"
              fullWidth
              required
              onChange={(event) => {
                setTitle(event.target.value);
              }}
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
            <InputLabel id="number-of-inputs-label">How many tracks? </InputLabel>
            <Select
              labelId="number-of-inputs-label"
              value={numberOfSongs}
              label="Number"
              onChange={handleNumberOfSongs}
              fullWidth
            >
              {displayOptions()}
            </Select>
            <br/>
            <label for="files">Select files: </label>
            {displayInputs()}
            {/* <input
              type="file"
              name="files"
              onChange={multipleFileChange}
              accept="audio/mp3,audio/aac,audio/wav,audio/mpeg"
            />
            <input
              type="file"
              name="files"
              onChange={multipleFileChange}
              accept="audio/mp3,audio/aac,audio/wav,audio/mpeg"
            />
            <input
              type="file"
              name="files"
              onChange={multipleFileChange}
              accept="audio/mp3,audio/aac,audio/wav,audio/mpeg"
            />
            <input
              type="file"
              name="files"
              onChange={multipleFileChange}
              accept="audio/mp3,audio/aac,audio/wav,audio/mpeg"
            />
            <input
              type="file"
              name="files"
              onChange={multipleFileChange}
              accept="audio/mp3,audio/aac,audio/wav,audio/mpeg"
            /> */}

            <Button
              className="submitButton"
              type="submit"
              variant="contained"
              fullWidth
              onClick={uploadMultipleFiles}
            >
              Upload!
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
}

export default MultipleUpload;
