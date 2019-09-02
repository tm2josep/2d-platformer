import { TileSet } from './TileSet';

const canvas = <HTMLCanvasElement>document.getElementById("screen")
const ctx = canvas.getContext("2d");

const tiles = {
    "leftCorner":"Tiles/1.png",
    "flat": "Tiles/2.png",
    "rightCorner": "Tiles/3.png",
    "leftWall":"Tiles/4.png",
    "solidEarth":"Tiles/5.png"
}

const tileSet = new TileSet();

ctx.fillStyle = "black";
ctx.fillRect(0,0,canvas.width,canvas.height);

tileSet.loadTiles(tiles).then();