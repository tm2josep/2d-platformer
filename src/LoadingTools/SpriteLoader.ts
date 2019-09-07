import { loadImage } from './loaders';
export class SpriteLoader {
    private spriteSheet: HTMLCanvasElement;
    constructor(private url: string) {
    }

    async getFrames(frameConfig: {
        x: number,
        y: number,
        w: number,
        h: number
    }[]) {
        if (!this.spriteSheet) {
            this.spriteSheet = await loadImage(this.url);
        }
        return frameConfig.map((frame) => {
            const buffer = document.createElement('canvas');
            buffer.getContext('2d').drawImage(
                this.spriteSheet,
                frame.x,
                frame.y,
                frame.w,
                frame.h,
                -12, 0, 50, 37,
            );
            return buffer;
        });
    }
}