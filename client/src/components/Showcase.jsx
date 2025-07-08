import { useEffect, useState, useRef } from 'react';
import Typewriter from './typewriter-effect'

export default function Showcase() {

    const words = ["Airlytics", "live","accurate","predictive","real-time","insightful","adaptive","smart","intelligent","data-driven","automated","responsive","secure","environmental","....."];
    const [currentWord, setCurrentWord] = useState(words[0]);

    const iRef = useRef(0);
    const typewriterDelay = 100;

    useEffect(() => {
        const duration = (words[iRef.current].length)*typewriterDelay + 1000;
        let interval = setInterval(() => {
            setCurrentWord(words[iRef.current]);
            iRef.current+=1;
        }, duration);
        return () => {clearInterval(interval); if(iRef.current === words.length) iRef.current = 0;}
    }, [iRef.current]);

    return (
        <div className='
            w-[80vw] h-[30vh]
            lg:w-[50vw] lg:text-6xl md:text-5xl
            flex justify-center items-center flex-col
            titleBg
            text-2xl text-transparent font-bold bg-clip-text drop-shadow-[2px_1px_0_white]
        '>
            ---This is---, 
            
            <div className='h-[10vh] pt-3'><Typewriter text={currentWord} delay={typewriterDelay}/></div>
        </div>
    )
}