import { Matrix } from '../MathTools';
import Entity from '../Entity';
import { Resolver } from './Resolver';
import { TILE_SIZE } from '../constants';

export class TileCollider {
    public tiles: Resolver;

    constructor(matrix: Matrix) {
        this.tiles = new Resolver(matrix);
    }

    test(entity: Entity) {
        this.checkY(entity);
    }

    checkY(entity: Entity) {
        const pos2 = {
            x: entity.pos.x + entity.size.x,
            y: entity.pos.y + entity.size.y
        };
        const matches = this.tiles.searchByRange(
            Object.assign(entity.pos, {}),
            pos2
        );

        matches.forEach(match => {
            if (!match.tile.collides) {
                return;
            }

            if (entity.trait('velocity').vec.y > 0) {
                if (entity.pos.y + entity.size.y > match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.trait('velocity').vec.y = 0;
                }
            }

            if (entity.trait('velocity').vec.y < 0) {
                if (entity.pos.y < match.y2) {
                    entity.pos.y = match.y2;
                    entity.trait('velocity').vec.y = 0;
                }
            }
        });
    }
}