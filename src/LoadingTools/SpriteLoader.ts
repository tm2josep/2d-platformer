import { loadImage } from './loaders';
import { loadJson } from './loaderUtilities';
import { imageSubset, lenTwo } from '../types';
export class SpriteLoader {
    private spriteSheet: HTMLCanvasElement;
    private offsetX = -12;
    private offsetY = 0;
    constructor(private url: string) {
    }

    async getFrames(frameConfig: any): Promise<lenTwo<HTMLCanvasElement[]>> {
        if (!this.spriteSheet) {
            this.spriteSheet = await loadImage(this.url);
        }

        let frames = [false, true].map((flip) => {
            return frameConfig.map(
                ([x, y, w, h]: any) => {
                    const buffer = document.createElement('canvas');
                    buffer.width = w;
                    buffer.height = h;
                    const context = buffer.getContext('2d');

                    if (flip) {
                        context.scale(-1, 1);
                        context.translate(-w, 0);
                    }

                    context.drawImage(
                        this.spriteSheet, x, y, w, h,
                        this.offsetX * (flip ? -1 : 1),
                        this.offsetY * (flip ? -1 : 1),
                        w, h,
                    );
                    return buffer;
                }
            );
        });

        return <any>frames;
    }

    async loadFromConfig(jsonUrl: string) {
        const config = await loadJson(jsonUrl);
        const { width, height } = config._details;

        delete config._details;

        let animNames = Object.keys(config);

        return await Promise.all(animNames.map(async (name) => {
            let { loop, playbackModifier } = config[name];
            const frames = await this.getFrames(
                config[name].frames.map(
                    (frame: number[]) =>
                        [...frame, width, height]
                )
            );

            return {
                name,
                images: frames,
                loop,
                playbackModifier
            }

        }));
    }
}