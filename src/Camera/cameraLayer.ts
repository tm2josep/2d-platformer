import Camera from './Camera';
export function createCameraLayer(camToDraw: Camera) {
    return (context: CanvasRenderingContext2D, fromCam: Camera) => {
        debugger;
        context.strokeStyle = 'purple';
        context.beginPath();
        context.rect(
            camToDraw.pos.x - fromCam.pos.x,
            camToDraw.pos.y - fromCam.pos.y,
            camToDraw.size.x,
            camToDraw.size.y,
        )
        context.stroke();
    }
}