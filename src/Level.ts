import Compositor from './Compositor';
import Entity from './Entity';
export default class Level {
    public comp: Compositor;
    private entities: Set<Entity>;

    constructor() {
        this.comp = new Compositor();
        this.entities = new Set();
    }
}