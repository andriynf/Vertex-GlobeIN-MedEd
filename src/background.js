"use strict";

const {
  app,
  protocol,
  Menu,
  BrowserWindow,
  ipcMain,
  dialog,
  globalShortcut,
} = require("electron");
const {
  createProtocol,
  installVueDevtools,
} = require("vue-cli-plugin-electron-builder/lib");
const { autoUpdater } = require("electron-updater");
const isDevelopment = process.env.NODE_ENV !== "production";
const { download } = require("electron-dl"); // for download files (storage content)
const { machineId, machineIdSync } = require("node-machine-id");
// var DecompressZip = require("decompress-zip");
var request = require("request");
const path = require("path");

const log = require("electron-log");
// log.transports.file.resolvePath = () => path.join(__dirname, 'logs/main.log');
console.log = log.log;
Object.assign(console, log.functions);

let app_path = app.getPath("desktop") + "/GlobeIN Storage/";
let currentUrlApplication = "https://bhoward3.com/electron/GlobeIN";
let currentUrlUpdate = `${currentUrlApplication}/MedEd/`;
let apiUrl = `${currentUrlApplication}/api`;

if (isDevelopment) {
	apiUrl = "http://globein-api";
}

const Store = require("electron-store");
let config_schema = {
  url_update: { type: "string",format: "url", default: currentUrlUpdate },
  url_api: { type: "string", default: apiUrl },
  width: { type: "number", default: 2732 },
  height: { type: "number", default: 2048 },
  back_inactivity_time: { type: "number", default: 180 },
  back_autoexit_time: { type: "number", default: 30 },
  screensaver_time: { type: "number", default: 30 },
  banner_showtime: { type: "number", default: 120 },
  banner_closetime: { type: "number", default: 120 },
  // deviceId: { type: 'string', default: '' },
};

const config = new Store({ schema: config_schema });
// for refresh default value if it was changed
//config.delete('url_update');
// config.delete("url_api");
config.delete("structure");
// config.delete("banner_showtime");
// config.delete("banner_closetime");
var fs = require("fs");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let appWin;
let launchWin;
let createdAppProtocol = false;
let ready_launch_win = false;
let ready_app_win = false;

const powerSaveBlocker = require('electron').powerSaveBlocker;
powerSaveBlocker.start('prevent-app-suspension');

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

