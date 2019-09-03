export default class Vec2 {
    constructor(
        public x: number,
        public y: number
    ) {
        this.set(x, y);
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

}