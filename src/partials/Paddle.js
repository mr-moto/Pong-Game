import { SVG_NS } from '../settings';

export default class Paddle {

    constructor(boardHeight, width, height, x, y, up, down, fill) {
        this.boardHeight = boardHeight;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speed = 30;
        this.score = 0;
        this.fill = fill;


        document.addEventListener('keydown', event => {
            switch (event.keyCode) {
                case up:
                    this.up();
                    break;
                case down:
                    this.down();
                    break;
            }
        });
    }

    up() {
        this.y = Math.max(0, this.y - this.speed);
    }

    down() {
        this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);
    }

    coordinates(x, y, width, height) {
        let leftX = x;
        let rightX = x + width;
        let topY = y;
        let bottomY = y + height;
        return [leftX, rightX, topY, bottomY];
    }




    render(svg) {
        let paddle = document.createElementNS(SVG_NS, 'rect');
        paddle.setAttributeNS(null, 'height', this.height);
        paddle.setAttributeNS(null, 'width', this.width);
        paddle.setAttributeNS(null, 'fill', this.fill);
        paddle.setAttributeNS(null, 'x', this.x);
        paddle.setAttributeNS(null, 'y', this.y);

        svg.appendChild(paddle);
    }


}