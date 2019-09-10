import { jsonTile } from '../types';
import TileSet from './TileSet';
import { Matrix } from '../MathTools';
import Camera from '../Camera/Camera';

export function loadJson(url: string) {
    return fetch(url).then(r => r.json());
}

export function makeBuffer(
    image: HTMLImageElement | HTMLCanvasElement,
    w: number,
    h: number,
    fit: boolean
): HTMLCanvasElement {
    const buffer = document.createElement('canvas');
    buffer.width = w;
    buffer.height = h;
    if (fit) {
        buffer.getContext('2d').drawImage(image, 0, 0, buffer.width, buffer.height);
    } else {
        buffer.getContext('2d').drawImage(image, 0, 0);
    }
    return buffer;
}

export function makeFixedLayer(image: HTMLImageElement | HTMLCanvasElement): Function {
    const buffer = makeBuffer(image, image.width, image.height, true);
    return (context: CanvasRenderingContext2D, camera: Camera) => {
        context.drawImage(
            buffer,
            -camera.pos.x, -camera.pos.y
        )
    }
}

export function setTilesInMatrix(
    tiles: TileSet,
    matrix: Matrix,
    set: Array<jsonTile>
) {
    set.forEach(({ tile, ranges }: jsonTile) => {
        ranges.forEach(([x0, x1, y0, y1]) => {
            for (let i = x0; i < x1; ++i) {
                for (let j = y0; j < y1; ++j) {
                    matrix.set(i, j, { type: tile, collides: tiles.doesCollide(tile) })
                }
            }
        })
    });
}