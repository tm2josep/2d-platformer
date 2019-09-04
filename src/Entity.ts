import { Vec2 } from './MathTools';
import Sprite from './Sprite';
import Trait from './Traits/Trait';

export default class Entity {
    public pos: Vec2;
    private traits: Map<string, any>;

    constructor(
        private sprite: Sprite,
        public size: Vec2
    ) {
        this.pos = new Vec2(0, 0);
        this.traits = new Map();
    }

    update(delta: number) {
        this.sprite.update(delta);
        this.traits.forEach(trait => {
            trait.update(this, delta);
        })
    }

    addTrait(trait: Trait) {
        this.traits.set(trait.NAME, trait);
    }

    trait(traitName: string) {
        if (!this.traits.has(traitName)) {
            throw 'this trait doesn\'t exist'
        }
        return this.traits.get(traitName);
    }

    draw(context: CanvasRenderingContext2D) {
        this.sprite.draw(context, this.pos.x, this.pos.y);
    }
}