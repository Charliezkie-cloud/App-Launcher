const fs = require("fs").promises;

async function readDirectories(dir1, dir2) {
    try {
        const [shortcuts, icons] = await Promise.all([
            fs.readdir(dir1),
            fs.readdir(dir2)
        ]);

        return {
            shortcuts,
            icons
        }
    } catch (err) {
        console.error('Error reading directories:', err);
        throw err;
    }
}

readDirectories("../apps/shortcuts", "../apps/icons").then((res) => {
    res.shortcuts.map(item => console.log(item));
    res.icons.map(item => console.log(item));
});