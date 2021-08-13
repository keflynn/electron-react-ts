import React from 'react';
import ReactDom from 'react-dom';

// const mainElement: any = document.getElementById('root');

const electron = require('electron');
const ipc = electron.ipcRenderer;

const App: React.FC = () => {

    const handleClick = () => {
        ipc.send('test');
    }

    return (
        <div>
        <h1>
            Hi from the React app!?
        </h1>
        <h2>Jerry</h2>
        {/* <button className="open" onClick={ handleClick }>Open File</button> */}
        <button className="open">Open File</button>
        <script src="../dist/renderer.js"></script>
        <script src="../electron/renderer.ts"></script>
        </div>
    )
};


ReactDom.render(<App />, document.getElementById('root'));