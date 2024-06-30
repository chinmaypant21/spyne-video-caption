import { formatTime } from "./time";

export function convertToVTT(captions: Caption[]) {
    const vtt = captions.map(({ start, end, text }) =>
            `${formatTime(start)} --> ${formatTime(end)}\n${text}`
        ).join('\n\n');
        
    return `WEBVTT\n\n${vtt}`;
};