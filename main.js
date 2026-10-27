const { app, BrowserWindow, shell, session } = require('electron');
const path = require('path');

let mainWindow = null;

function createWindow() {
    const iconPath = process.platform === 'win32' 
        ? path.join(__dirname, 'icon.ico') 
        : path.join(__dirname, 'icon-512.png');

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 820,
        minWidth: 960,
        minHeight: 640,
        title: 'Quản Lí Cá Nhân 2.0',
        icon: iconPath,
        autoHideMenuBar: true,
        backgroundColor: '#0F172A',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            spellcheck: false
        }
    });

    // Ẩn menu mặc định của Electron để giao diện chuyên nghiệp
    mainWindow.setMenuBarVisibility(false);

    // Tải file HTML từ thư mục www đã đồng bộ
    const startUrl = path.join(__dirname, 'www', 'index.html');
    mainWindow.loadFile(startUrl);

    // Mở các liên kết ngoài bằng trình duyệt mặc định của hệ điều hành
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('http:') || url.startsWith('https:')) {
            shell.openExternal(url);
            return { action: 'deny' };
        }
        return { action: 'allow' };
    });

    // Xử lý sự kiện tải xuống (Xuất Excel, JSON) mượt mà
    mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
        item.on('updated', (event, state) => {
            if (state === 'interrupted') {
                console.log('[Electron] Tải xuống bị gián đoạn:', item.getFilename());
            }
        });
        item.once('done', (event, state) => {
            if (state === 'completed') {
                console.log('[Electron] Tải file thành công:', item.getSavePath());
            }
        });
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Giới hạn chỉ mở 1 cửa sổ duy nhất (Single Instance Lock)
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });

    app.whenReady().then(() => {
        createWindow();

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    });
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

