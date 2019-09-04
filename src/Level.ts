import Compositor from './Compositor';
import Entity from './Entity';
import { Matrix } from './MathTools';
import { TileCollider } from './Collision/TileCollider';

export default class Level {
    public comp: Compositor;
    public entities: Set<Entity>;
    public matrix: Matrix;
    public collider: TileCollider;

    constructor() {
        this.comp = new Compositor();
        this.entities = new Set();
        this.matrix = new Matrix();
        this.collider = new TileCollider(this.matrix);
    }

    addEntity(entity: Entity) {
        this.entities.add(entity);
    }

    update(delta: number) {
        this.entities.forEach(entity => {
            entity.update(delta);
            this.collider.test(entity);
        });
    }
}