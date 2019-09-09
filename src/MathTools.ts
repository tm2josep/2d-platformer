import { tileData } from './types';
export class Vec2 {
    constructor(
        public x: number,
        public y: number
    ) {
        this.set(x, y);
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

}

export class Matrix {
    private grid: tileData[][];
    constructor() {
        this.grid = [];

    }

    checkCol(x: number): boolean {
        return this.grid[x] !== undefined;
    }

    checkCell(x: number, y: number): boolean {
        return this.grid[x][y] !== undefined;
    }

    getCol(x: number) {
        return this.grid[x];
    }

    get(x: number, y: number): tileData {
        if (!this.checkCol(x)) {
            return;
        }

        if (!this.checkCell(x, y)) {
            return;
        }

        return this.grid[x][y];
    }

    set(x: number, y: number, value: tileData): void {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }

        this.grid[x][y] = value;
    }
}