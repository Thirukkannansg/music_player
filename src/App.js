import React, {useState, useRef} from "react"
import Song from './components/Song';
import Player from './components/Player';
import "./styles/app.scss";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";
import { playAudio } from "./util";

function App() {

  const audioRef = useRef(null);
  
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false)
  const [upcomingSongs, setUpcomingSongs] = useState(currentSong);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    totalDuration: 0,
  });

  const [libraryStatus, setLibraryStatus] = useState(false)
  
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);

    
    setSongInfo({currentTime: current, totalDuration: duration,});
  }

  const animationPercentage = (songInfo.currentTime / songInfo.totalDuration) * 100

  const songEndHandler = () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    setCurrentSong(songs[currentIndex + 1]);

    playAudio(isPlaying, audioRef)
  }
 
  return (
    <div className={`App ${libraryStatus ? 'library-active' : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}/>
      <Player animationPercentage={animationPercentage} setSongs={setSongs} libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} setCurrentSong={setCurrentSong} songs={songs} songInfo={songInfo}  audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} />
      <Library libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} songs ={songs} setSongs={setSongs} audioRef={audioRef} isPlaying={isPlaying} setSongInfo={setSongInfo} setCurrentSong={setCurrentSong} currentSong={currentSong} />
    
      <audio onEnded={songEndHandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
