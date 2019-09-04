// imports
import { loadLevel, loadAnimation } from './loaders';

import Sprite from './Sprite';
import Entity from './Entity';
import Timer from './Timer';
import Keyboard from './KeyboardState';
import Velocity from './Traits/Velocity';
import Jump from './Traits/Jump';

import { GRAVITY } from './constants';

// Document Setup
const canvas = <HTMLCanvasElement>document.getElementById('screen');
const context = canvas.getContext('2d');

// Logic
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
    keyboard.addMapping(SPACE, (state: boolean) => {
        if (state) {
            player.trait('jump').start();
        } else {
            player.trait('jump').cancel();
        }
    })

    player.addTrait(new Velocity());
    player.trait('velocity').vec.set(0, 0);
    player.addTrait(new Jump(keyboard));

    level.comp.addLayers((context: CanvasRenderingContext2D) => player.draw(context));

    const timer = new Timer(1 / 60, (delta: number) => {
        player.update(delta);
        player.trait('velocity').vec.y += GRAVITY * delta;
        level.comp.draw(context);
    });

    timer.start();
});