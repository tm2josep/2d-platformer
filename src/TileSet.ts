export class TileSet extends Map {
    loadTiles(configObj: any) {
        return new Promise((resolve, reject) => {
            let tileNames = Object.keys(configObj);
            const tiles = tileNames.map(async (tileName) => {
                return [
                    tileName,
                    await this.load(configObj[tileName])
                ];
            });

            Promise.all(tiles).then((...loadedTiles) => {
                loadedTiles.forEach(tile => {
                    this.set(tile[0], tile[1]);
                });
                resolve();
            }).catch(reject);
        });
    }

    load(file: string): Promise<CanvasRenderingContext2D> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const buffer = document.createElement('canvas').getContext('2d');
            img.src = `./assets/${file}`;
            img.onload = () => {
                buffer.drawImage(img, 0, 0);
                resolve(buffer);
            };
            img.onerror = (error) => {
                reject(error);
            }
        })
    }
}