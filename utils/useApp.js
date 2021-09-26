import { useEffect, useState, createContext, useContext, useRef } from 'react'
import ReactPlayer from 'react-player'

export const UserContext = createContext()

export const UserContextProvider = props => {
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

  const handleSeekChange = value => {
    //setPlayed(e.target.value)
    console.log(value)
    setPlayed(value)
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

  const handleDuration = e => {
    console.log(e)
    setDuration(e)
  }
  const handlePlay = _ => setPlaying(true)

  const load = url => {
    //if (currentSong.audio == url) return
    setUrl(url)
    setPlayed(0)
    setPlaying(true)
    setTracked(false)
  }

  const [songs, setSongs] = useState([])
  useEffect(() => {
    const run = async () => {
      let songs = await fetch('/api/getSongs').then(r => r.json())
      setSongs(
        songs
          .filter(x => ReactPlayer.canPlay(x.audio))
          .sort((a, b) => (a.plays < b.plays ? 1 : -1))
      )
      setLoading(false)
    }
    run()
  }, [])

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

  const [tracked, setTracked] = useState(false)

  let value = {
    played,
    duration,
    player,
    playing,
    load,
    handlePlayPause,
    handleSeekMouseDown,
    handleSeekChange,
    setPlayed,
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
    setLoading,
    songs,
    skipTrackHandler,
    tracked,
    setTracked,
    setPlaying
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useApp = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}
