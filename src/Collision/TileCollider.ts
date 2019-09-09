import { Matrix } from '../MathTools';
import Entity from '../Entity';
import { Resolver } from './Resolver';
import { TILE_SIZE } from '../constants';

export class TileCollider {
    public tiles: Resolver;

    constructor(matrix: Matrix) {
        this.tiles = new Resolver(matrix);
    }

    checkY(entity: Entity) {
        const pos2 = {
            x: entity.pos.x + entity.size.x,
            y: entity.pos.y + entity.size.y
        };
        const matches = this.tiles.searchByRange(
            entity.pos,
            pos2
        );

        matches.forEach(match => {
            if (!match.tile.collides) {
                return;
            }

            if (entity.vel.y > 0) {
                if (entity.pos.y + entity.size.y > match.y1) {
                    entity.pos.y = match.y1 - entity.size.y;
                    entity.vel.y = 0;
                }
            }

            if (entity.vel.y < 0) {
                if (entity.pos.y < match.y2) {
                    entity.pos.y = match.y2;
                    entity.vel.y = 0;
                }
            }
        });
    }

    checkX(entity: Entity) {
        const pos2 = {
            x: entity.pos.x + entity.size.x,
            y: entity.pos.y + entity.size.y
        };
        const matches = this.tiles.searchByRange(
            entity.pos,
            pos2
        );

        matches.forEach(match => {
            if (!match.tile.collides) {
                return;
            }

            if (entity.vel.x > 0) {
                if (entity.pos.x + entity.size.x > match.x1) {
                    entity.pos.x = match.x1 - entity.size.x;
                    entity.vel.x = 0;
                }
            }

            if (entity.vel.x < 0) {
                if (entity.pos.x < match.x2) {
                    entity.pos.x = match.x2;
                    entity.vel.x = 0;
                }
            }
        });
    }
}