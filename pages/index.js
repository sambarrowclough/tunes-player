import Head from 'next/head'
import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

// Import components
import Player from '../components/Player'
import Song from '../components/Song'
import Library from '../components/Library'
import Nav from '../components/Nav'
import Credit from '../components/Credit'
import { useApp } from '@/utils/useApp'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <App />
    </div>
  )
}

const App = () => {
  // Ref

  const {
    songs,
    setSongs,
    loading,
    songInfo,
    libraryStatus,
    setLibraryStatus,
    currentSong,
    isPlaying,
    setIsPlaying,
    setCurrentSong,
    audioRef,
    setSongInfo
  } = useApp()

  // Functions
  const updateTimeHandler = e => {
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    setSongInfo({ ...songInfo, currentTime, duration })
  }

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id)
    let nextSong = songs[(currentIndex + 1) % songs.length]
    await setCurrentSong(nextSong)

    const newSongs = songs.map(song => {
      if (song.id === nextSong.id) {
        return {
          ...song,
          active: true
        }
      } else {
        return {
          ...song,
          active: false
        }
      }
    })
    setSongs(newSongs)

    if (isPlaying) {
      audioRef.current.play()
    }
  }

  if (loading)
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)'
        }}
      >
        loading a mood...
      </div>
    )

  return (
    <AppContainer libraryStatus={libraryStatus}>
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        id={currentSong.id}
      />

      <Song currentSong={currentSong} />

      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        setSongs={setSongs}
        id={currentSong.id}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />

      <Credit />
      <audio
        onLoadedMetadata={updateTimeHandler}
        onTimeUpdate={updateTimeHandler}
        onEnded={songEndHandler}
        ref={audioRef}
        src={currentSong.audio}
      />
    </AppContainer>
  )
}

const AppContainer = styled.div`
  transition: all 0.5s ease;
  margin-left: ${p => (p.libraryStatus ? '20rem' : '0')};
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`
