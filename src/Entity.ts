import Vec2 from './MathTools';
import Sprite from './Sprite';
export default class Entity {
    public pos: Vec2;
    public vel: Vec2;

    constructor(private sprite: Sprite) {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
    }

    update(delta: number) {
        this.pos.x += this.vel.x * delta;
        this.pos.y += this.vel.y * delta;
    }

    draw(context: CanvasRenderingContext2D) {
        this.sprite.draw(context, this.pos.x, this.pos.y);
    }
}