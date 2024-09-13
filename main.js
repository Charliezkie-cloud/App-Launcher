const { app, BrowserWindow, ipcMain } = require('electron')
const { exec } = require('child_process');
const path = require('node:path');
const fs = require("fs").promises;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        minWidth: 960,
        minHeight: 540,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    ipcMain.on("open-app", (event, value) => {
        const lnkPath = path.join(__dirname, "apps", "shortcuts", value);

        exec(`start "" "${lnkPath}"`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
        });
    });

    ipcMain.on("theme", async (event, value) => {
        const json = await fs.readFile(path.join(__dirname, "app-settings.json"), "utf-8").catch((err) => console.error(err));;
        const jsonData = JSON.parse(json);

        jsonData.theme = value;

        fs.writeFile(path.join(__dirname, "app-settings.json"), JSON.stringify(jsonData), "utf-8").catch((err) => console.error(err));
    });

    ipcMain.on("icons", async (event, value) => {
        try {
            const json = await fs.readFile(path.join(__dirname, "app-settings.json"), "utf-8").catch((err) => console.error(err));;
            const jsonData = JSON.parse(json);
    
            jsonData.icons = value;

            fs.writeFile(path.join(__dirname, "app-settings.json"), JSON.stringify(jsonData), "utf-8").catch((err) => console.error(err));
        } catch (err) {
            console.error(err);
            throw err;
        }
    });

    mainWindow.loadFile('index.html');
    mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})