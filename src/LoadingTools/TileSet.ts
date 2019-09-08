import { loadImage } from './loaders';
interface imageSubset<T> {
    0: T,
    1: T,
    2: T,
    3: T
}
export default class TileSet {
    private tiles: Map<string, HTMLCanvasElement>;
    constructor(public readonly tileSize: number) {
        this.tiles = new Map();
    }

    async define(name: string, url: string, subset?: imageSubset<number>) {
        let image = await loadImage(url);
        
        if (!subset) {
            subset = [0, 0, image.width, image.height];
        }

        const buffer = document.createElement('canvas');
        buffer.getContext('2d').drawImage(
            image,
            subset[0], subset[1], subset[2], subset[3],
            0, 0, buffer.width, buffer.height
        );
        this.tiles.set(name, buffer);
    }

    draw(name: string, context: CanvasRenderingContext2D, x: number, y: number) {
        context.drawImage(
            this.tiles.get(name),
            x * this.tileSize, y * this.tileSize,
            this.tileSize, this.tileSize
        )
    }
}