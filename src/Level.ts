import Compositor from './Compositor';
import Entity from './Entity';
import { Matrix } from './MathTools';
import { TileCollider } from './Collision/TileCollider';
import TileSet from './LoadingTools/TileSet';

export default class Level {
    public comp: Compositor;
    public entities: Set<Entity>;
    public matrix: Matrix;
    public collider: TileCollider;

    constructor(public tileSet: TileSet) {
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
            entity.pos.x += entity.vel.x * delta;
            this.collider.checkX(entity);
            entity.pos.y += entity.vel.y * delta;
            this.collider.checkY(entity);
        });
    }
}