// imports
import { loadImage, loadLevel, loadAnimation } from './loaders';
import { makeFixedLayer, drawTilesFromJson } from './canvasUtils';

import TileSet from './TileSet';
import Sprite from './Sprite';
import Compositor from './Compositor';
import Entity from './Entity';
import Timer from './Timer';

// Constants
const WIDTH = 1000;
const HEIGHT = 750;
const TILESIZE = 25;
const GRAVITY = 10;

// Document Setup
const canvas = <HTMLCanvasElement>document.getElementById('screen');
const context = canvas.getContext('2d');

// Logic
let terrain = new TileSet(TILESIZE);
const comp = new Compositor();

Promise.all([
    loadImage('./assets/BG/BG.png'),
    loadLevel('1-1'),
    loadAnimation('run', 6),
    terrain.define('flat', './assets/Tiles/2.png'),
    terrain.define('earth', './assets/Tiles/5.png')
]).then(([background, level, spriteFrames]) => {

    const ground = document.createElement('canvas');
    ground.width = WIDTH;
    ground.height = HEIGHT;
    drawTilesFromJson(ground.getContext('2d'), terrain, level.terrain);

    let player = new Entity(new Sprite('run', spriteFrames));
    player.pos.set(50, 600);
    player.vel.set(200, -600);

    comp.addLayers(
        makeFixedLayer(background, WIDTH, HEIGHT, true),
        makeFixedLayer(ground, WIDTH, HEIGHT, true),
        (context: CanvasRenderingContext2D) => player.draw(context)
    );
    const timer = new Timer(1 / 60, (delta: number) => {
        player.update(delta);
        player.vel.y += GRAVITY;
        comp.draw(context);
    });

    timer.start();
});