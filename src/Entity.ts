import Vec2 from './MathTools';
import Sprite from './Sprite';
import Trait from './Traits/Trait';

export default class Entity {
    public pos: Vec2;
    private traits: Map<string, any>;

    constructor(private sprite: Sprite) {
        this.pos = new Vec2(0, 0);
        this.traits = new Map();
    }

    update(delta: number) {
        this.traits.forEach(trait => {
            trait.update(this, delta);
        })
    }

    addTrait(trait: Trait) {
        this.traits.set(trait.NAME, trait);
    }

    trait(traitName: string) {
        if (!this.traits.has(traitName)) {
            console.log(
                `${traitName} trait does not exist on:`,
                this
            );
        }
        return this.traits.get(traitName);
    }

    draw(context: CanvasRenderingContext2D) {
        this.sprite.draw(context, this.pos.x, this.pos.y);
    }
}