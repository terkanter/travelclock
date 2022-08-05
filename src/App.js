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
        }, 3600)
        return () => clearTimeout(t);
    }, [data])

    return (
        <div className="App">
            <header className="App-header">
                <figure>
                    <div className="face top"><p id="s">
                        <span style={{fontSize: 90, }}>{data.percentage}% </span>
                    </p></div>
                    <div className="face front"><p id="m">
                        <span style={{ fontSize: 32, marginBottom: 16 }}>remaining time:</span>
                        <span style={{fontSize: 90, }}>{data.left} </span>
                        <span style={{ fontSize: 32, marginTop: 8}}>hours </span>
                    </p></div>
                    <div className="face left"><p id="h">
                        <span style={{ fontSize: 32, marginBottom: 16 }}>in the way:</span>
                        <span style={{fontSize: 90, }}>{data.done} </span>
                        <span style={{ fontSize: 32, marginTop: 8}}>hours </span>
                    </p></div>
                </figure>
            </header>
        </div>
    );
}

export default App;
