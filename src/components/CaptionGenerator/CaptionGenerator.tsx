import { useState } from 'react'
import { formatTime } from "libs/time";
import { convertToVTT } from "libs/vtt";

import styles from './CaptionGenerator.module.css'

interface Props {
    onSetCaptions?: Function,
    videoDuration: number
}

const CaptionGenerator = ({ onSetCaptions, videoDuration }: Props) => {
    const [captions, setCaptions] = useState<Caption[]>([]);
    const [captionText, setCaptionText] = useState<string>('');
    const [startTimestamp, setStartTimestamp] = useState<string>('');
    const [endTimestamp, setEndTimestamp] = useState<string>('');

    function handleUpdateCaption() {
        const caption_vtt = convertToVTT(captions);

        onSetCaptions?.(caption_vtt) //Callback
    }

    function handleResetCaption() {
        setCaptions([]);
        onSetCaptions?.('')
    }

    const handleAddCaption = () => {
        const start = parseFloat(startTimestamp);
        const end = parseFloat(endTimestamp);

        if (
            captionText.trim() === '' ||
            isNaN(start) ||
            isNaN(end) ||
            start < 0 ||
            end > videoDuration ||
            start >= end
        ) {
            alert('Please enter valid caption text and timestamps within the video duration.');
            return;
        }

        setCaptions((prev) => (
            [...prev, { start, end, text: captionText }]
        ));

        setCaptionText('');
        setStartTimestamp('');
        setEndTimestamp('');
    };

    const handleRemoveCaption = (index: number) => {
        const newCaptions = captions.filter((_, i) => i !== index);
        setCaptions(newCaptions);
    };


    return (
        <div className={styles.container}>            
            <h1 className={styles.heading}>Generate Captions</h1>
            <section className={styles.addCaptionContainer}>
                <div className={styles.inputContainer}>
                    <textarea
                        value={captionText}
                        onChange={(e) => setCaptionText(e.target.value)}
                        placeholder="Caption text"
                    />
                    <input
                        type="number"
                        value={startTimestamp}
                        onChange={(e) => setStartTimestamp(e.target.value)}
                        placeholder="Start timestamp (seconds)"
                        min="0"
                        max={videoDuration}
                    />
                    <input
                        type="number"
                        value={endTimestamp}
                        onChange={(e) => setEndTimestamp(e.target.value)}
                        placeholder="End timestamp (seconds)"
                        min="0"
                        max={videoDuration}
                    />
                </div>

                <button
                    className={styles.addBtn}
                    onClick={handleAddCaption}
                >
                    Add Caption
                </button>
            </section>
            <div>
                <h2 className={styles.captionTitle}>Captions</h2>
                <ul className={styles.captionContainer}>
                    {
                        captions.length ?
                            captions.map((caption, index) => (
                                <li key={index} className={styles.captionItem}>
                                    <div className={styles.captionText}>
                                        <div>
                                            <b>Timestamp:</b>&nbsp;
                                            <code>{`[${formatTime(caption.start)} - ${formatTime(caption.end)}]`}</code>
                                        </div>
                                        <div>
                                            <b>Caption:</b>&nbsp;
                                            <span>{caption.text}</span>
                                        </div>

                                    </div>
                                    <button className={styles.removeBtn} onClick={() => handleRemoveCaption(index)}>Remove</button>
                                </li>
                            ))

                            : <span style={{ color: 'red' }}>No Captions generated</span>
                    }
                </ul>
            </div>

            <div className={styles.submitContainer}>
                <button onClick={handleUpdateCaption}>Update Captions</button>
                <button onClick={handleResetCaption}>Reset</button>
            </div>
        </div>
    );
}

export default CaptionGenerator