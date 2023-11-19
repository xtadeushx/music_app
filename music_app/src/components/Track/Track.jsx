import { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

import style from './track.module.scss';
import { IconButton } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import secondsToMMSS from '../../utils/secondsToMMSS.js';
import { AudioContext } from '../../context/AudioContext.jsx';
import cn from 'classnames';
const Track = (track) => {
    const { id, preview, title, duration, artists } = track
    const formattedDuration = useMemo(() => secondsToMMSS(duration), [duration]);
    const { handleToggleAudio, currentTrack, isPlaying } = useContext(AudioContext);
    const isCurrentTrack = currentTrack.id === id;
    return (
        <div className={cn(style.track, isCurrentTrack && style.playing)}>
            <IconButton onClick={() => handleToggleAudio(track)}>
                {isCurrentTrack && isPlaying
                    ? <Pause /> : <PlayArrow />}
            </IconButton>
            <img
                className={style.preview}
                src={preview}
                alt={title}
            />
            <div className={style.credits}>
                <b>{title}</b>
                <p>{artists}</p>
            </div>
            <p>{formattedDuration}</p>
        </div>
    )
}

export default Track;

Track.propTypes = {
    id: PropTypes.number,
    src: PropTypes.string,
    preview: PropTypes.string,
    title: PropTypes.string,
    duration: PropTypes.number,
    artists: PropTypes.string,
};