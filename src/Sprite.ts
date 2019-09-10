import { animation, lenTwo } from './types';
export default class Sprite {
    private animations: Map<string, animation>;
    private frameTime: number;
    private frame: number;
    public dir: string;

    constructor(
        private _state: string,
    ) {
        this.animations = new Map();
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

    private get frameDirection() {
        return this.dir === 'left' ? 1 : 0;
    }

    private get currentAnim() {
        return this.animations.get(this._state);
    }

    private get currentFrames() {
        return this.animations.get(this._state).images[this.frameDirection]
    }

    update(delta: number) {
        this.frameTime += delta;
        while (this.frameTime > delta) {
            this.frameTime -= delta;
            this.frame += delta * this.currentAnim.playbackModifier;
            if (this.frame >= this.currentFrames.length) {
                this.frame = this.currentAnim.loop ? 0 : this.currentFrames.length - 1;
            }
        }
    }

    adjustPlayback(name: string, value: number) {
        this.animations.get(name).playbackModifier = value;
    }

    defineAnimation(
        name: string,
        images: lenTwo<HTMLCanvasElement[]>,
        loop = true,
        playbackModifier = 10
    ) {
        this.animations.set(name, { images, loop, playbackModifier });
    }

    draw(context: CanvasRenderingContext2D, x: number, y: number) {
        context.drawImage(
            this.animations.get(this._state).images[
            this.dir === 'left' ? 1 : 0
            ][
            Math.floor(this.frame)
            ],
            x, y
        );
    }
}