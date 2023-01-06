
import React from "react";
import { playAudio } from "../util"

const LibrarySong = ({song, setCurrentSong, songs, id, audioRef, isPlaying, setSongs, setLibraryStatus}) => {

    const songSelectHandler = () => {
        setCurrentSong(song);
        
        //Add active class

        const newActiveSong = songs.map((s) => {
            if(s.id === id) {
                return {
                    ...s,
                    active: true
                }
            } else {
                return {
                    ...s,
                    active: false
                }
            }
        })

        setSongs(newActiveSong);

       //Check if the song is currently playing
       playAudio(isPlaying, audioRef)

       
    }

    return(
    <div onClick={songSelectHandler} className={`library-song ${song.active ? "selected" : ""}` }>
            <img alt={song.name} src={song.cover}/>

            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
            
        </div>
    )
}

export default LibrarySong;