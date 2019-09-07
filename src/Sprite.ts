import { animation } from './types';
export default class Sprite {
    private animations: Map<string, animation>;
    private frameTime: number;
    private frame: number

    constructor(
        private _state: string,
        images: Array<HTMLCanvasElement>
    ) {
        this.animations = new Map();
        this.defineAnimation(_state, images); // idle always loops
        this.frame = 0;
        this.frameTime = 0;
    }

    set state(stateName: string) {
        if (!this.animations.has(stateName)) {
            return;
        }

        if (stateName == this._state) {
            return;
        }

        this.frame = 0;
        this._state = stateName;
    }

    update(delta: number) {
        this.frameTime += delta;
        const currentAnim = this.animations.get(this._state);

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

    defineAnimation(name: string, images: Array<HTMLCanvasElement>, loop = true) {
        this.animations.set(name, { images, loop });
    }

    draw(context: CanvasRenderingContext2D, x: number, y: number) {
        context.drawImage(
            this.animations.get(this._state).images[Math.floor(this.frame)],
            x, y
        );
    }
}