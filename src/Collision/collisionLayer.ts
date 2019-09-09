import Level from '../Level';
import Camera from '../Camera/Camera';
import { TILE_SIZE } from '../constants';

export function createCollisionLayer(level: Level): Function {
    const resolvedTiles: Array<{ x: number, y: number }> = [];

    const tileResolver = level.collider.tiles;

    const getIndexByOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function (pos) {
        resolvedTiles.push(pos);
        return getIndexByOriginal.call(tileResolver, pos);
    }

    return (context: CanvasRenderingContext2D, camera: Camera) => {
        resolvedTiles.forEach((tile) => {
            let {x, y} = tile;
            context.strokeStyle = 'blue';
            context.strokeRect(x * TILE_SIZE - camera.pos.x, y * TILE_SIZE - camera.pos.y, TILE_SIZE, TILE_SIZE);
        });

        level.entities.forEach(entity => {
            context.strokeStyle = 'red';
            context.strokeRect(entity.pos.x - camera.pos.x, entity.pos.y - camera.pos.y, entity.size.x, entity.size.y);
        })

        resolvedTiles.length = 0;
    }

}