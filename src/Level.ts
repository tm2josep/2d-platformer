import { TileManager } from './TileManager';
export class Level {
    private levelData: any;
    constructor(private url: string) { }

    async load(): Promise<any> {
        let r = await fetch(`./levels/${this.url}.json`);
        this.levelData = await r.json();
    }

    drawTerrain(tiles: TileManager, context: CanvasRenderingContext2D) {
        console.log(this.levelData);
        this.levelData.terrain.forEach((
            { tile, ranges }:
                { tile: string, ranges: Array<number> }
        ) => {
            for (let i = ranges[0]; i < ranges[1]; ++i) {
                for (let j = ranges[2]; j < ranges[3]; ++j) {
                    tiles.draw(tile, context, i, j)
                }
            }
        })
    }
}
