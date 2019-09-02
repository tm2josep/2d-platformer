export class ImageLoader extends Map {

    constructor() { super() }

    async loadImages(configObj: any) {

        let tileNames = Object.keys(configObj);
        const tiles = tileNames.map(async (tileName) => {
            return [await this.load(configObj[tileName]), tileName];
        });

        for await (let tile of tiles) {
            this.set(tile[1], tile[0]);
        }
    }

    load(file: string): Promise<HTMLCanvasElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const buffer = document.createElement('canvas');
            img.src = `./assets/${file}.png`;
            img.onload = () => {
                buffer.getContext('2d').drawImage(img, 
                    0, 0, img.width, img.height,
                    0, 0, buffer.width, buffer.width
                );
                resolve(buffer);
            };
            img.onerror = (error) => {
                reject(error);
            }
        })
    }
}