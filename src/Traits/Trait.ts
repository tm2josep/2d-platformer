import Entity from '../Entity';
export default class Trait {
    constructor(public readonly NAME: string) {}
    update(entity: Entity, delta: number){
        console.warn('unhandled update call');
    }
}