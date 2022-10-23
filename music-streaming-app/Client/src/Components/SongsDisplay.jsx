import React, {useState, useEffect} from "react";
import {Box} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import {getSingleFiles, getMultipleFiles, getUser} from "../data/api";
import {authenticate} from "../data/authoriseFunctions";

import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'


function SongsDisplay(props){
    
    const [multipleFiles, setMultipleFiles] = useState([]);
    const [singleFiles, setSingleFiles] = useState([]);
    const [name, setName] = useState("");
    const [source, setSource] = useState("");
    const [singer, setSinger] = useState("");

    let audioList = [{
        name: name,
        musicSrc: source,
        singer: singer
    }];
    
    const setSong = async (fName) => {
        console.log(fName);
        const requiredFile = singleFiles.find( ({ fileName }) => fileName === fName );
        let path = convertString(
          "https://trusic.herokuapp.com/" + requiredFile.filePath
        );
        setSource(path);
        setName(requiredFile.songTitle);
        setSinger(requiredFile.artist);
    }
    const playAlbum = async(fName, album) => {
        console.log(fName);
        console.log(album);
        const requiredFile = album.files.find( ({ fileName }) => fileName === fName );
        console.log(requiredFile);
        let path = convertString(
          "https://trusic.herokuapp.com/" + requiredFile.filePath
        );
        setName(requiredFile.fileName);
        setSource(path);
        setSinger(requiredFile.artist);
    }
    
     
    const convertString = (path) => {
        path = path.replace(/\\/g, "/");
        path = path.replace(/ /g, "%20");
        return path;
    }
    
    const getSingleFilesList = async () => {
        try {
            const filesList = await getSingleFiles();
            setSingleFiles(filesList);
         
        }
        catch (err) {
            console.log(err);
        }
    }
    const getMultipleFilesList = async () => {
        try {
            const filesList = await getMultipleFiles();
            setMultipleFiles(filesList);
        
        }
        catch (err) {
            console.log(err);
        }
    }
    const receiveUser = async() => {
        try {
            const receivedData = await getUser();

            if (receivedData.message === "Not logged in") {
                props.setLoggedIn(false);
            }
            else if (receivedData._id) {
                authenticate();
                props.setLoggedIn(true);
            }
            else {
                console.log(receivedData);
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getSingleFilesList();
        getMultipleFilesList();
        receiveUser();
        
        
    }, []);
    
    function Display() {
        return <Box className="music-player">
     <Box className="container singleTracks-area">
      <h1>Single Tracks</h1>
        {singleFiles.map((file) => {
            return <Box className="tracks">
                <Box key={file._id} className="songDisplay" value={file.fileName}>
                <FontAwesomeIcon icon={faPlayCircle} className="play-icon" onClick={() => {setSong(file.fileName)}}/>
                <h4 className="song-title">{file.songTitle}</h4>
                <p className="artist-name">{file.artist}</p>
                </Box>
            </Box>
        })}
        </Box>
        <Box>
        <Box className="container album-area">
        <h1>Albums</h1>
        {multipleFiles.map((album) => {
        return <Box>
            <Box key={album._id} className="albumTitle">
                <h3>{album.albumTitle}</h3>
            </Box>
            <Box className="tracks">
                {album.files.map((file) => {
                    return <Box className="tracks">
                <Box key={file._id} className="songDisplay" value={file.fileName}>
                <FontAwesomeIcon icon={faPlayCircle} className="play-icon" onClick={() => {playAlbum(file.fileName, album)}}/>
                <h4 className="song-title">{file.fileName.slice(0,40) + "..."}</h4>
                <p className="artist-name">{album.artist}</p>
                </Box>
            </Box>
                })}
            </Box>
            </Box>
        })}
    </Box>
    </Box>
    <ReactJkMusicPlayer
      quietUpdate
      clearPriorAudioLists
      audioLists={audioList}
      theme="auto"
      mode="full"
      autoHiddenCover
      spaceBar
      toggleMode = {false}
      showMiniProcessBar = {true}
      showDownload = {false}
      showThemeSwitch = {false}
      responsive={false}
    />

    </Box>
    }

    return [audioList, Display]
    
}

export default SongsDisplay;
