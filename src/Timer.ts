export default class Timer {
    private lastTime = 0;
    private accumulatedTime = 0;

    constructor(
        private deltaTime = 1/60,
        private update: Function
    ) {}

    updateHandler(time = 0) {
        this.accumulatedTime += (time - this.lastTime) / 1000;

        // dev-only:
        if (this.accumulatedTime > 1) {
            this.accumulatedTime = 1;
        }

        while (this.accumulatedTime > this.deltaTime) {
            this.update(this.deltaTime);
            this.accumulatedTime -= this.deltaTime;
        }
        this.lastTime = time;
        this.enqueue();
    }

    enqueue() {
        requestAnimationFrame(this.updateHandler.bind(this));        
    }

    start() {
        this.enqueue();
    }

}

 