window.electronAPI.callInitialize(1);

window.electronAPI.loadSettings((res) => {
    const theme = res.theme;
    const icons = res.icons;

    document.documentElement.setAttribute("data-bs-theme", theme);

    Array.from(document.getElementsByClassName("item")).forEach((item) => {
        item.classList.replace("small", icons);
    });
});

const items = document.getElementsByClassName("item");

Array.from(items).forEach((item) => {
    item.addEventListener("dblclick", (e) => {
        window.electronAPI.openApp(item.getElementsByTagName("label")[0].innerText);
    });
});

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