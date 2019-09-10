export interface jsonTile {
    tile: string,
    ranges: number[][]
}

export interface imageSubset<T> {
    0: T,
    1: T,
    2: T,
    3: T
}

export interface lenTwo<T> {
    0: T,
    1: T
}

export interface tileData {
    type: string,
    collides: boolean
}

export interface animation {
    images: lenTwo<Array<HTMLImageElement | HTMLCanvasElement>>,
    loop: boolean,
    playbackModifier: number
}

export interface jsonTileDefinition {
    url: string,
    collides: boolean,
    subset: imageSubset<number>;
}