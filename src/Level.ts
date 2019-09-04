import Compositor from './Compositor';
import Entity from './Entity';
import { Matrix } from './MathTools';

export default class Level {
    public comp: Compositor;
    private entities: Set<Entity>;
    public matrix: Matrix;

    constructor() {
        this.comp = new Compositor();
        this.entities = new Set();
        this.matrix = new Matrix();
    }
}