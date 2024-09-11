window.addEventListener("load", () => {
    window.electronAPI.callInitialize(1);
});

window.electronAPI.loadSettings((res) => {
    const theme = res.theme;

    document.documentElement.setAttribute("data-bs-theme", theme);
});

window.electronAPI.receiveInitialize((res) => {
    const shortcuts = [];
    const icons = [];

    res.shortcuts.map((item) => { shortcuts.push(item) });
    res.icons.map((item) => { icons.push(item) });

    shortcuts.map((shortcut) => {
        icons.map((icon) => {
            if (shortcut.split(".")[0] === icon.split(".")[0]) {
                window.electronAPI.loadSettings((res) => {
                    const icons = res.icons;
                    createItem(`./apps/icons/${icon}`, shortcut.split(".")[0], icons);
                });  
            }
        });
    });
});

const itemsList = document.getElementsByClassName("items-list")[0];
const items = document.getElementsByClassName("item");

function createItem(imgSrc, labelText, iconSize) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item', iconSize);

    itemDiv.addEventListener("dblclick", () => {
        window.electronAPI.openApp(`${labelText}.lnk`);
    });
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = imgSrc.split('/').pop();

    const textDiv = document.createElement('div');
    textDiv.classList.add('text-center', 'm-2', 'mt-0');

    const label = document.createElement('label');
    label.classList.add('fw-semibold');
    label.textContent = labelText;

    textDiv.appendChild(label);

    itemDiv.appendChild(img);
    itemDiv.appendChild(textDiv);

    itemsList.appendChild(itemDiv);
}

document.getElementById("lightButton").addEventListener("click", () => {
    document.documentElement.setAttribute("data-bs-theme", "light");
    window.electronAPI.theme("light");
});

document.getElementById("darkButton").addEventListener("click", () => {
    document.documentElement.setAttribute("data-bs-theme", "dark");
    window.electronAPI.theme("dark");
});

document.getElementById("normalButton").addEventListener("click", () => {
    Array.from(items).forEach((item) => {
        item.classList.replace("small", "normal");
        window.electronAPI.icons("normal");
    });
});

document.getElementById("smallButton").addEventListener("click", () => {
    Array.from(items).forEach((item) => {
        item.classList.replace("normal", "small");
        window.electronAPI.icons("small");
    });
});
