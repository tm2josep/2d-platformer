import Trait from './Trait';
import Entity from '../Entity';
import Sprite from '../Sprite';

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

    update(entity: Entity, delta: number, sprite: Sprite) {
        if (this.engageTime > 0) {
            sprite.state = 'jump';
            entity.vel.y = -this.power;
            this.engageTime -= delta;
        } else if (entity.vel.y > 50) {
            sprite.state = 'falling';
        }
    }
}