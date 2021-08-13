const marked = require('marked');
const path = require('path');
const { remote, ipcRenderer } = require('electron');
const mainProcess = remote.require('./main.js');

const currentWindow = remote.getCurrentWindow();

let filePath: string | null = null;

const openFileButton: HTMLElement | null  = document.querySelector('.open');


console.log('outside');

if (openFileButton) {
    console.log('here');
    openFileButton.addEventListener('click', (e) => {
        console.log(e);
    // alert('Argh!');
    // console.log('You clicked the button!');
    // mainProcess.getFileFromUser(currentWindow);
});
}


ipcRenderer.on('file-opened', (event: any, file: string, content: string) => {
    alert('You opened a file!');
});