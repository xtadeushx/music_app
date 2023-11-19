import { useState } from 'react';
import { createContext } from "react";
import tracksList from '../assets/tracksList';

export const AudioContext = createContext({});

const audio = new Audio();
// eslint-disable-next-line react/prop-types
const AudioProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(tracksList[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleToggleAudio = (track) => {
        if (track.id !== currentTrack.id) {
            setCurrentTrack(track);
            setIsPlaying(true)
            audio.src = track.src;
            audio.currentTime = 0;
            audio.play();
            return;
        }
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play();
            setIsPlaying(true);
        }

    }
    const value = { currentTrack, handleToggleAudio, isPlaying, audio }
    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>

    )
}

export default AudioProvider;