function createLaunchWindow(devPath, prodPath) {
  launchWin = new BrowserWindow({
    width: 1200,
    height: 800,
    center: true,
    frame: isDevelopment,
    // transparent: true,//!isDevelopment,
    show: false,
    webPreferences: {
      //preload: path.join(__dirname, "preload.js"),
      webSecurity: false, // to work with local files
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    launchWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath);
    if (!process.env.IS_TEST) launchWin.webContents.openDevTools();
  } else {
    if (!createdAppProtocol) {
      createProtocol("app");
      createdAppProtocol = true;
    }
    // Load the index.html when not in development
    launchWin.loadURL(`app://./${prodPath}`);
  }
  launchWin.once("ready-to-show", () => {
    launchWin.show();
  });
  launchWin.once("show", () => {
    // launchWin.setMaximizable(true);
    ready_launch_win = true;
    launchWin.webContents.send("ready communicate");
  });
  launchWin.on("closed", () => {
    launchWin = null;
  });
}

function createAppWindow(devPath, prodPath) {
  // Create the browser window.
  appWin = new BrowserWindow({
    width: config.get("width"),
    height: config.get("height"),
    // resizable: isDevelopment,
    center: true,
    frame: isDevelopment,
    // // transparent: true,//!isDevelopment,
    show: false,
    webPreferences: {
      //preload: path.join(__dirname, "preload.js"),
      webSecurity: false, // to work with local files
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    appWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath);
    if (!process.env.IS_TEST) appWin.webContents.openDevTools();
  } else {
    // Load the index.html when not in development
    appWin.loadURL(`app://./${prodPath}`);
  }
  appWin.once("ready-to-show", () => {
    appWin.show();
    appWin.setFullScreen(true);
  });
  appWin.once("show", () => {
    ready_app_win = true;
    appWin.webContents.send("ready communicate");
  });
  appWin.on("closed", () => {
    appWin = null;
  });

  setupGlobalHotKeys();
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (launchWin === null) {
    createLaunchWindow("launch", "launch.html");
  }
  // if (win === null) {
  // 	createWindow(win, '', 'index.html')
  // }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
	registerLocalVideoProtocol();
  createLaunchWindow("launch", "launch.html");
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

// src="local-video://vid.mp4". This works in both build and serve.
function registerLocalVideoProtocol () {
  protocol.registerFileProtocol('local-video', (request, callback) => {
    const url = request.url.replace(/^local-video:\/\//, '')
    // Decode URL to prevent errors when loading filenames with UTF-8 chars or chars like "#"
    const decodedUrl = decodeURI(url) // Needed in case URL contains spaces
    try {
      // eslint-disable-next-line no-undef
      return callback(path.join(__static, decodedUrl))
    } catch (error) {
      console.error(
        'ERROR: registerLocalVideoProtocol: Could not get file path:',
        error
      )
    }
  })
}

function replyToWindow(f, d) {
  if (launchWin !== null) {
    launchWin.webContents.send(f, d);
  } else if (appWin !== null) {
    appWin.webContents.send(f, d);
  }
}

function sendStatusToWindow(text) {
  if (launchWin !== null) {
    launchWin.webContents.send("message", text);
  } else if (appWin !== null) {
    appWin.webContents.send("message", text);
  }
}

ipcMain.on("launch completed", (event) => {
  sendStatusToWindow("completed. close launch and open app.");
  setTimeout(() => {
    createAppWindow("", "index.html");
    launchWin.close();
  }, 500);
});

ipcMain.on("close-me", (event) => {
  sendStatusToWindow("FORCE CLOSE APP");
  app.quit();
});

ipcMain.on("get name", (event, data) => {
  replyToWindow(data.reply_to, app.getName());
});
ipcMain.on("get version", (event, data) => {
  replyToWindow(data.reply_to, app.getVersion());
});
ipcMain.on("get config", (event, data) => {
  replyToWindow(data.reply_to, config.store);
});
ipcMain.on("update config", (event, data) => {
  config.set(data.config);
  replyToWindow(data.reply_to, config.store);
});
// ipcMain.on("get-attract-images", (event, data) => {
//   // const attractFolder = path.join(__static, 'attract');
//   const attractFolder = app_path + "attract/";

//   fs.readdir(attractFolder, (err, files) => {
//     replyToWindow(data.reply_to, files);
//   });
// });
ipcMain.on("get app_path", (event, data) => {
  // let app_path = app.getPath('userData');
  // replace \ to /
  let app_pathNo = app_path.replace(/\\/g, "/"); // without / at the end
  replyToWindow(data.reply_to, app_pathNo);
});
ipcMain.on("get app_local_path", (event, data) => {
  let usepath = path.join(__static, "/");
  // console.log('__static', __static);
  replyToWindow(data.reply_to, usepath);
});
ipcMain.on("get_about", (event, data) => {
  let about_data = {
    appName: app.getName(),
    appVersion: app.getVersion(),
    // osVersion: require("os").release,
    //arch: os.arch(),
    platform: process.platform,
  };
  // console.log(about_data);
  replyToWindow(data.reply_to, about_data);
});

const pcId = machineIdSync({ original: true });
ipcMain.on("get machineId", (event, data) => {
  // let pcId = machineIdSync({ original: true });
  replyToWindow(data.reply_to, pcId);
});

ipcMain.on("check communication", (event, data) => {
  switch (data.name) {
    case "launch win":
      if (ready_launch_win) replyToWindow("ready communicate");
      break;
    case "app win":
      if (ready_app_win) replyToWindow("ready communicate");
      break;
    default:
      break;
  }
});

//-------------------------------------------------------------------
// Updates. Works with 'launchWin'
//
// This isn't required for auto-updates to work, but it's easier
// for the app to show a window than to have to click "About" to see
// that updates are working.
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";

ipcMain.on("check_for_updates", (event, url) => {
  if (isDevelopment) {
    skipUpdates("Development mode, skip updates.");
  } else {
    sendStatusToWindow(`Checking url for update...`);
    autoUpdater.setFeedURL(url);
    autoUpdater.checkForUpdates();
  }
});
autoUpdater.on("checking-for-update", () => {
  launchWin.webContents.send("updating", "Checking for update...");
});
autoUpdater.on("update-available", (ev, info) => {
  launchWin.webContents.send("updating", "Update available.");
});
autoUpdater.on("update-not-available", (ev, info) => {
  // if no updates load index.html with app
  skipUpdates("No updates.");
});
autoUpdater.on("error", (ev, err) => {
  sendStatusToWindow(err);
  skipUpdates("Error in auto-updater.");
});
autoUpdater.on("download-progress", (progressObj) => {
  sendStatusToWindow("download-progress");
  let str = `${bytesToSize(progressObj.transferred)} / ${bytesToSize(
    progressObj.total
  )} (${bytesToSize(progressObj.bytesPerSecond)}/s)`;
  let o = {
    str: str,
    percent: progressObj.percent.toFixed(2),
  };
  launchWin.webContents.send("progress", o);
});
autoUpdater.on("update-downloaded", (ev, info) => {
  launchWin.webContents.send("updating", "Update downloaded.");
  // Wait 3 seconds, then quit and install
  // You could call autoUpdater.quitAndInstall(); immediately
  setTimeout(function () {
    autoUpdater.quitAndInstall();
  }, 3000);
  // after install app will launch and checking update again
});
function skipUpdates(message) {
  launchWin.webContents.send("skipped_updates", message);
}
function bytesToSize(bytes, seperator = "") {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "n/a";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes}${seperator}${sizes[i]}`;
  return `${(bytes / 1024 ** i).toFixed(1)}${seperator}${sizes[i]}`;
}


// ************************
// ************************
// ************************
// ************************
// save to local file
ipcMain.on("save_to_file", (event, data) => {
  let path_to_file = app.getPath("userData") + "/storage/" + data.file_name;
  var path = require("path");
  //Return the directries:
  var directories = path.dirname(path_to_file);
  if (!fs.existsSync(directories)) {
    fs.mkdirSync(directories);
  }
  try {
    fs.writeFileSync(path_to_file, data.text, "utf-8");
  } catch (e) {
    console.log(`${e}`);
    sendStatusToWindow(`Failed to save the ${data.file_name} file!`);
  }
});

ipcMain.on("read_from_file", (event, data) => {
  // let path_to_file = app.getPath('userData') + '/storage/' + data.file_name;
  let path_to_file = app_path + data.file_name;
  // console.log(path_to_file);

  // check if file exists
  if (fs.existsSync(path_to_file)) {
    const existdata = fs.readFileSync(path_to_file, { encoding: "utf8" });
    if (existdata != "") {
      // arTemp = JSON.parse(existdata);
      replyToWindow(data.reply_to, existdata);
    } else {
      sendStatusToWindow(
        `An error ocurred reading the ${data.file_name} file: ${existdata}`
      );
    }

    // fs.readFile(path_to_file, 'utf-8', (err, file_data) => {
    // 	if (err) {

    // 		return;
    // 	}

    // });
  } else {
    // sendStatusToWindow(`The ${data.file_name} file not exists.`);
    sendStatusToWindow("The data file does not exist.");

    replyToWindow(data.reply_to, "");
  }
});

ipcMain.on("open dialog", (event, data) => {
  // const { dialog } = require('electron').remote;
  dialog
    .showOpenDialog(appWin, {
      properties: ["openFile"], // set to use openFileDialog
      filters: [{ name: "PDFs", extensions: ["pdf"] }], // limit the picker to just pdfs
    })
    .then((result) => {
      console.log(result.canceled);
      console.log(result.filePaths);
      // const filePath = filepaths[0];
      appWin.webContents.send("selected pdf", result.filePaths[0]);
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * save Activity to file
 */
const fileactivitypath = app.getPath("desktop") + "\\GlobeIN_activity.json";

ipcMain.on("save activity", (event, o_data) => {
  let arTemp = [];
  if (fs.existsSync(fileactivitypath)) {
    const existdata = fs.readFileSync(fileactivitypath, { encoding: "utf8" });
    if (existdata != "") {
      arTemp = JSON.parse(existdata);
    }
  }
	o_data["mid"] = pcId; //machine id
  arTemp.push(o_data);

  // .writeFile .appendFile
  fs.writeFileSync(fileactivitypath, JSON.stringify(arTemp), (err) => {
    if (err) {
      sendStatusToWindow("An error ocurred creating the file " + err.message);
    }
  });
});
ipcMain.on("upload activity", (event, data) => {
  if (fs.existsSync(fileactivitypath)) {
    const existdata = fs.readFileSync(fileactivitypath, { encoding: "utf8" });
    if (existdata != "") {
      // replyToWindow(data.reply_to, existdata);

      let myformData = {
        logs: existdata,
      };

      request.post(
        {
          url: `${apiUrl}/request/save_logs/`,
          form: myformData,
        },
        function (err, httpResponse, body) {
          if (err) {
            return console.error("upload failed:", err);
          }
          // console.log("Upload successful!  Server responded with:", body);
          console.log("upload body", body);
          try {
            let objres = JSON.parse(body);
            if (objres.status == "success") {
              //clear activity file
              fs.writeFileSync(fileactivitypath, "");
            } else {
              console.error(body);
              sendStatusToWindow(body);
            }
          } catch (e) {
            console.log(`${e}`);
            sendStatusToWindow(`Failed to save the ${data.file_name} file!`);
          }
        }
      );
    } else {
      // sendStatusToWindow(
      //   `${fileactivitypath} File is empty or an error ocurred reading: ${existdata}`
      // );
    }
  } else {
    sendStatusToWindow(`The data file ${fileactivitypath} does not exist.`);
    replyToWindow(data.reply_to, "");
  }
});


//-------------------------------------------------------------------
// Download files. Works in launchWin
//
// This will download files from web to your local machine.
//-------------------------------------------------------------------
var counter_download;
var data_download = {};
var path_tmp = "";

ipcMain.on("download", (event, data) => {
  data_download = data;
  path_tmp = app.getPath("userData") + "/storage/";
  log.info("Start download files to " + path_tmp + " directory ...");
  counter_download = -1;

  // delete files (folders) that is not in data.files
  // ...

  checkDownloads();
});

async function downloadFile() {
  let current_file = data_download.files[counter_download];
  // check if file on server exists. size should be > 0
  // check if file exists in local folder

  // check if size different
  // ...
  let localFileSizeInBytes = 0;
  let localFileLocation = path_tmp + current_file.file_name;
  if (fs.existsSync(localFileLocation)) {
    let stats = fs.statSync(localFileLocation);
    // console.log(stats);
    localFileSizeInBytes = stats.size;
  }

  if (current_file.size == localFileSizeInBytes) {
    // unpackZip(localFileLocation);
    let fileext = path.extname(localFileLocation); // returns    '.html'
    if (fileext == ".zip") {
      await unzip(localFileLocation, app_path);
    }

    launchWin.webContents.send("download file", {
      status: "skipped",
      file_name: current_file.file_name,
    });
    // skip to download
    checkDownloads();
  } else {
    // add progress
		log.log(`Start download file ${data_download.url + current_file.file_name}.`);
    download(launchWin, data_download.url + current_file.file_name, {
      // saveAs: true, //Show a Save As… dialog instead of downloading immediately.
      directory: path_tmp,
      overwrite: true,
      onProgress(percent) {
        launchWin.webContents.send("download progress", percent);
      },
    })
      .then(async (dl) => {
        let saved_path = dl.getSavePath();
        // unpackZip(saved_path);
        let fileext = path.extname(saved_path); // returns    '.html'
        if (fileext == ".zip") {
          await unzip(saved_path, app_path);
        }

        sendStatusToWindow(`Saved ${saved_path}`);
        launchWin.webContents.send("download file", {
          status: "saved",
          file_name: current_file.file_name,
        });
        // download next
        checkDownloads();
      })
      .catch((e) => {
        launchWin.webContents.send("download file", {
          status: "error",
          file_name: current_file.file_name,
        });
        log.error(`Can't download file ${current_file.file_name}.`);
        checkDownloads();
      });
  }
}

