import React, { useState, useEffect } from 'react'
import IcPause from './icons/IcPause'
import IcPlay from './icons/IcPlay'

const useMultiAudio = (urls) => {
    const [sources] = useState(
        urls.map(url => {
            return {
                url,
                audio: new Audio(url),
            }
        }),
    )



    const [players, setPlayers] = useState(
        urls.map(url => {
            return {
                url,
                playing: false,
            }
        }),
    )

    //bật tắt từng bài nhạc
    const toggle = targetIndex => () => {
        const newPlayers = [...players]
        const currentIndex = players.findIndex(index => index.playing === true)
        if (currentIndex !== -1 && currentIndex !== targetIndex) {
            newPlayers[currentIndex].playing = false
            newPlayers[targetIndex].playing = true
        } else if (currentIndex !== -1) {
            newPlayers[targetIndex].playing = false
        } else {
            newPlayers[targetIndex].playing = true
        }
        setPlayers(newPlayers)
    }

    //phát nhạc
    useEffect(() => {
        sources.forEach((source, i) => {
            players[i].playing ? source.audio.play() : source.audio.pause()
        })
    }, [sources, players])

    //phát bài mới return bài cũ về mốc thời gian là 0
    useEffect(() => {
        sources.forEach((source, i) => {
            source.audio.addEventListener('ended', () => {
                const newPlayers = [...players]
                newPlayers[i].playing = false
                setPlayers(newPlayers)
            })
        })
        return () => {
            sources.forEach((source, i) => {
                source.audio.removeEventListener('ended', () => {
                    const newPlayers = [...players]
                    newPlayers[i].playing = false
                    setPlayers(newPlayers)
                })
            })
        }
    }, [])

    return [players, toggle]
}

const Player = ({ player, toggle }) => (
    <button style={{ width: '100% ' }} onClick={toggle}>{player.playing ? <span className='button_span_music'><IcPause />Đang phát</span> : <span className='button_span_music'><IcPlay />Nghe thử</span>}</button>
)

const MultiPlayer = ({ urls }) => {

    const [players, toggle] = useMultiAudio(urls)

    return (
        <div className='multimusic_wrap'>
            {players.map((player, i) => (
                <Player key={i} player={player} toggle={toggle(i)} />
            ))}
        </div>
    )
}

export default MultiPlayer