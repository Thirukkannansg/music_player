import React, { useEffect } from 'react';
import { playAudio } from '../util';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlay, faAngleRight, faAngleLeft, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({animationPercentage ,currentSong, setSongs, setCurrentSong, songs, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, libraryStatus, setLibraryStatus}) => {

  useEffect(() => {
    const newActiveSong = songs.map((s) => {
      if(s.id === currentSong.id) {
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
  }, [currentSong])

  const playSong = () => {
    // console.log(isPlaying);
    if(isPlaying) {
      audioRef.current.pause(); 
      setIsPlaying(false);
      
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  const formatTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }

  const dragInput = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime: e.target.value});
  }

  const skipTrackhandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if(direction === "skip-forward") {
      setCurrentSong(songs[currentIndex + 1]);

      if(currentIndex + 1 > [5]) {
        setCurrentSong(songs[0])
      }
    }
    if(direction === "skip-back") {
      setCurrentSong(songs[currentIndex - 1]);

      if(songs[currentIndex - 1] === undefined) {
        setCurrentSong(songs[5])
      }
    }

    playAudio(isPlaying, audioRef);
  }

  const trackAnimation = {
    transform: `translateX(${animationPercentage}%)`
  }
  
  return (

    <div className='player'>

        <div className="time-control">
            <p>{formatTime(songInfo.currentTime)}</p>

            <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className='track'>
              <input onInput={dragInput} onChange={dragInput} min={0} max={songInfo.totalDuration || 0} value={songInfo.currentTime} type="range" />
              <div style={trackAnimation} className="animate-track"></div>
            </div>
            
            <p>{songInfo.totalDuration ? formatTime(songInfo.totalDuration) : "0:00"}</p>
        </div>

        <div className="play-control">
            <FontAwesomeIcon onClick={() => skipTrackhandler("skip-back")} className="skip-back" size="2x" icon={ faAngleLeft } />
            <FontAwesomeIcon onClick={playSong} className="play" size="2x" icon={ isPlaying ? faPause : faPlay } />
            <FontAwesomeIcon onClick={() => skipTrackhandler("skip-forward")} className="skip-forward" size="2x" icon={ faAngleRight } />
        </div>
    </div>

  )
}

export default Player