function checkDownloads() {
  if (counter_download + 1 < data_download.files.length) {
    counter_download++;
    downloadFile();
  } else {
    console.log(">>> all downloaded");
    launchWin.webContents.send("download_complete");
  }
}

/**
 * Example:
 *
 * await unzip("./tim.zip", "./");
 *
 * Will create directories:
 *
 * ./tim.zip
 * ./tim
 *
 * @param zipPath Path to zip file.
 * @param unzipToDir Path to the folder where the zip folder will be put.
 */
const unzip = (zipPath, unzipToDir) => {
  sendStatusToWindow(`Unpacking Start`);
  return new Promise((resolve, reject) => {
    try {
      // Create folder if not exists
      if (!fs.existsSync(unzipToDir)) {
        fs.mkdirSync(unzipToDir);
      }

      var unzipper = new DecompressZip(zipPath);
      unzipper.on("error", (err) => {
        console.log("Caught an error");
        sendStatusToWindow("Caught an error");
        reject(err);
      });
      unzipper.on("extract", (log) => {
        console.log("Finished extracting");
        sendStatusToWindow(`Unpacking End`);
        resolve();
      });
      unzipper.on("progress", (fileIndex, fileCount) => {
        console.log("Extracted file " + (fileIndex + 1) + " of " + fileCount);
      });
      unzipper.extract({
        path: unzipToDir,
        restrict: false,
        // filter: function (file) {
        //   return file.type !== "SymbolicLink";
        // },
      });
    } catch (e) {
      reject(e);
    }
  });
};



