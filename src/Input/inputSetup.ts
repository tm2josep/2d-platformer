import { UP, LEFT, RIGHT } from '../constants';
import KeyboardState from './KeyboardState';
import Entity from '../Entity';
import Go from '../Traits/Go';
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