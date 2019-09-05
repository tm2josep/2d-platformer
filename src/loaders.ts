import Level from './Level';
import { TILE_SIZE, WIDTH, HEIGHT } from './constants';
import { makeFixedLayer, loadTilesFromJson } from './loaderUtilities';
import TileSet from './TileSet';
import { jsonTile } from './types';
import { Matrix } from './MathTools';

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
    let terrain = new TileSet(TILE_SIZE);
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

        const terrainLayer = loadTilesFromJson(terrain, level.matrix, levelData.terrain);

        level.comp.addLayers(
            makeFixedLayer(background),
            terrainLayer
        );

        return level;
    });
}

export function loadImages(...fileUrls: string[]) {
    return Promise.all(fileUrls.map(loadImage))
}