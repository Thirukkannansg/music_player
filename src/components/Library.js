import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus, setLibraryStatus}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
        <h2>Library</h2>
        <div className="library-songs">
            {
                songs.map((song) => {
                    return (
                        <LibrarySong setLibraryStatus={setLibraryStatus} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} song={song} id={song.id} key={song.id} />
                    )
                })
            }
        </div>
    </div>
  )
}

export default Library