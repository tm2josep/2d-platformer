// imports
import Sprite from './Sprite';
import Entity from './Entity';
import Camera from './Camera/Camera';
import Timer from './Timer';
import Jump from './Traits/Jump';
import Go from './Traits/Go';

import { loadLevel } from './LoadingTools/loaders';
import { GRAVITY } from './constants';
import { Vec2 } from './MathTools';
import { SpriteLoader } from './LoadingTools/SpriteLoader';
import { setupKeyboard, setupDebugTool } from './Input/inputSetup';
import { createCollisionLayer } from './Collision/collisionLayer';
import { createCameraLayer } from './Camera/cameraLayer';
import { TileLayer } from './LoadingTools/TileLayer';

// Document Setup
const canvas = <HTMLCanvasElement>document.getElementById('screen');
const context = canvas.getContext('2d');

// Logic
const spriteSheet = new SpriteLoader('./assets/Sprites/plain/adventurer-v1.5-Sheet.png');

Promise.all([
    loadLevel('1-1'),
    spriteSheet.loadFromConfig("assets/Sprites/plain/adventurer-config.json")
]).then(([level, animations]) => {
    const camera = new Camera()
    let playerSprite = new Sprite('idle');
    animations.forEach((
        { name, images, loop, playbackModifier }
    ) => {
        playerSprite.defineAnimation(
            name,
            images,
            loop,
            playbackModifier
        );
    });

    let player = new Entity(
        playerSprite,
        new Vec2(25, 30)
    );

    player.pos.set(50, 600);
    setupKeyboard(player);
    setupDebugTool(canvas, player, camera);

    player.addTrait(new Jump());
    player.addTrait(new Go());

    level.addEntity(player);

    const tiles = new TileLayer(level, level.tileSet);
    camera.follow(player);
    level.comp.addLayers(
        (context: CanvasRenderingContext2D, camera: Camera) => {
            context.fillStyle = 'white';
            context.fillRect(0, 0, camera.size.x, camera.size.y)
        },
        createCameraLayer(camera),
        createCollisionLayer(level),
        player.draw.bind(player),
        tiles.layer
    )

    const timer = new Timer(1 / 60, (delta: number) => {
        player.vel.y += GRAVITY * delta;
        level.update(delta);
        // camera.follow(player);
        level.comp.draw(context, camera);
    });

    timer.start();
});