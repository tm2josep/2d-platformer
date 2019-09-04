export default class KeyboardState {
    public readonly keyStates: Map<number, boolean>;
    private keyMap: Map<number, Function>;

    constructor() {
        this.keyStates = new Map();
        this.keyMap = new Map();
    }

    addMapping(keycode: number, cb: Function) {
        this.keyMap.set(keycode, cb);
    }

    private handle(event: KeyboardEvent): void {
        event.preventDefault();
        const { keyCode: code } = event;

        if (!this.keyMap.has(code)) {
            return;
        }

        const keyState = event.type == 'keydown';

        if (this.keyStates.get(code) === keyState) {
            return;
        }

        this.keyStates.set(code, keyState);
        this.keyMap.get(code)(keyState);
    }

    attach(el: any) {
        ['keydown', 'keyup'].forEach(key => {
            el.addEventListener(key, this.handle.bind(this));
        })
    }
}