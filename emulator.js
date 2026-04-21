const games = [
    {
        name: "Crash Bandicoot",
        file: "data/crash.bin",
        cover: "covers/crash.jpg"
    },
    {
        name: "Tekken 3",
        file: "data/tekken3.bin",
        cover: "covers/tekken3.jpg"
    },
    {
        name: "Resident Evil",
        file: "data/resident.bin",
        cover: "covers/resident.jpg"
    }
];

const library = document.getElementById("library");

games.forEach(game => {
    const div = document.createElement("div");
    div.className = "game";

    div.innerHTML = `
        <img src="${game.cover}">
        <p>${game.name}</p>
    `;

    div.onclick = () => loadGame(game.file);

    library.appendChild(div);
});

function loadGameFromFile(file) {
    const reader = new FileReader();

    reader.onload = function() {
        document.getElementById("player").innerHTML = `<div id="game"></div>`;

        window.EJS_player = "#game";
        window.EJS_core = "psx";
        window.EJS_biosUrl = "data/bios.bin";
        window.EJS_gameUrl = new Uint8Array(this.result);
        window.EJS_pathtodata = "https://www.emulatorjs.com/data/";

        if (window.EJS_start) EJS_start();
    };

    reader.readAsArrayBuffer(file);
}
