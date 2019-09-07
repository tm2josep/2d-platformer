import { loadImage } from './LoadingTools/loaders';
export default class TileSet {
    private tiles: Map<string, HTMLCanvasElement>;
    constructor(public readonly tileSize: number) {
        this.tiles = new Map();
    }

    async define(name: string, url: string) {
        let image = await loadImage(url);

        const buffer = document.createElement('canvas');
        buffer.getContext('2d').drawImage(image, 0, 0, buffer.width, buffer.height);
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