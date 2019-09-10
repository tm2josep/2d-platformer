import { Vec2 } from './MathTools';
import Sprite from './Sprite';
import Trait from './Traits/Trait';
import Camera from './Camera/Camera';
import { lenTwo } from './types';

export default class Entity {
    public pos = new Vec2(0, 0);
    public vel = new Vec2(0, 0);
    private traits: Map<string, Trait> = new Map();

    constructor(
        private sprite: Sprite,
        public size: Vec2
    ) { }

    update(delta: number) {
        this.traits.forEach(trait => {
            trait.update(this, delta, this.sprite);
            this.sprite.update(delta);
        });
    }

    addAnimation(name: string, images: lenTwo<HTMLCanvasElement[]>, loop: boolean) {
        this.sprite.defineAnimation(name, images, loop)
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

    draw(context: CanvasRenderingContext2D, camera: Camera) {
        this.sprite.draw(context, this.pos.x - camera.pos.x, this.pos.y - camera.pos.y);
    }
}