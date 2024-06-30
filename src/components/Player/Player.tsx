import { useRef } from 'react'

import CaptionGenerator from "components/CaptionGenerator/CaptionGenerator"
import styles from './Player.module.css'

interface Props {
    src: string
}

const Player = ({ src }: Props) => {
    const trackRef = useRef<HTMLTrackElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

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

            <CaptionGenerator
                onSetCaptions={handleAddCaptions}
                videoDuration={videoRef.current?.duration}
            />
        </div>
    )
}

export default Player