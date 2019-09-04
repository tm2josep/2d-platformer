import { jsonTile } from './types';
import TileSet from './TileSet';
import { WIDTH, HEIGHT, TILE_SIZE } from './constants';
import { Matrix } from './MathTools';
import Level from './Level';

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
    return (context: CanvasRenderingContext2D) => {
        context.drawImage(
            buffer,
            0, 0
        )
    }
}

export function createCollisionLayer(level: Level): Function {
    const resolvedTiles: Array<{ x: number, y: number }> = [];

    const tileResolver = level.collider.tiles;

    const getIndexByOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function (pos) {
        resolvedTiles.push(pos);
        return getIndexByOriginal.call(tileResolver, pos);
    }

    return (context: CanvasRenderingContext2D) => {
        resolvedTiles.forEach(({ x, y }) => {
            context.strokeStyle = 'blue';
            context.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        });

        level.entities.forEach(entity => {
            context.strokeStyle = 'red';
            context.strokeRect(entity.pos.x, entity.pos.y, entity.size.x, entity.size.y);
        })

        resolvedTiles.length = 0;
    }

}

export function loadTilesFromJson(
    tiles: TileSet,
    matrix: Matrix,
    set: Array<jsonTile>
): Function {
    const buffer = document.createElement('canvas');
    buffer.width = WIDTH;
    buffer.height = HEIGHT;

    const context = buffer.getContext('2d');

    set.forEach(({ tile, ranges }: jsonTile) => {
        ranges.forEach(([xstart, xend, ystart, yend]) => {
            for (let i = xstart; i < xend; ++i) {
                for (let j = ystart; j < yend; ++j) {
                    tiles.draw(tile, context, i, j);
                    matrix.set(i, j, { type: tile, collides: true })
                }
            }
        })
    });

    return makeFixedLayer(buffer);
}
