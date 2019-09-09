import { loadImage } from './loaders';
import { jsonTileDefinition, imageSubset } from '../types';

export default class TileSet {
    private tiles: Map<string, { buffer: HTMLCanvasElement, collides: boolean }>;
    constructor(public readonly tileSize: number) {
        this.tiles = new Map();
    }

    async define(name: string, url: string, subset: imageSubset<number>, collides: boolean) {
        let image = await loadImage(url);
        const buffer = document.createElement('canvas');
        buffer.getContext('2d').drawImage(
            image,
            subset[0], subset[1], subset[2], subset[3],
            0, 0, buffer.width, buffer.height
        );
        this.tiles.set(name, { buffer, collides });
    }

    async loadDefinitions(json: Promise<any>) {
        let data = await json;
        let tiles = Object.keys(data);
        return Promise.all(
            tiles.map((tile) => {
                let tileObject: jsonTileDefinition = data[tile];
                return this.define(
                    tile,
                    tileObject.url,
                    tileObject.subset,
                    tileObject.collides
                )
            })
        );
    }

    doesCollide(name: string) {
        return this.tiles.get(name).collides;
    }

    draw(name: string, context: CanvasRenderingContext2D, x: number, y: number) {
        context.drawImage(
            this.tiles.get(name).buffer,
            x * this.tileSize, y * this.tileSize,
            this.tileSize, this.tileSize
        )
    }
}