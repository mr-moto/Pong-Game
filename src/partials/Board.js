import { SVG_NS } from '../settings';

export default class Board {

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    render(svg) {
        let rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttributeNS(null, 'width', 512);
        rect.setAttributeNS(null, 'height', 256);
        rect.setAttributeNS(null, 'fill', '#454545');

        let line = document.createElementNS(SVG_NS, 'line');
        line.setAttributeNS(null, 'x1', (this.width / 2));
        line.setAttributeNS(null, 'y1', 0);
        line.setAttributeNS(null, 'x2', (this.width / 2));
        line.setAttributeNS(null, 'y2', (this.width));
        line.setAttributeNS(null, 'stroke', '#A9A9A9');
        line.setAttributeNS(null, 'stroke-dasharray', '20, 15');
        line.setAttributeNS(null, 'stroke-width', '4');

        svg.appendChild(rect);
        svg.appendChild(line);
    }
}