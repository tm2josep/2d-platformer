import Trait from './Trait';
import Entity from '../Entity';

export default class Jump extends Trait {
    private power = 300;
    private engageTime = 0;
    private duration = 0.25;

    constructor() {
        super('jump');
    }

    start() {
        this.engageTime = this.duration;
    }

    cancel() {
        this.engageTime = 0;
    }

    update(entity: Entity, delta: number) {
        if (this.engageTime > 0) {
            entity.setAnim('jump');
            entity.vel.y = -this.power;
            this.engageTime -= delta;
        } else if (entity.vel.y > 50) {
            entity.setAnim('falling');
        }
    }

}