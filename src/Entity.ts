import { Vec2 } from './MathTools';
import Sprite from './Sprite';
import Trait from './Traits/Trait';
import Camera from './Camera/Camera';

export default class Entity {
    public pos = new Vec2(0, 0);
    public vel = new Vec2(0, 0);
    private traits: Map<string, any> = new Map();

    constructor(
        private sprite: Sprite,
        public size: Vec2
    ) {}

    update(delta: number) {
        this.sprite.update(delta);
        this.traits.forEach(trait => {
            trait.update(this, delta);
        })
    }

    addAnimation(name: string, images: HTMLCanvasElement[], loop: boolean) {
        this.sprite.defineAnimation(name, images, loop)
    }

    addTrait(trait: Trait) {
        this.traits.set(trait.NAME, trait);
    }

    setAnim(name: string) {
        // this.sprite.state = name;
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