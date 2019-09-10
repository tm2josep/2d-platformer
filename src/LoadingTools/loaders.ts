import Level from '../Level';
import { TILE_SIZE } from '../constants';
import { makeFixedLayer, setTilesInMatrix, loadJson } from './loaderUtilities';
import TileSet from './TileSet';
import { TileLayer } from './TileLayer';

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
        loadJson(`./Levels/${lvl}.json`),
        terrain,
        terrain.loadDefinitions(
            loadJson("./assets/jg_assets/Solid blocks/definition.json")
        )
    ]).then(([levelData, terrain]) => {
        const level = new Level(terrain);

        setTilesInMatrix(terrain, level.matrix, levelData.terrain);
        return level;
    });
}
