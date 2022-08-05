import React, {useEffect, useState} from 'react';
import './App.css';

function getData() {
    const start = new Date('Aug 05 2022 13:00:00 GMT+0200 (CEST)');
    const end = new Date('Aug 06 2022 10:00:00 GMT+0200 (CEST)');
    const timezone = -new Date().getTimezoneOffset()/60;
    const now = timezone === 0 ? new Date(new Date().getTime() + 60*60*1000) : new Date();

    //   console.log()
    const done = Math.abs(now.getTime() - start.getTime()) / 3600000;
    const left = Math.abs(end.getTime() - now.getTime()) / 3600000;
    const percentage = parseInt(done / (done + left) * 100);

    return {
        done: done.toFixed(1),
        left: left.toFixed(1),
        percentage
    }

}

function App() {
    const [data, setData] = useState(getData);

    useEffect(() => {

        const t = setTimeout(() => {
            setData(getData())
        }, 3600);

        return () => clearTimeout(t);
    }, [data])

    return (
        <div className="App">
            <header className="App-header">
                <figure>
                    <div className="face top"><p id="s">
                        <span className="number">{data.percentage}% </span>
                    </p></div>
                    <div className="face front"><p id="m">
                        <span className="text mb">remaining time:</span>
                        <span className="number">{data.left} </span>
                        <span className="text mt">hours </span>
                    </p></div>
                    <div className="face left"><p id="h">
                        <span className="text mb">in the way:</span>
                        <span className="number">{data.done} </span>
                        <span className="text mt">hours </span>
                    </p></div>
                </figure>
            </header>
        </div>
    );
}

export default App;
