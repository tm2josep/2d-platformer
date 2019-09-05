export interface jsonTile {
    tile: string,
    ranges: number[][]
}

export interface tileData {
    type: string,
    collides: boolean
}

export interface animation {
    images: Array<HTMLImageElement>,
    loop: boolean
}