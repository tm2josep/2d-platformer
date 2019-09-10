import Trait from './Trait';
import Entity from '../Entity';
import Sprite from '../Sprite';

export default class Go extends Trait {
    public direction = 0;
    private speed = 100;


    constructor() {
        super('go');
    }

    update(entity: Entity, delta: number, sprite: Sprite) {
        entity.vel.x = this.direction * this.speed * (delta * 100);

        if (entity.vel.y > 50 ) {
            // falling, no running animation needed.
           return;
        }

        if (this.direction === 1) {
            sprite.dir = 'right'
        } else if (this.direction === -1) {
            sprite.dir = 'left'
        }

        if (this.direction === 0) {
            sprite.state = 'idle';
        } else if (this.direction !== 0) {
            sprite.state = 'run';
        }
    }
}