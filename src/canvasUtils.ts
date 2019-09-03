import { jsonTile, Vector2D } from './types';
import TileSet from './TileSet';
import Sprite from './Sprite';

export function makeBuffer(image: HTMLImageElement | HTMLCanvasElement, w: number, h: number, fit: boolean): HTMLCanvasElement {
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

export function makeFixedLayer(image: HTMLImageElement | HTMLCanvasElement, w: number, h: number, fit: boolean): Function {
    const buffer = makeBuffer(image, image.width, image.height, true);
    return (context: CanvasRenderingContext2D) => {
        context.drawImage(
            buffer,
            0, 0
        )
    }
}

export function createSpriteLayer(sprite: Sprite, pos: Vector2D) {
    return (context: CanvasRenderingContext2D) => {
        sprite.draw(context, pos.x, pos.y);
    }
}


export function drawTilesFromJson(
    context: CanvasRenderingContext2D,
    tiles: TileSet,
    set: Array<jsonTile>
): void {
    set.forEach(({ tile, ranges }: jsonTile) => {
        ranges.forEach(([xstart, xend, ystart, yend]) => {
            for (let i = xstart; i < xend; ++i) {
                for (let j = ystart; j < yend; ++j) {
                    tiles.draw(tile, context, i, j);
                }
            }
        })
    });
}
