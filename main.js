const { app, BrowserWindow, protocol, net } = require('electron'); 
// const createConnection = require("typeorm");

let win;


// const request = net.request({
//     method: 'GET',
//     protocol: 'https:',
//     hostname: 'github.com',
//     port: 443,
//     path: '/vitorgja'
//   })
//   request.on('response', (response) => {
//     console.log(`STATUS: ${response.statusCode}`);
//     response.on('error', (error) => {
//       console.log(`ERROR: ${JSON.stringify(error)}`)
//     })
//   })



app.on('ready', () => {
  mainWindow = new BrowserWindow({
      webPreferences: {
          nodeIntegration: true
      }
  });
});

function createWindow() {     
  // Create the browser window.
  win = new BrowserWindow({ 
    width: 800, 
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });// and load the index.html of the app. 
  win.loadFile('./dist/electron-angular-sqlite/index.html');// Open the DevTools.
  win.webContents.openDevTools();// Emitted when the window is closed.


    // setTimeout(() => {
    //     console.log("You can also get posts from the second process:");
    //     createConnection({
    //         "type": "sqlite",
    //         "synchronize": true,
    //         "logging": true,
    //         "logger": "simple-console",
    //         "database": "src/src/dump/database.sqlite",
    //         "entities": [
    //           "src/src/entity/*.js"
    //         ]
    //       }).then(async connection => {
    //         const posts = await connection.getRepository("Post").find();
    //         console.log("posts:", posts);
    //     });
    // }, 5000);



    win.on('closed', () => {
        win = null
    })
};      
// This method will be called when Electron has finished   
// initialization and is ready to create browser windows.   
// Some APIs can only be used after this event occurs.   
app.on('ready', createWindow);





// Quit when all windows are closed.
app.on('window-all-closed', () => {

    // On macOS it is common for applications and their menu bar     
    // to stay active until the user quits explicitly with Cmd + Q     
    if (process.platform !== 'darwin') { app.quit() }
});
app.on('activate', () => {     // On macOS it's common to re-create a window in the app when the     
    // dock icon is clicked and there are no other windows open.     
    if (win === null) { createWindow() }
});      