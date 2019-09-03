export default class Sprite {
    private animations: Map<string, Array<HTMLImageElement>>;

    constructor(
        public readonly state: string,
        private images: Array<HTMLImageElement>
    ) {
        this.animations = new Map();
        this.defineAnimation(state, images);
    }

    defineAnimation(name: string, images: Array<HTMLImageElement>) {
        this.animations.set(name, images);
    }

    draw(context: CanvasRenderingContext2D, x: number, y: number) {
        context.drawImage(
            this.animations.get(this.state)[0],
            x, y
        );
    }

    // play(
    //     context: CanvasRenderingContext2D,
    //     state: string,
    // ) {
    //     let anim = this.animations.get(state);
    //     let i = 0;
    //     let max = anim.length;

    //     setInterval(() => {
    //         context.drawImage(anim[i], this.pos.x, this.pos.y);
    //         i++;
    //         if (i >= max) {
    //             i = 0;
    //         }

    //     }, 100);
    // }
}