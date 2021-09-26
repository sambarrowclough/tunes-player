import { useRouter } from 'next/router'
import Link from 'next/link'
// const Post = () => {
//   const router = useRouter()
//   const { pid, id } = router.query
//   console.log(router.query)

//   return <p>Post: {id}</p>
// }

// export default Post
import Head from 'next/head'
import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import { useApp } from '@/utils/useApp'

// Import components
import Player from '../../components/Player'
import Song from '../../components/Song'
import Library from '../../components/Library'
import Nav from '../../components/Nav'
import Credit from '../../components/Credit'

export default function Home({}) {
  const { songs, currentSong, setCurrentSong } = useApp()
  // const { currentSong, setCurrentSong } = useState()
  const { loading, setLoading } = useState(true)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        <App
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          loading={loading}
        />
      }
    </div>
  )
}

const App = ({}) => {
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

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      if (isPlaying) {
        audioRef.current.play()
        // const newSong = songs?.find(x => x.id == id)
        // songs?.length && setCurrentSong(newSong)
      } else {
      }
      //console.log(newSong)
      //songs?.length && setCurrentSong(songs.find(x => x.id == id))
    }
  }, [songs, id])

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
  if (!currentSong) return ''

  //console.log(currentSong)
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
    <div className="flex flex-col">
      {/* <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        id={currentSong.id}
      /> */}
      <Link href="/">
        <div className="flex items-center mb-7">
          <svg
            width="18"
            height="18"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div className="text-lg text-gray-700 ml-1">Library</div>
        </div>
      </Link>
      <div className="flex">
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

        {/* <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      /> */}

        <Credit />
        <audio
          onLoadedMetadata={updateTimeHandler}
          onTimeUpdate={updateTimeHandler}
          onEnded={songEndHandler}
          ref={audioRef}
          src={currentSong.audio}
        />
      </div>
    </div>
  )
}

const AppContainer = styled.div`
  transition: all 0.5s ease;
  display: flex;
`

// export async function getServerSideProps(context) {
//   const song = await fetch(
//     'https://sounds-visualizer-api.sambarrowclough.repl.co/v2/songs/' +
//       context.query.id
//   ).then(r => r.json())
//   return {
//     props: { song } // will be passed to the page component as props
//   }
// }
