import { TILE_SIZE } from '../constants';
import { Matrix } from '../MathTools';

export class Resolver {
    constructor(private matrix: Matrix) { }

    asIndex(n: number) {
        return Math.floor(n / TILE_SIZE);
    }

    toIndex(pos: { x: number, y: number }) {
        return {
            x: this.asIndex(pos.x),
            y: this.asIndex(pos.y)
        }
    }

    asIndexRange(p1: number, p2: number) {
        const pMax = Math.ceil(p2 / TILE_SIZE) * TILE_SIZE;
        const range = [];
        let pos = p1;
        do {
            range.push(this.asIndex(pos));
            pos += TILE_SIZE;
        } while (pos < pMax);
        return range;
    }

    getByIndex(pos: { x: number, y: number }) {
        const tile = this.matrix.get(pos.x, pos.y);
        if (tile) {
            const y1 = pos.y * TILE_SIZE;
            const y2 = y1 + TILE_SIZE;
            const x1 = pos.x * TILE_SIZE;
            const x2 = x1 + TILE_SIZE;
            return {
                tile,
                x1, 
                x2,
                y1,
                y2
            }
        }
    }

    searchByPosition(pos: { x: number, y: number }) {
        return this.getByIndex(this.toIndex(pos));
    }

    searchByRange(
        pos1: { x: number, y: number },
        pos2: { x: number, y: number }
    ) {
        const matches: Array<any> = [];
        this.asIndexRange(pos1.x, pos2.x).forEach(indexX => {
            this.asIndexRange(pos1.y, pos2.y).forEach(indexY => {
                const match = this.getByIndex({ x: indexX, y: indexY });
                if (match) {
                    matches.push(match);
                }
            })
        });
        return matches;
    }
}