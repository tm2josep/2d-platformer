// imports
import { loadLevel, loadImages } from './loaders';

import Sprite from './Sprite';
import Entity from './Entity';
import Timer from './Timer';
import Keyboard from './KeyboardState';
import Velocity from './Traits/Velocity';
import Jump from './Traits/Jump';

import { GRAVITY } from './constants';
import { createCollisionLayer } from './loaderUtilities';
import { Vec2 } from './MathTools';

// Document Setup
const canvas = <HTMLCanvasElement>document.getElementById('screen');
const context = canvas.getContext('2d');

// Logic
const keyboard = new Keyboard();
const SPACE = 32;

Promise.all([
    loadLevel('1-1'),
    loadImages(
        './assets/Sprites/plain/frames/adventurer-idle-2-00.png',
        './assets/Sprites/plain/frames/adventurer-idle-2-01.png',
        './assets/Sprites/plain/frames/adventurer-idle-2-02.png'
    ),
    loadImages(
        './assets/Sprites/plain/frames/adventurer-jump-00.png',
        './assets/Sprites/plain/frames/adventurer-jump-01.png',
        './assets/Sprites/plain/frames/adventurer-jump-02.png'
    ),
    loadImages(
        './assets/Sprites/plain/frames/adventurer-fall-00.png',
        './assets/Sprites/plain/frames/adventurer-fall-01.png'
        
    )
]).then(([level, idleFrames, startJumpFrames, fallingFrames]) => {

    level.comp.addLayers(createCollisionLayer(level));

    let player = new Entity(
        new Sprite('idle', idleFrames),
        new Vec2(25, 30)
    );

    player.pos.set(50, 600);
    keyboard.attach(window);
    keyboard.addMapping(SPACE, (state: boolean) => {
        if (state) {
            player.trait('jump').start();
        } else {
            player.trait('jump').cancel();            
        }
    });

    player.addTrait(new Jump(keyboard));

    player.addAnimation('jump', startJumpFrames, false);
    player.addAnimation('falling', fallingFrames, true);

    level.comp.addLayers((context: CanvasRenderingContext2D) => player.draw(context));
    level.addEntity(player);

    player.addTrait(new Velocity());
    player.trait('velocity').vec.set(0, 0);


    const timer = new Timer(1 / 60, (delta: number) => {
        player.trait('velocity').vec.y += GRAVITY * delta;
        level.update(delta);
        level.comp.draw(context);
    });

    timer.start();
});