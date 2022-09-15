import React, { useEffect, useRef, useState } from 'react';
import {Counter} from './Count/Counter.jsx';
import {Trophies} from './TrophiesContainer/Trophies.jsx';
import CountController from "./Controls/CountController";
import {ControlButton} from "./Controls/ControlButton.jsx";
import {OverdriveTimer} from "./Overdrive/OverdriveTimer.jsx";
import {Record} from "./Count/Record";
import '../index.scss';

export const App = () => {
    const [count, setCount] = useState(0);
    const [maxCount, setMaxCount] = useState(0);
    const [wait, setWait] = useState(false);
    const [overdrive, setOverdrive] = useState(false);
    const [overdriveCount, setOverdriveCount] = useState(10);

    const refController = useRef(
        new CountController(
            count, setCount,
            overdrive, setOverdrive,
            overdriveCount, setOverdriveCount
        )
    );

    const pushButton = () => {
        setWait(false)
        refController.current.throttle();
    };

    useEffect(() => {
        if (count < maxCount) return
        setMaxCount(refController.current.maxCount())
    }, [count, maxCount]);


    useEffect(() => { 
        if (!wait) return
        let interval = setInterval(() => {
            if (count < 1) {
                clearInterval(interval);
                // setCount(0);
                return
            }
            setCount(prev => {
                return prev - 1 < 0 ? 0 : prev - 1
            });
        }, 1000)
        return () => clearInterval(interval)
    }, [wait, count]);


    useEffect(() => {
        function space(event) {
            if (event.repeat) return
            if (event.code === "Space") pushButton();
        };
        window.addEventListener('keydown', space);
        return () => window.removeEventListener('keydown', space);
    }, []);

    useEffect(() => {
        let timeout = setTimeout(() => {
            setWait(true)
        }, 3000)
        return () => clearTimeout(timeout);
    }, [count])

    return (
        <div className="app">
                <Record
                    count={maxCount}
                />
                <Counter
                    count={count}
                />
                <ControlButton
                    onClick={pushButton}
                    onKeyDown={pushButton}
                    wait={wait}
                />
                <OverdriveTimer
                    isOverdrive={overdrive}
                    countOverdrive={overdriveCount}
                />
                <Trophies
                    trophies={maxCount}
                />
        </div>
    )
}
