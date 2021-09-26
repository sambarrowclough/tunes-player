import Head from 'next/head'
import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
// Import components
import Player from '../components/Player'
import Song from '../components/Song'
import Library from '../components/Library'
import Nav from '../components/Nav'
import Credit from '../components/Credit'
import { useApp } from '@/utils/useApp'
import { useRouter } from 'next/router'

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

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black'
  }
  // More products...
]

export const App = () => {
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

  // useEffect(() => {
  //   if (id) {
  //     const found = songs.find(x => x.id == id)
  //     if (found && songs?.length) setCurrentSong(found)
  //   }
  // }, [songs])

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(!isPlaying)
    } else {
      audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

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
      {/* <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        id={currentSong.id}
      /> */}

      {/* <Song currentSong={currentSong} /> */}

      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Library
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {songs.map((song, i) => (
              <div
                onMouseOver={() =>
                  document
                    .querySelectorAll('.play-item')
                    [i].classList.remove('hidden')
                }
                onMouseLeave={() =>
                  document
                    .querySelectorAll('.play-item')
                    [i].classList.add('hidden')
                }
                key={song.id}
                className="group relative"
              >
                <div className="relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:aspect-none">
                  <img
                    src={song.cover}
                    // alt={product.imageAlt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full "
                  />
                  <div
                    onClick={async e => {
                      e.stopPropagation()
                      e.preventDefault()
                      // playSongHandler()
                      console.log(song)
                      await setCurrentSong(song)
                      audioRef.current.play()
                      // const curSong = song
                      // const songList = songs

                      // const newSongs = songList.map(song => {
                      //   if (song.id === curSong.id) {
                      //     return {
                      //       ...song,
                      //       active: true
                      //     }
                      //   } else {
                      //     return {
                      //       ...song,
                      //       active: false
                      //     }
                      //   }
                      // })
                      // setSongs(newSongs)

                      // check if user is wanting to play a song.
                      if (true) {
                      }
                    }}
                    className="bg-white flex rounded-full p-2 absolute top-5 left-5 hidden play-item cursor-default transition-all z-10 hover:scale-105"
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a
                        className="cursor-pointer "
                        onClick={() => {
                          router.push('/songs/' + song.id)
                        }}
                      >
                        <span aria-hidden="true" className="absolute inset-0" />
                        {song.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {/* {product.color} */}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {/* {product.price} */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
`
