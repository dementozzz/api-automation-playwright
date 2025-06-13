export function timeDurationFormat(milliseconds : number) {
    const totalSeconds = Math.round(milliseconds / 1000);
    
    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(totalSeconds / 3600);
    const remainingSeconds = totalSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    
    // Format each part with leading zero if needed
    const pad = (num: number) => num.toString().padStart(2, '0');
    const val = `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
    
    return val;    
}