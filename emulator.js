<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>SNES Emulator Browser</title>
<style>
  body {
    background: #111;
    color: white;
    text-align: center;
    font-family: Arial;
  }
  canvas {
    border: 3px solid #444;
    margin-top: 20px;
  }
</style>
</head>
<body>

<h1>🎮 SNES Emulator (Simples)</h1>

<input type="file" id="romInput" accept=".smc,.sfc"><br>

<canvas id="screen" width="256" height="224"></canvas>

<script>
// ⚠️ Isso é apenas um mock simplificado de emulação

let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");

let romData = null;

// Carregar ROM
document.getElementById("romInput").addEventListener("change", function(e) {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onload = function() {
        romData = new Uint8Array(reader.result);
        startEmulation();
    };

    reader.readAsArrayBuffer(file);
});

function startEmulation() {
    alert("ROM carregada! (modo simulado)");

    // Loop fake de renderização
    setInterval(renderFrame, 16);
}

function renderFrame() {
    if (!romData) return;

    // Simulação visual (não é emulação real)
    let img = ctx.createImageData(256, 224);

    for (let i = 0; i < img.data.length; i += 4) {
        let val = romData[i % romData.length];
        img.data[i] = val;
        img.data[i+1] = val * 0.5;
        img.data[i+2] = 255 - val;
        img.data[i+3] = 255;
    }

    ctx.putImageData(img, 0, 0);
}
</script>

</body>
</html>
