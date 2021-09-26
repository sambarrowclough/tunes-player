import 'tailwindcss/tailwind.css'
import './style.css'
import { useApp, UserContextProvider } from '@/utils/useApp'
import ReactPlayer from 'react-player'
import { useState, useRef, useEffect } from 'react'
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
  const [songs, setSongs] = useState([])
  useEffect(() => {
    const run = async () => {
      let songs = await fetch(
        'https://sounds-visualizer-api.sambarrowclough.repl.co/v2/songs'
      ).then(r => r.json())
      setSongs(songs.filter(x => ReactPlayer.canPlay(x.audio)))
      // setCurrentSong(songs[0])
      // setLoading(false)
    }
    run()
  }, [])
  console.log(songs)
  return (
    <UserContextProvider>
      <Player songs={songs} />
      <Component {...pageProps} />
    </UserContextProvider>
  )
}

const usePlayer = () => {
  const player = useRef()
  const currentSongIndex = useRef(0)
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const [played, setPlayed] = useState(0)
  const [seeking, setSeeking] = useState(false)
  const [url, setUrl] = useState('')
  const [currentSong, setCurrentSong] = useState('')
  const handlePlayPause = () => setPlaying(!playing)

  const handleSeekMouseDown = e => {
    setSeeking(true)
  }

  const handleSeekChange = e => {
    setPlayed(e.target.value)
  }

  const handleSeekMouseUp = e => {
    setSeeking(false)
    player.current.seekTo(parseFloat(e.target.value))
  }

  const handleProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!seeking) {
      setPlayed(state.played)
    }
  }

  const handleDuration = e => setDuration(e)
  const handlePlay = _ => setPlaying(true)

  const load = url => {
    setUrl(url)
    setPlayed(0)
    setPlaying(true)
  }

  return {
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
    loading,
    setLoading
  }
}

const Player = ({ songs }) => {
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
    loading
  } = usePlayer()

  const skipTrackHandler = async direction => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id)
    if (direction === 'skip-forward') {
      let nextSong = songs[(currentIndex + 1) % songs.length]
      load(nextSong.audio)
      await setCurrentSong(nextSong)
    } else if (direction === 'skip-back') {
      if ((currentIndex - 1) % songs.length === -1) {
        let nextSong = songs[songs.length - 1]
        load(nextSong.audio)
        await setCurrentSong(nextSong)
      } else {
        let nextSong = songs[(currentIndex - 1) % songs.length]
        load(nextSong.audio)
        await setCurrentSong(nextSong)
      }
    }
  }

  useEffect(() => {
    if (songs?.length) setUrl(songs[0].audio)
  }, [songs])

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
        }}
        onBuffer={() => console.log('onBuffer')}
        onSeek={e => console.log('onSeek', e)}
        onError={e => console.log('onError', e)}
        width="100%"
        height="100%"
        config={{ file: { forceAudio: true } }}
      />
      <div className="z-10 w-full border-t-2 border-gray-50 h-10 fixed bottom-0 bg-white">
        <div className="container flex mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 items-center">
          <div className="controls flex items-center">
            <svg
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
            <svg
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

          <Duration seconds={duration * played} />
          {/* <progress max={1} value={played} /> */}
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
          />
          <Duration seconds={duration} />
          {currentSong.name}
          {loading ? 'loading audio...' : ''}
        </div>
      </div>
    </>
  )
}

export default MyApp