let winpopup = null;
ipcMain.on("external popup", (event, data) => {
  // console.log(data.src);

  if (winpopup == null) {
    winpopup = new BrowserWindow({
      width: 800,
      height: 600,
      // show: false,
      center: true,
      alwaysOnTop: true,
      modal: true,
      autoHideMenuBar: true,
      minimizable: false,
    });
    // winpopup.setMenu(null);
  } else {
    //bring to front
    winpopup.restore();
    winpopup.focus();
  }

  // winpopup.setFullScreen(true);
  winpopup.maximize();
  winpopup.loadURL(data.src);

  winpopup.once("ready-to-show", () => {
    // log.info('Popup ready to show.');
    // winpopup.show();
  });
  winpopup.once("show", () => {
    // ready_app_win = true;
    // winpopup.webContents.send('ready communicate');
  });
  winpopup.on("closed", () => {
    log.info("Popup closed.");
    winpopup = null;
  });

  // Or load a local HTML file
  // winpopup.loadFile('index.html')

  // winpopup.once('ready-to-show', () => winpopup.hide())
  // winpopup.webContents.on('did-finish-load', () => {
  //   // winpopup = null;
  // });

  replyToWindow(data.reply_to, "complete");
});


/**
 * HOT KEYS
 */
function setupGlobalHotKeys() {
  globalShortcut.register("ctrl+E", function () {
    //exportActivity();
  });
}
