import { Vec2 } from '../MathTools';
import Entity from '../Entity';
export default class Camera {
    public pos: Vec2;
    public size: Vec2;
    constructor(pos?: Vec2, size?: Vec2) {
        this.pos = pos || new Vec2(0, 0);
        this.size = size || new Vec2(500, 375);
    }

    follow(entity: Entity) {
        this.pos.x = entity.pos.x - 150;
        this.pos.y = entity.pos.y - 200;
    }
}