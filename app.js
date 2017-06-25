const electron = require('electron');
// Module to control application life.
const app = electron.app;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

//const myIPC = require('electron').ipcMain;

var {app2, BrowserWindow2, ipcMain} = electron;
var floorWindow = null;
var mainWindow = null;

function random_matrix(size) {
    var matrix = [];
    for (var i=0; i<size; i++) {
        var row = [];
        for (var j=0; j<size; j++) {
          //var num = Math.round(100*Math.pow(Math.random(),2)+1);
          var num = Math.random();
            row.push(num);
        }
        matrix.push(row);
    }
    return matrix;
};

function nonrandom_matrix(size) {
    var matrix = [];
    for (var i=0; i<size; i++) {
        var row = [];
        for (var j=0; j<size; j++) {
            var num = 1;
            //row.push(j != i ? .99 : 0);
            row.push(1);
        }
        matrix.push(row);
    }
    return matrix;
};


function new_matrix() {
    var matrix = [];
    for (var i=0; i<10; i++) {
        var row = [];
        for (var j=0; j<10; j++) {
            var num = Math.round(100*Math.pow(Math.random(),2)+1);
            row.push(i+1);
        }
        matrix.push(row);
    }
    return matrix;
};

global.matrixX = [
  nonrandom_matrix(10),random_matrix(10),random_matrix(10),random_matrix(10),random_matrix(10),
  random_matrix(10),random_matrix(10),random_matrix(10),random_matrix(10),random_matrix(10),
  random_matrix(10),random_matrix(10),random_matrix(10),random_matrix(10),random_matrix(10),
  random_matrix(10),random_matrix(10),random_matrix(10),random_matrix(10),random_matrix(10),
  random_matrix(10),random_matrix(10),random_matrix(10),random_matrix(10),random_matrix(10)];

global.matrix = global.matrixX[0];

function createWindow () {

  var screenElectron = electron.screen;

  var mainScreen = screenElectron.getPrimaryDisplay();
  var allScreens = screenElectron.getAllDisplays();
  var wallScreen = null;
  var floorScreen = null;

  if (allScreens[0].size.width > allScreens[1].size.width){
    wallScreen = allScreens[0];
    floorScreen = allScreens[1];
  } else {
    floorScreen = allScreens[0];
    wallScreen = allScreens[1];
  }

  console.log(mainScreen, allScreens);

  // Create the browser window.
  //  mainWindow = new BrowserWindow({ x: floorScreen.size.width, y:0, width: wallScreen.size.width, height: 600})
    mainWindow = new BrowserWindow({  frame:false, width: wallScreen.size.width, height: wallScreen.size.height})

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'wall.html'),
      protocol: 'file:',
      slashes: true
    }))

    // Open the DevTools.
    //mainWindow.webContents.openDevTools()

    console.log(floorScreen.size.height);
    console.log(floorScreen.size.width);

  //  floorWindow = new BrowserWindow({ frame:false, x:  -floorScreen.size.width + ((floorScreen.size.width-floorScreen.size.hright)/2), y:0,width : floorScreen.size.height,height: floorScreen.size.height})
  floorWindow = new BrowserWindow({ frame:false, x:  ((1920-1080)/2)-1920, y:0,width : 1080,height: 800})

  floorWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'floor.html'),
    protocol: 'file:',
    slashes: true
  }))

    floorWindow.setFullScreen(true);
    mainWindow.setFullScreen(true);

//  floorWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
    floorWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    app.quit()
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('newChords',function(event,num){
  floorWindow.webContents.send('upChord',num);
  //console.log(num);
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
