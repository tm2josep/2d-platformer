export default class Sprite {
    private animations: Map<string, Array<HTMLImageElement>>;
    private frameTime: number;
    private frame: number

    constructor(
        public readonly state: string,
        private images: Array<HTMLImageElement>
    ) {
        this.animations = new Map();
        this.defineAnimation(state, images);
        this.frame = 0;
        this.frameTime = 0;
    }

    update(delta: number) {
        this.frameTime += delta;
        const currentAnim = this.animations.get(this.state);

        while(this.frameTime > delta) {
            this.frameTime -= delta;
            this.frame += delta * 5;
            if (this.frame >= currentAnim.length) {
                this.frame = 0;
            }
        }
    }

    defineAnimation(name: string, images: Array<HTMLImageElement>) {
        this.animations.set(name, images);
    }

    draw(context: CanvasRenderingContext2D, x: number, y: number) {
        context.drawImage(
            this.animations.get(this.state)[Math.floor(this.frame)],
            x, y
        );
    }
}