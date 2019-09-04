import Level from './Level';
import { TILESIZE, WIDTH, HEIGHT } from './constants';
import { drawTilesFromJson, makeFixedLayer } from './canvasUtils';
import TileSet from './TileSet';

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        }
        image.src = url;
        image.onerror = () => {
            reject(`Failed to load image ${url}`);
        }
    });
}

export function loadLevel(lvl: string): Promise<Level> {
    let terrain = new TileSet(TILESIZE);
    return Promise.all([
        fetch(`./Levels/${lvl}.json`),
        loadImage('./assets/BG/BG.png'),
        terrain.define('flat', './assets/Tiles/2.png'),
        terrain.define('earth', './assets/Tiles/5.png')
    ]).then(async ([r, background]) => {
        return {
            data: await r.json(),
            bg: background
        }
    }).then(({ data: levelData, bg: background }) => {
        const level = new Level();
        
        const ground = document.createElement('canvas');
        ground.width = WIDTH;
        ground.height = HEIGHT;
        drawTilesFromJson(ground.getContext('2d'), terrain, levelData.terrain);

        level.comp.addLayers(
            makeFixedLayer(background, WIDTH, HEIGHT, true),
            makeFixedLayer(ground, WIDTH, HEIGHT, true)
        );

        return level;
    });
}

export function loadAnimation(animation: string, frameCount: number) {
    const template = (anim: string, frame: number) =>
        `./assets/Sprites/plain/frames/adventurer-${anim}-0${frame}.png`;

    let load = [];
    for (let i = 0; i < frameCount - 1; i++) {
        load.push(template(animation, i));
    }

    return Promise.all(load.map(loadImage));
}