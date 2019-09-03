export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        }
        image.src = url;
        image.onerror = () => {
            reject(`Failed to load image ${url}`);
        }
    });
}

export function loadLevel(lvl: string): Promise<any> {
    return fetch(`./Levels/${lvl}.json`).then(r => r.json());
}

export function loadAnimation(animation: string, frameCount: number) {
    const template = (anim: string, frame: number) =>
        `./assets/Sprites/plain/frames/adventurer-${anim}-0${frame}.png`;

    let load = [];
    for (let i = 0; i < frameCount - 1; i++) {
        load.push(template(animation, i));
    }

    return Promise.all(load.map(loadImage));
}