import { UP, LEFT, RIGHT } from '../constants';
import KeyboardState from './KeyboardState';
import Entity from '../Entity';
import Go from '../Traits/Go';
import Camera from '../Camera/Camera';
export function setupKeyboard(player: Entity) {
    const keyboard = new KeyboardState();
    keyboard.attach(window);
    keyboard.addMapping(UP, (state: boolean) => {
        if (state) {
            player.trait('jump').start();
        } else {
            player.trait('jump').cancel();
        }
    });

    keyboard.addMapping(RIGHT, (state: boolean) => {
        let trait: Go = player.trait('go');
        trait.direction = state ? 1 : 0;
    });

    keyboard.addMapping(LEFT, (state: boolean) => {
        let trait: Go = player.trait('go');
        trait.direction = state ? -1 : 0;
    })
}

export function setupDebugTool(canvas: HTMLCanvasElement, entity: Entity, camera: Camera) {
    let lastEvent: MouseEvent;
    ['mousedown', 'mousemove'].forEach((eventName) => {
        canvas.addEventListener(eventName, (event: MouseEvent) => {
            if (event.buttons === 1) {
                entity.vel.set(0, 0);
                entity.pos.set(
                    event.offsetX + camera.pos.x,
                    event.offsetY + camera.pos.y
                )
            } else if (
                event.buttons === 2
                && lastEvent
                && lastEvent.buttons === 2
                && lastEvent.type === 'mousemove'
            ) {
                camera.pos.x -= event.offsetX - lastEvent.offsetX;
                camera.pos.y -= event.offsetY - lastEvent.offsetY;
            }

            lastEvent = event;
        })
    });


    canvas.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    })
}