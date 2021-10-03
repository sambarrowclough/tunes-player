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
import { useClipboard, Tabs } from '@geist-ui/react'
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
  const { load, setCurrentSong, songsRef, loading } = useApp()
  const { copy } = useClipboard()
  const router = useRouter()
  const [playingSongIndex, setPlayingSongIndex] = useState(-1)
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

          <div className="mt-6">
            <Tabs initialValue="1">
              <Tabs.Item label="Latest" value="1">
                {songsRef.current
                  .sort((a, b) => (a.initialIndex > b.initialIndex ? 1 : -1))
                  .map((song, i) => (
                    <a
                      onClick={() => {
                        router.push('/songs/' + song.id)
                      }}
                      className="border-b-2 border-gray-50 py-5 flex items-center just"
                    >
                      {false ? (
                        <svg
                          //onClick={handlePlayPause}
                          width="20"
                          height="20"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.04995 2.74998C6.04995 2.44623 5.80371 2.19998 5.49995 2.19998C5.19619 2.19998 4.94995 2.44623 4.94995 2.74998V12.25C4.94995 12.5537 5.19619 12.8 5.49995 12.8C5.80371 12.8 6.04995 12.5537 6.04995 12.25V2.74998ZM10.05 2.74998C10.05 2.44623 9.80371 2.19998 9.49995 2.19998C9.19619 2.19998 8.94995 2.44623 8.94995 2.74998V12.25C8.94995 12.5537 9.19619 12.8 9.49995 12.8C9.80371 12.8 10.05 12.5537 10.05 12.25V2.74998Z"
                            fill="#666"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      ) : (
                        <div
                          onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            playSong(song)
                            setPlayingSongIndex(i)
                          }}
                          className="cursor-pointer"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
                              fill="#666"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      )}
                      <img
                        className="cursor-pointer rounded-full h-8 w-8 ml-4"
                        src={song.cover}
                      />
                      <div className="cursor-pointer text-sm text-gray-600 ml-4">
                        {song.name}
                      </div>

                      <div
                        style={{ display: 'flex', flexGrow: '1' }}
                        className="flex-grow-1"
                      ></div>
                      <button
                        onClick={e => {
                          e.preventDefault()
                          e.stopPropagation()
                          window.open(
                            'https://opensea.io/assets/0x60d08dbded0bf56d21977b597793e69d1c5456e0/' +
                              song.id
                          )
                        }}
                        target="_blank"
                        className="text-xs text-gray-400 ml-4 flex items-center"
                      >
                        <div className="mr-1">open sea</div>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645 8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z"
                            fill="#111"
                          ></path>
                        </svg>
                      </button>
                      <div className="text-xs text-gray-400 ml-4">
                        {song.plays} plays
                      </div>

                      {(() => {
                        return (
                          <svg
                            className="cursor-pointer ml-4"
                            onClick={e => {
                              e.preventDefault()
                              e.stopPropagation()
                              let songUrl =
                                window.location + '/songs/' + song.id
                              copy(songUrl)
                              createToast(`Copied ${song.name} to clipboard!`, {
                                type: 'success',
                                timeout: 2000
                              })
                            }}
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                              fill="#666"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        )
                      })()}
                    </a>
                  ))}
              </Tabs.Item>
              <Tabs.Item label="Popular" value="2">
                {songsRef.current
                  .sort((a, b) => (a.plays < b.plays ? 1 : -1))
                  .map((song, i) => (
                    <a
                      onClick={() => {
                        router.push('/songs/' + song.id)
                      }}
                      className="border-b-2 border-gray-50 py-5 flex items-center just"
                    >
                      {false ? (
                        <svg
                          //onClick={handlePlayPause}
                          width="20"
                          height="20"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.04995 2.74998C6.04995 2.44623 5.80371 2.19998 5.49995 2.19998C5.19619 2.19998 4.94995 2.44623 4.94995 2.74998V12.25C4.94995 12.5537 5.19619 12.8 5.49995 12.8C5.80371 12.8 6.04995 12.5537 6.04995 12.25V2.74998ZM10.05 2.74998C10.05 2.44623 9.80371 2.19998 9.49995 2.19998C9.19619 2.19998 8.94995 2.44623 8.94995 2.74998V12.25C8.94995 12.5537 9.19619 12.8 9.49995 12.8C9.80371 12.8 10.05 12.5537 10.05 12.25V2.74998Z"
                            fill="#666"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      ) : (
                        <div
                          onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            playSong(song)
                            setPlayingSongIndex(i)
                          }}
                          className="cursor-pointer"
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
                              fill="#666"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      )}
                      <img
                        className="cursor-pointer rounded-full h-8 w-8 ml-4"
                        src={song.cover}
                      />
                      <div className="cursor-pointer text-sm text-gray-600 ml-4">
                        {song.name}
                      </div>

                      <div
                        style={{ display: 'flex', flexGrow: '1' }}
                        className="flex-grow-1"
                      ></div>
                      <button
                        onClick={e => {
                          e.preventDefault()
                          e.stopPropagation()
                          window.open(
                            'https://opensea.io/assets/0x60d08dbded0bf56d21977b597793e69d1c5456e0/' +
                              song.id
                          )
                        }}
                        target="_blank"
                        className="text-xs text-gray-400 ml-4 flex items-center"
                      >
                        <div className="mr-1">open sea</div>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4V3ZM8.5 3.5H9C9 3.22386 8.77614 3 8.5 3V3.5ZM8 8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5H8ZM2.64645 8.64645C2.45118 8.84171 2.45118 9.15829 2.64645 9.35355C2.84171 9.54882 3.15829 9.54882 3.35355 9.35355L2.64645 8.64645ZM3.5 4H8.5V3H3.5V4ZM8 3.5V8.5H9V3.5H8ZM8.14645 3.14645L2.64645 8.64645L3.35355 9.35355L8.85355 3.85355L8.14645 3.14645Z"
                            fill="#111"
                          ></path>
                        </svg>
                      </button>
                      <div className="text-xs text-gray-400 ml-4">
                        {song.plays} plays
                      </div>

                      {(() => {
                        return (
                          <svg
                            className="cursor-pointer ml-4"
                            onClick={e => {
                              e.preventDefault()
                              e.stopPropagation()
                              let songUrl =
                                window.location + '/songs/' + song.id
                              copy(songUrl)
                              createToast(`Copied ${song.name} to clipboard!`, {
                                type: 'success',
                                timeout: 2000
                              })
                            }}
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z"
                              fill="#666"
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        )
                      })()}
                    </a>
                  ))}
              </Tabs.Item>
            </Tabs>
          </div>
        </div>
      </div>
    </AppContainer>
  )
}

const AppContainer = styled.div`
  transition: all 0.5s ease;
`
