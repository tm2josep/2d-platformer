import Trait from './Trait';
import { Vec2 } from '../MathTools';
import Entity from '../Entity';

export default class Velocity extends Trait {
    public vec: Vec2;

    constructor() {
        super('velocity');
        this.vec = new Vec2(0, 0);
    }

    update(entity: Entity, delta: number) {
        entity.pos.x += this.vec.x * delta;
        entity.pos.y += this.vec.y * delta;
    }
}