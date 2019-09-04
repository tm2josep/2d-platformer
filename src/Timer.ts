export default class Timer {
    private lastTime = 0;
    private accumulatedTime = 0;

    constructor(
        private deltaTime = 1/60,
        private update: Function
    ) {}

    updateHandler(time = 0) {
        if (time > 5000) {return;} //TODO: REMOVE WHEN TIME TO RUN IN PROD
        this.accumulatedTime += (time - this.lastTime) / 1000;

        while (this.accumulatedTime > this.deltaTime) {
            this.update(this.deltaTime);
            this.accumulatedTime -= this.deltaTime;
        }
        this.lastTime = time;
        requestAnimationFrame(this.updateHandler.bind(this));

    }

    start() {
        requestAnimationFrame(this.updateHandler.bind(this));
    }


}