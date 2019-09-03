export default class Compositor {
    private layers: Function[];
    constructor() {
        this.layers = [];
    }

    addLayers(...layers: Function[]) {
        this.layers = [...this.layers, ...layers];
    }

    draw(context: CanvasRenderingContext2D) {
        this.layers.forEach(layer => layer(context));
    }
}