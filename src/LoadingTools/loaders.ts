import Level from '../Level';
import { TILE_SIZE } from '../constants';
import { makeFixedLayer, loadTilesFromJson } from './loaderUtilities';
import TileSet from './TileSet';

export function loadImage(url: string): Promise<HTMLCanvasElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {

            const buffer = document.createElement('canvas');
            buffer.width = image.naturalWidth;
            buffer.height = image.naturalHeight;
            buffer.getContext('2d').drawImage(image, 0, 0);

            resolve(buffer);
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
        terrain.define('flat', 'assets/jg_assets/Solid blocks/Grass/Grass.png', [0, 0, 16, 16]),
        terrain.define('earth', './assets/jg_assets/Solid blocks/Dirt/Dirt.png', [0, 0, 16, 16])
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
