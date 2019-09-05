export default class Sprite {
    private animations: Map<string, { images: Array<HTMLImageElement>, loop: boolean }>;
    private frameTime: number;
    private frame: number

    constructor(
        public state: string,
        private images: Array<HTMLImageElement>
    ) {
        this.animations = new Map();
        this.defineAnimation(state, images); // idle always loops
        this.frame = 0;
        this.frameTime = 0;
    }

    update(delta: number) {
        this.frameTime += delta;
        const currentAnim = this.animations.get(this.state);
        
        if (!currentAnim.loop) {
            return;
        }

        while (this.frameTime > delta) {
            this.frameTime -= delta;
            this.frame += delta * 5;
            if (this.frame >= currentAnim.images.length) {
                this.frame = 0;
            }
        }
    }

    defineAnimation(name: string, images: Array<HTMLImageElement>, loop = true) {
        this.animations.set(name, { images, loop });
    }

    draw(context: CanvasRenderingContext2D, x: number, y: number) {
        context.drawImage(
            this.animations.get(this.state).images[Math.floor(this.frame)],
            x, y
        );
    }
}