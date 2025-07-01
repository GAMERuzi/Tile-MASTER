const fruits = [
  "apple.svg",
  "cherry.svg",
  "orange.svg",
  "strawberry.svg",
  "peach.svg",
  "kiwi.svg",
  "plum.svg",
  "apricot.svg",
  "pineapple.svg"
];

let level = 1;
let selected = [];

function startGame() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
  loadLevel();
}

function loadLevel() {
  const board = document.getElementById("game-board");
  const slot = document.getElementById("slot-area");
  board.innerHTML = "";
  slot.innerHTML = "";
  selected = [];

  const numTiles = 15 + (level - 1) * 5;
  const tiles = [];

  for (let i = 0; i < numTiles; i++) {
    const fruit = fruits[Math.floor(Math.random() * fruits.length)];
    tiles.push(fruit);
  }

  shuffleArray(tiles);

  tiles.forEach(fruit => {
    const tile = document.createElement("div");
    tile.className = "tile";
    const img = document.createElement("img");
    img.src = `assets/fruits/${fruit}`;
    img.alt = fruit;
    tile.appendChild(img);
    tile.onclick = () => selectTile(tile, fruit);
    board.appendChild(tile);
  });

  document.getElementById("level-num").textContent = level;
}

function selectTile(tile, fruit) {
  if (selected.length >= 7) return;

  const slot = document.getElementById("slot-area");
  const newTile = tile.cloneNode(true);
  slot.appendChild(newTile);
  selected.push(fruit);
  tile.remove();

  checkMatch();
}

function checkMatch() {
  const counts = {};
  selected.forEach(f => counts[f] = (counts[f] || 0) + 1);

  for (let fruit in counts) {
    if (counts[fruit] === 3) {
      selected = selected.filter(f => f !== fruit);
      [...document.getElementById("slot-area").children].forEach(child => {
        if (child.querySelector("img").src.includes(fruit)) {
          child.remove();
        }
      });
    }
  }

  if (selected.length >= 7) {
    alert("Kaybettin! Baştan başlıyoruz.");
    level = 1;
    startGame();
  } else if (document.getElementById("game-board").children.length === 0) {
    level++;
    alert("Bölüm tamam!");
    loadLevel();
  }
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
