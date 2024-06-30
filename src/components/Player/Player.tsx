import { SyntheticEvent, useEffect, useRef, useState } from 'react'

import CaptionGenerator from 'components/CaptionGenerator/CaptionGenerator';
import styles from './Player.module.css'

interface Props {
    src: string
}

const Player = ({ src }: Props) => {
    const trackRef = useRef<HTMLTrackElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(0);

    function handleLoad(e: SyntheticEvent<HTMLVideoElement>){
        setIsLoaded(true);
        setDuration(e.currentTarget.duration)
    }

    function handleAddCaptions(captionData: string) {
        if (!captionData && trackRef.current) {
            trackRef.current.src = '';
        }

        const blob = new Blob([captionData], { type: 'text/vtt' });
        const blobUrl = URL.createObjectURL(blob);

        if (trackRef.current) {
            trackRef.current.src = blobUrl;
        }

        if (videoRef.current) {
            // videoRef.current.load();
            videoRef.current.focus();
        }
    }

    return (
        <div>
            <div className={styles.videoContainer}  >

                <video
                    onLoadedMetadata={handleLoad}
                    className={styles.videoScreen}
                    ref={videoRef}
                    src={src}
                    controls
                >
                    <track
                        ref={trackRef}
                        label="English"
                        kind="subtitles"
                        srcLang="en"
                        default
                    />
                </video>
            </div>

            {
                isLoaded &&
                <CaptionGenerator
                onSetCaptions={handleAddCaptions}
                videoDuration={duration}
                />
            }
        </div>
    )
}

export default Player