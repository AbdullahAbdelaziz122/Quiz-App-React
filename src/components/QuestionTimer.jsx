import { useEffect, useState } from "react";

export default function QuestionTimer({timeout, onTimeout}){
    
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeout, timeout);
        console.log("Setting Timer");
        return () => {
            clearTimeout(timer);
        }
    }, [onTimeout, timeout])

    
    useEffect(()=> {
        const interval = setInterval(()=> {
            setRemainingTime((prevTime) =>{
                return prevTime - 100;
            })
        }, 100);

        console.log("Setting Interval");
        return ()=>{
            clearInterval(interval);
        }
    }, [])


    return(
        <progress max={timeout} value={remainingTime}/>
    );
}