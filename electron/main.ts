import { app, BrowserWindow, session, dialog, ipcMain, Renderer } from 'electron';
import * as path from 'path';
import * as url from 'url';
const fs = require('fs');


let mainWindow: Electron.BrowserWindow | null;

function createWindow():void {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: `file://${__dirname}/renderer.ts`,
            // webSecurity: false,
        },
    });

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL(`http://localhost:4000/`);
        //mainWindow.loadURL(`file://` + path.join(__dirname, '..', 'index.html'));
    } else {
        mainWindow.loadURL(
            url.format({
                pathname: path.join(__dirname, '../index.html'),
                protocol: 'file:',
                slashes: true
            })
        );
    }

    mainWindow.once('ready-to-show', () => {
       if (mainWindow) {
        mainWindow.webContents.openDevTools();
       }
    })

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // ipcMain.on('test', () => {
    //     dialog.showErrorBox('ERRRORRRR', 'What do you think it is?');
    // });
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;

const openFile = exports.openFile = (targetWindow: any, file: string) => {
    const content = fs.readFileSync(file).toString();
    //startWatchingFile(targetWindow, file);
    app.addRecentDocument(file);
    targetWindow.setRepresentedFilename(file);
    // if (!savedBySelfFlag)
    targetWindow.webContents.send('file-opened', file, content);
    // else { savedBySelfFlag = false; }
};

const getFileFromUser = exports.getFileFromUser = async (targetWindow: any) => {
    const files = await dialog.showOpenDialog(targetWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Text Files', extensions: ['txt'] },
            { name: 'Markdown Files', extensions: ['md', 'markdown'] }
        ]
        // BUG: in macOS, only allows opening of Text Files unless user changes options
    });

    if (!files.canceled) { openFile(targetWindow, files.filePaths[0]); };
};



// app.on('certificate-error', function(event, webContents, url, error, 
//     certificate, callback) {
//         event.preventDefault();
//         callback(true);
//   });