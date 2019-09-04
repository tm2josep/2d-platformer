// imports
import { loadImage, loadLevel, loadAnimation } from './loaders';
import { makeFixedLayer, drawTilesFromJson } from './canvasUtils';

import TileSet from './TileSet';
import Sprite from './Sprite';
import Compositor from './Compositor';
import Entity from './Entity';
import Timer from './Timer';
import Keyboard from './KeyboardState';
import Velocity from './Traits/Velocity';
import { TILESIZE, WIDTH, HEIGHT, GRAVITY } from './constants';

// Document Setup
const canvas = <HTMLCanvasElement>document.getElementById('screen');
const context = canvas.getContext('2d');

// Logic
const comp = new Compositor();
const keyboard = new Keyboard();
const SPACE = 32;

Promise.all([
    loadLevel('1-1'),
    loadAnimation('idle-2', 4)
]).then(([level, spriteFrames]) => {
    let player = new Entity(
        new Sprite('idle', spriteFrames)
    );

    player.pos.set(50, 600);
    keyboard.attach(window);
    keyboard.addMapping(SPACE, () => {
        console.log('jump');
    })

    player.addTrait(new Velocity());
    player.trait('velocity').vec.set(200, -600);

    level.comp.addLayers((context: CanvasRenderingContext2D) => player.draw(context));

    const timer = new Timer(1 / 60, (delta: number) => {
        player.update(delta);
        let playerVel: Velocity = player.trait('velocity');
        playerVel.vec.y += GRAVITY * delta;
        level.comp.draw(context);
    });

    timer.start();
});