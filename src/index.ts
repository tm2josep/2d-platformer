// imports
import { loadImage, loadLevel, loadAnimation } from './loaders';
import { makeFixedLayer, drawTilesFromJson, createSpriteLayer } from './canvasUtils';
import TileSet from './TileSet';
import Sprite from './Sprite';
import Compositor from './Compositor';

// Constants
const WIDTH = 1000;
const HEIGHT = 750;
const TILESIZE = 25;

// Document Setup
const canvas = <HTMLCanvasElement>document.getElementById('screen');
const context = canvas.getContext('2d');

// Logic
let terrain = new TileSet(TILESIZE);
let player: Sprite;

const comp = new Compositor();

Promise.all([
    loadImage('./assets/BG/BG.png'),
    loadLevel('1-1'),
    loadAnimation('run', 6),
    terrain.define('flat', './assets/Tiles/2.png'),
    terrain.define('earth', './assets/Tiles/5.png')
]).then(([background, level, spriteFrames]) => {
    player = new Sprite('run', spriteFrames);

    const ground = document.createElement('canvas');
    ground.width = WIDTH;
    ground.height = HEIGHT;
    drawTilesFromJson(ground.getContext('2d'), terrain, level.terrain);

    const pos = { x: 25, y: 25 }

    comp.addLayers(
        makeFixedLayer(background, WIDTH, HEIGHT, true),
        makeFixedLayer(ground, WIDTH, HEIGHT, true),
        createSpriteLayer(player, pos)
    );

    function update() {
        pos.x += 5; pos.y += 5;
        comp.draw(context);
        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
});