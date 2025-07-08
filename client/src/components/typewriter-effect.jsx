import {useEffect, useState, useRef} from 'react';

export default function Typewriter({text, delay}) {
    
    const [livetext, setLivetext] = useState("");
    const iRef = useRef(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        
        intervalRef.current = setInterval(() => {
            let index = iRef.current;
            if(index >= text.length) {
                clearInterval(intervalRef.current);
                return;
            }
            
            setLivetext(prev => prev + text[index]);
            iRef.current++;
        }, delay);

        return () => {clearInterval(intervalRef.current); iRef.current = 0; setLivetext("")}
    }, [text]);

    return (
        <p>{livetext}</p>
    )
}