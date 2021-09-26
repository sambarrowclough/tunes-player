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
import { usePlayer } from '@/utils/usePlayer'
import { useClipboard } from '@geist-ui/react'
import 'vercel-toast/dist/vercel-toast.css'
import { createToast } from 'vercel-toast'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Tunes Player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <App />
    </div>
  )
}

export const App = () => {
  // Ref

  //const { loading } = useApp()
  const { songs, load, setCurrentSong, skipTrackHandler, loading } = useApp()

  const router = useRouter()
  const { id } = router.query

  const playSong = async song => {
    load(song.audio)
    await setCurrentSong(song)
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
        <svg
          width="30"
          height="30"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.49991 0.877075C3.84222 0.877075 0.877075 3.84222 0.877075 7.49991C0.877075 11.1576 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1576 14.1227 7.49991C14.1227 3.84222 11.1576 0.877075 7.49991 0.877075ZM1.82708 7.49991C1.82708 4.36689 4.36689 1.82707 7.49991 1.82707C10.6329 1.82707 13.1727 4.36689 13.1727 7.49991C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49991ZM8.37287 7.50006C8.37287 7.98196 7.98221 8.37263 7.5003 8.37263C7.01839 8.37263 6.62773 7.98196 6.62773 7.50006C6.62773 7.01815 7.01839 6.62748 7.5003 6.62748C7.98221 6.62748 8.37287 7.01815 8.37287 7.50006ZM9.32287 7.50006C9.32287 8.50664 8.50688 9.32263 7.5003 9.32263C6.49372 9.32263 5.67773 8.50664 5.67773 7.50006C5.67773 6.49348 6.49372 5.67748 7.5003 5.67748C8.50688 5.67748 9.32287 6.49348 9.32287 7.50006Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    )

  const { copy } = useClipboard()
  return (
    <AppContainer>
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

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8">
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
                <div className="flex relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:aspect-none">
                  <a
                    className="cursor-pointer"
                    onClick={() => {
                      router.push('/songs/' + song.id)
                    }}
                  >
                    <img
                      src={song.cover}
                      // alt={product.imageAlt}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full "
                    />

                    <div
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        playSong(song)
                      }}
                      className="bg-white flex rounded-full border-gray-700 text-gray-900 p-3 absolute top-5 left-5 hidden play-item cursor-default transition-all z-10 hover:scale-105"
                    >
                      <svg
                        width="30"
                        height="30"
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
                  </a>
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <div className="flex items-center justify-between">
                        <p className="mt-1 text-xs text-gray-400 mb-2">
                          {song.plays} plays
                        </p>
                        {(() => {
                          return (
                            <svg
                              className="cursor-pointer"
                              onClick={e => {
                                e.preventDefault()
                                e.stopPropagation()
                                let songUrl =
                                  window.location + '/songs/' + song.id
                                copy(songUrl)
                                createToast(
                                  `Copied ${song.name} to clipboard!`,
                                  { type: 'success', timeout: 2000 }
                                )
                              }}
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                                fill="currentColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          )
                        })()}
                      </div>
                      <span aria-hidden="true" className="">
                        {' '}
                        {song.name}
                      </span>
                    </h3>
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
    </AppContainer>
  )
}

const AppContainer = styled.div`
  transition: all 0.5s ease;
`
