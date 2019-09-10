import Entity from '../Entity';
import Sprite from '../Sprite';
export default class Trait {
    constructor(public readonly NAME: string) { }
    update(entity: Entity, delta: number, sprite: Sprite) {
        console.warn('unhandled update call');
    }
}