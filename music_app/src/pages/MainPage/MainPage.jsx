import { useEffect, useState, useCallback, useRef } from 'react';
import tracksList from '../../assets/tracksList.js';
import Track from '../../components/Track/Track.jsx';
import style from './mainPage.module.scss';
import { Input } from '@mui/material';

const MainPage = () => {
    const [term, setTerm] = useState('');
    const [tracks, setTracks] = useState(tracksList);
    const searchRef = useRef(null);

    const handleChange = (event) => {
        event.preventDefault();
        setTerm(event.target.value);
    }

    const filteredListByTerm = useCallback(
        (str) => {
            if (!str) {
                setTracks(tracksList);
                return;
            }
            const lowerCasedStr = str.toLowerCase();
            const filteredTracks = tracksList.filter((track) =>
                track.title.toLowerCase().includes(lowerCasedStr) || track.artists.toLowerCase().includes(lowerCasedStr));
            setTracks(filteredTracks);
        },
        [],
    );


    useEffect(() => {
        filteredListByTerm(term)
    }, [term]);

    return (
        <div className={style.search}>
            <Input
                className={style.input}
                placeholder='Search...'
                onChange={handleChange}
                ref={searchRef}
            />
            <div className={style.list}>
                {tracks.map((track) =>
                    (<Track key={track.id} {...track} />)
                )}

            </div>

        </div>
    )
}

export default MainPage