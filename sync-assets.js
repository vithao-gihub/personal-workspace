const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'www');

// Danh sách các file và thư mục cần đồng bộ vào www/
const assetsToCopy = [
    'index.html',
    'style.css',
    'script.js',
    'xlsx.full.min.js',
    'manifest.json',
    'sw.js',
    'icon.svg',
    'icon-192.png',
    'icon-512.png',
    'apple-touch-icon.png',
    'icon.ico'
];

const foldersToCopy = [
    'fonts'
];

function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }
    fs.readdirSync(from).forEach(element => {
        const fromPath = path.join(from, element);
        const toPath = path.join(to, element);
        if (fs.lstatSync(fromPath).isFile()) {
            fs.copyFileSync(fromPath, toPath);
        } else {
            copyFolderSync(fromPath, toPath);
        }
    });
}

function sync() {
    console.log('🔄 Đang đồng bộ hóa tài nguyên web vào www/...');
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    let count = 0;
    assetsToCopy.forEach(file => {
        const srcPath = path.join(__dirname, file);
        const destPath = path.join(targetDir, file);
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            count++;
        } else {
            console.warn(`⚠️ Cảnh báo: File ${file} không tìm thấy tại gốc!`);
        }
    });

    foldersToCopy.forEach(folder => {
        const srcFolder = path.join(__dirname, folder);
        const destFolder = path.join(targetDir, folder);
        if (fs.existsSync(srcFolder)) {
            copyFolderSync(srcFolder, destFolder);
            console.log(`📁 Đã sao chép thư mục: ${folder}/`);
        }
    });

    console.log(`✅ Đồng bộ thành công ${count} file vào thư mục www/!`);
}

sync();

