import { SVG_NS } from '../settings';

export default class Score {
    constructor(x, y, size, fill, player) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.fill = fill;
        this.player = player;
    }
    render(svg, gg) {
        let gameover = document.createElementNS(SVG_NS, 'text');
        gameover.setAttributeNS(null, 'x', this.x);
        gameover.setAttributeNS(null, 'y', this.y);
        gameover.setAttributeNS(null, 'font-family', 'Silkscreen Web');
        gameover.setAttributeNS(null, 'font-size', this.size);
        gameover.setAttributeNS(null, 'fill', this.fill);
        gameover.innerHTML = gg
        svg.appendChild(gameover);




    }
}