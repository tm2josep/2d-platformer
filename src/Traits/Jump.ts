import Trait from './Trait';
import Entity from '../Entity';
import KeyboardState from '../KeyboardState';
import { GRAVITY, SPACE } from '../constants';

export default class Jump extends Trait {
    private power = 300;
    private engageTime = 0;
    private duration = 0.5;

    constructor(
        private keyboard: KeyboardState
    ) {
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
            entity.trait('velocity').vec.y = -this.power;
            this.engageTime -= delta;
        }
    }

}