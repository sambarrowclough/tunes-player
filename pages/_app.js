import 'tailwindcss/tailwind.css'
import './style.css'
import { useApp, UserContextProvider } from '@/utils/useApp'
import ReactPlayer from 'react-player'
import { useState, useRef, useEffect } from 'react'
import { usePlayer } from '@/utils/usePlayer'
import { supabase } from '@/utils/supabase'
import Link from 'next/link'

// Render a YouTube video player
function Duration({ className, seconds }) {
  return (
    <time dateTime={`P${Math.round(seconds)}S`} className={className}>
      {format(seconds)}
    </time>
  )
}

function format(seconds) {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`
  }
  return `${mm}:${ss}`
}

function pad(string) {
  return ('0' + string).slice(-2)
}

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Player />
      <Component {...pageProps} />
    </UserContextProvider>
  )
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )
}

const Player = ({}) => {
  const {
    played,
    duration,
    player,
    playing,
    load,
    handlePlayPause,
    handleSeekMouseDown,
    handleSeekChange,
    handleSeekMouseUp,
    url,
    setUrl,
    currentSongIndex,
    handlePlay,
    handleProgress,
    handleDuration,
    setCurrentSong,
    currentSong,
    setLoading,
    loading,
    songs,
    skipTrackHandler,
    tracked,
    setTracked,
    setPlaying
  } = useApp()

  useEffect(() => {
    const run = async () => {
      if (duration * played > 30 && !tracked) {
        console.log('counting play...', currentSong)
        const { error, data } = await supabase.from('plays').insert({
          id: uuidv4(),
          songName: currentSong.name,
          songId: currentSong.id
        })
        if (error) {
          console.error(error)
        }
        setTracked(!tracked)
      }
    }
    run()
  }, [duration, played])

  useEffect(() => {
    if (songs?.length) {
      load(songs[0].audio)
      setCurrentSong(songs[0])
      setPlaying(false)
    }
  }, [songs])

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
    <>
      <ReactPlayer
        ref={player}
        playing={playing}
        onPlay={handlePlay}
        onProgress={handleProgress}
        onDuration={handleDuration}
        url={url}
        onReady={() => setLoading(false)}
        onStart={() => {
          console.log('onStart')
          console.log(currentSong)
        }}
        onBuffer={() => console.log('onBuffer')}
        onSeek={e => console.log('onSeek', e)}
        onError={e => console.log('onError', e)}
        width="100%"
        height="100%"
        config={{ file: { forceAudio: true } }}
      />
      <div className="z-50 w-full border-b-2 border-gray-50 py-2 fixed top-0 bg-white">
        <div className="container flex mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 items-center">
          <Link href="/">
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
          </Link>
        </div>
      </div>
      <div className="z-50 w-full border-t-2 border-gray-50 py-2 fixed bottom-0 bg-white">
        <div className="container flex mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 items-center">
          <div className="controls flex items-center mr-6">
            <svg
              className="mr-2"
              onClick={() => skipTrackHandler('skip-back')}
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.94976 2.74989C1.94976 2.44613 2.196 2.19989 2.49976 2.19989C2.80351 2.19989 3.04976 2.44613 3.04976 2.74989V7.2825C3.0954 7.18802 3.17046 7.10851 3.26662 7.05776L12.2666 2.30776C12.4216 2.22596 12.6081 2.23127 12.7582 2.32176C12.9083 2.41225 13 2.57471 13 2.74995V12.25C13 12.4252 12.9083 12.5877 12.7582 12.6781C12.6081 12.7686 12.4216 12.7739 12.2666 12.6921L3.26662 7.94214C3.17046 7.89139 3.0954 7.81188 3.04976 7.7174V12.2499C3.04976 12.5536 2.80351 12.7999 2.49976 12.7999C2.196 12.7999 1.94976 12.5536 1.94976 12.2499V2.74989ZM4.57122 7.49995L12 11.4207V3.5792L4.57122 7.49995Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>

            {playing ? (
              <svg
                onClick={handlePlayPause}
                width="30"
                height="30"
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
                onClick={handlePlayPause}
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
            )}
            <svg
              className="ml-2"
              onClick={() => skipTrackHandler('skip-forward')}
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0502 2.74989C13.0502 2.44613 12.804 2.19989 12.5002 2.19989C12.1965 2.19989 11.9502 2.44613 11.9502 2.74989V7.2825C11.9046 7.18802 11.8295 7.10851 11.7334 7.05776L2.73338 2.30776C2.5784 2.22596 2.3919 2.23127 2.24182 2.32176C2.09175 2.41225 2 2.57471 2 2.74995V12.25C2 12.4252 2.09175 12.5877 2.24182 12.6781C2.3919 12.7686 2.5784 12.7739 2.73338 12.6921L11.7334 7.94214C11.8295 7.89139 11.9046 7.81188 11.9502 7.7174V12.2499C11.9502 12.5536 12.1965 12.7999 12.5002 12.7999C12.804 12.7999 13.0502 12.5536 13.0502 12.2499V2.74989ZM3 11.4207V3.5792L10.4288 7.49995L3 11.4207Z"
                fill="currentColor"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>

          <Duration
            className="text-gray-500 text-sm mr-2"
            seconds={duration * played}
          />
          {/* <progress max={1} value={played} /> */}
          {/* <StyledSlider
            onMouseDown={console.log}
            defaultValue={[0]}
            max={0.999999}
            step={0.000001}
            // value={[played]}

            onValueChange={e => handleSeekChange(e[0].toString())}
            aria-label="Volume"
            // onChange={console.log}
          >
            <StyledTrack>
              <StyledRange />
            </StyledTrack>
            <StyledThumb />
          </StyledSlider> */}
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={e => handleSeekChange(e.target.value)}
            onMouseUp={handleSeekMouseUp}
          />
          <Duration className="text-gray-500 text-sm ml-2" seconds={duration} />
          <Link className="cursor-pointer" href={'/songs/' + currentSong.id}>
            <div className="ml-4 text-gray-800 text-sm">{currentSong.name}</div>
          </Link>
          {loading ? 'loading audio...' : ''}
        </div>
      </div>
    </>
  )
}

import React from 'react'
import { styled } from '@stitches/react'
import { violet, blackA } from '@radix-ui/colors'
import * as SliderPrimitive from '@radix-ui/react-slider'

const StyledSlider = styled(SliderPrimitive.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: 400,

  '&[data-orientation="horizontal"]': {
    height: 20
  },

  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    width: 20,
    height: 100
  }
})

const StyledTrack = styled(SliderPrimitive.Track, {
  backgroundColor: blackA.blackA10,
  position: 'relative',
  flexGrow: 1,
  borderRadius: '9999px',

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 }
})

const StyledRange = styled(SliderPrimitive.Range, {
  position: 'absolute',
  backgroundColor: 'red',
  borderRadius: '9999px',
  height: '100%'
})

const StyledThumb = styled(SliderPrimitive.Thumb, {
  all: 'unset',
  display: 'block',
  width: 10,
  height: 10,
  backgroundColor: 'white',
  //boxShadow: `0 2px 10px ${blackA.blackA7}`,
  border: '1px solid #aaa',
  borderRadius: 10,
  '&:hover': { backgroundColor: violet.violet3 },
  '&:focus': { boxShadow: `0 0 0 5px ${blackA.blackA8}` }
})

const SliderDemo = () => (
  <StyledSlider defaultValue={[50]} max={100} step={1} aria-label="Volume">
    <StyledTrack>
      <StyledRange />
    </StyledTrack>
    <StyledThumb />
  </StyledSlider>
)

export default MyApp
