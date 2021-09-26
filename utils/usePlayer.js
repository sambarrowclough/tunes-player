import { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'

export const usePlayer = () => {
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
    console.log(url)
    setUrl(url)
    setPlayed(0)
    setPlaying(true)
  }

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
    setLoading,
    songs,
    skipTrackHandler
  }
}
