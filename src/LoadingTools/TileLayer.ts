import { Matrix } from '../MathTools';
import Level from '../Level';
import TileSet from './TileSet';
import Camera from '../Camera/Camera';
import { TILE_SIZE } from '../constants';

export class TileLayer {
    private tiles: Matrix;
    private buffer: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    constructor(level: Level, private tileSet: TileSet) {
        this.tiles = level.matrix;
        this.buffer = document.createElement('canvas');
        this.buffer.width = 1000;
        this.buffer.height = 750;
        this.context = this.buffer.getContext('2d');
    }

    redraw(
        x1: number,
        x2: number,
        y1: number,
        y2: number
    ) {
        this.context.clearRect(0, 0, this.buffer.width, this.buffer.height);
        for (let x = x1; x <= x2; x++) {
            if (!this.tiles.checkCol(x)) continue;
            for (let y = y1; y <= y2; y++) {
                if (!this.tiles.checkCell(x, y)) continue;
                this.tileSet.draw(this.tiles.get(x, y).type, this.context, x - x1, y - y1);
            }
        }
    }

    get layer() {
        return (context: CanvasRenderingContext2D, camera: Camera) => {
            const fromX = Math.floor(camera.pos.x / TILE_SIZE);
            const toX = fromX + Math.floor(camera.size.x / TILE_SIZE);

            const fromY = Math.floor(camera.pos.y / TILE_SIZE);
            const toY = fromY + Math.floor(camera.size.y / TILE_SIZE);

            this.redraw(fromX, toX, fromY, toY);

            context.drawImage(this.buffer, -camera.pos.x % TILE_SIZE, -camera.pos.y % TILE_SIZE)
        }
    }
}