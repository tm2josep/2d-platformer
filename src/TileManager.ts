export class TileManager extends Map {
    constructor(private tileSize: number) { super() }

    draw(name: string, context: CanvasRenderingContext2D, x: number, y: number) {
        context.drawImage(
            this.get(name),
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize,
            this.tileSize
        )
    }
}