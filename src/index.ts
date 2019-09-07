// imports
import { loadLevel } from './LoadingTools/loaders';

import Sprite from './Sprite';
import Entity from './Entity';
import Timer from './Timer';
import Jump from './Traits/Jump';

import { GRAVITY, RIGHT, LEFT, UP } from './constants';
import { createCollisionLayer } from './LoadingTools/loaderUtilities';
import { Vec2 } from './MathTools';
import Go from './Traits/Go';
import { SpriteLoader } from './LoadingTools/SpriteLoader';
import { setupKeyboard } from './Input/inputSetup';

// Document Setup
const canvas = <HTMLCanvasElement>document.getElementById('screen');
const context = canvas.getContext('2d');

// Logic
const spriteSheet = new SpriteLoader('./assets/Sprites/plain/adventurer-v1.5-Sheet.png');

Promise.all([
    loadLevel('1-1'),
    spriteSheet.getFrames([
        {x: 0, y: 7, w: 50, h: 37},
        {x: 50, y: 7, w: 50, h: 37},
        {x: 100, y: 7, w: 50, h: 37},
        {x: 150, y: 7, w: 50, h: 37},    
    ])
]).then(([level, idleFrames]) => {

    level.comp.addLayers(createCollisionLayer(level));

    let player = new Entity(
        new Sprite('idle', idleFrames),
        new Vec2(25, 30)
    );

    player.pos.set(50, 600);
    setupKeyboard(player);

    player.addTrait(new Jump());
    player.addTrait(new Go());

    level.comp.addLayers((context: CanvasRenderingContext2D) => player.draw(context));
    level.addEntity(player);

    const timer = new Timer(1 / 60, (delta: number) => {
        player.vel.y += GRAVITY * delta;
        level.update(delta);
        level.comp.draw(context);
    });

    timer.start();
});