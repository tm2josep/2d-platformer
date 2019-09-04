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
    private readonly air = { type: 'air', collidable: false }
    constructor() {
        this.grid = [];

    }

    get(x: number, y: number): tileData {
        if (!this.grid[x]) {
            return this.air;
        }

        if (!this.grid[x][y]) {
            return this.air;
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