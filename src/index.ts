import { ImageLoader } from "./ImageLoader";
import { TileManager } from './TileManager';
import { Level } from './Level';

const canvas = <HTMLCanvasElement>document.getElementById("screen")
const ctx = canvas.getContext("2d");

const imageDefinitions = {
    "leftCorner": "Tiles/1",
    "flat": "Tiles/2",
    "rightCorner": "Tiles/3",
    "leftWall": "Tiles/4",
    "earth": "Tiles/5"
}

const images = new ImageLoader();
const tiles = new TileManager(25);
const level = new Level('1-1');


Promise.all([
    images.loadImages(imageDefinitions),
    level.load()
]).then(() => {
    tiles.set('flat', images.get('flat'));
    tiles.set('earth', images.get('earth'));
    level.drawTerrain(tiles, ctx);
});
