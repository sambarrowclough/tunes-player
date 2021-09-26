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
import { Button } from '@geist-ui/react'
import { useApp } from '@/utils/useApp'

// Import components
import Player from '../../components/Player'
import Song from '../../components/Song'
import Library from '../../components/Library'
import Nav from '../../components/Nav'
import Credit from '../../components/Credit'

export default function Home({ song }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>{song.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {<App song={song} />}
    </div>
  )
}

const App = ({ song }) => {
  // Ref

  const { load, setCurrentSong, currentSong } = useApp()
  let playing = false
  const router = useRouter()
  const { id } = router.query

  if (currentSong.id == id) {
    //alert(1)
  }

  // const [song, setSong] = useState({})

  // useEffect(() => {
  //   console.log(id, songs)
  //   if (id && songs.length) {
  //     const song = songs.find(x => x.id == id)
  //     setSong(song)
  //   } else if (id && songs.length === 0) {
  //     alert(1)
  //   }
  // }, [id, songs])

  //console.log(currentSong)

  return (
    <div className="container flex-col mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 items-center">
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
          <div className="text-gray-900 ml-1 text-md">Library</div>
        </div>
      </Link>
      <div className="flex flex-col md:flex-row">
        <img
          style={{ maxWidth: '300px' }}
          className="mr-4"
          src={song.cover}
        ></img>
        <div>
          <div className="flex font-bold text-2xl text-gray-900 mb-4">
            {song?.name}
          </div>

          {playing ? (
            <svg
              //onClick={handlePlayPause}
              width="80"
              height="80"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.04995 2.74998C6.04995 2.44623 5.80371 2.19998 5.49995 2.19998C5.19619 2.19998 4.94995 2.44623 4.94995 2.74998V12.25C4.94995 12.5537 5.19619 12.8 5.49995 12.8C5.80371 12.8 6.04995 12.5537 6.04995 12.25V2.74998ZM10.05 2.74998C10.05 2.44623 9.80371 2.19998 9.49995 2.19998C9.19619 2.19998 8.94995 2.44623 8.94995 2.74998V12.25C8.94995 12.5537 9.19619 12.8 9.49995 12.8C9.80371 12.8 10.05 12.5537 10.05 12.25V2.74998Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg
              onClick={() => {
                load(song.audio)
                setCurrentSong(song)
              }}
              className="bg-white border-2 border-gray-900 text-gray-900 p-3 rounded-full flex items-center"
              width="50"
              height="50"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z"
                fill="black"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          )}

          <Button
            onClick={() => {
              window.open(
                'https://opensea.io/assets/0x60d08dbded0bf56d21977b597793e69d1c5456e0/' +
                  song.id
              )
            }}
            target="_blank"
            type="secondary"
            mt={1.2}
            scale={1}
          >
            Buy on Open Sea
          </Button>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    let song = await fetch(
      'https://sounds-visualizer-api.sambarrowclough.repl.co/v2/songs/' +
        context.query.id
    ).then(r => r.json())

    return {
      props: { song } // will be passed to the page component as props
    }
  } catch (error) {
    console.log(error)
  }
}
