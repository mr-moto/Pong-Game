import { SVG_NS } from '../settings';


export default class Ball {
    constructor(radius, boardWidth, boardHeight) {
        this.radius = radius;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.direction = 1;

        this.ping = new Audio('public/sounds/pong-01.wav');
        this.reset();
    }

    wallCollision() {
        const hitTop = this.y - this.radius <= 0;
        const hitBottom = this.y + this.radius >= this.boardHeight;

        if (hitTop || hitBottom) {
            this.vy = -this.vy;
        }
    }
    leftPaddleCollisionOccured(paddle) {
        let [leftX, rightX, topY, bottomY] = paddle;
        return this.x + this.radius >= leftX &&
            this.x + this.radius <= rightX &&
            this.y >= topY &&
            this.y <= bottomY
    }
    rightPaddleCollisionOccured(paddle) {
        let [leftX, rightX, topY, bottomY] = paddle;
        return this.x - this.radius >= leftX &&
            this.x - this.radius <= rightX &&
            this.y >= topY &&
            this.y <= bottomY
    }

    paddleCollision(player1, player2) {
        if (this.vx > 0) {
            let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);

            if (this.leftPaddleCollisionOccured(paddle)) {
                this.vx = -this.vx;
                this.fill = '#ff00ff';
                this.ping.play();
            }
        } else {
            let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);


            if (this.rightPaddleCollisionOccured(paddle)) {
                this.vx = -this.vx;
                this.fill = '#32cd32';
                this.ping.play();
            }
        }
    }

    reset() {
        this.x = this.boardWidth / 2;
        this.y = this.boardHeight / 2;
        this.vy = 0
        this.fill = '#ffffff'

        while (this.vy === 0) {
            this.vy = Math.floor(Math.random() * 10 - 5);
        }

        this.vx = this.direction * (6 - Math.abs(this.vy));
    }

    goal(player) {
        player.score++;
        this.reset();
    }

    render(svg, player1, player2) {
        this.x += this.vx;
        this.y += this.vy;

        this.wallCollision();
        this.paddleCollision(player1, player2)

        let ball = document.createElementNS(SVG_NS, 'circle');
        ball.setAttributeNS(null, 'r', this.radius);
        ball.setAttributeNS(null, 'cx', this.x);
        ball.setAttributeNS(null, 'cy', this.y);
        ball.setAttributeNS(null, 'fill', this.fill);
        svg.appendChild(ball);

        const rightGoal = this.x + this.radius >= this.boardWidth;
        const leftGoal = this.x - this.radius <= 0;
        if (rightGoal) {
            this.goal(player2);
            this.direction = 1;
        } else if (leftGoal) {
            this.goal(player1);
            this.direction = -1;
        }
    }
}