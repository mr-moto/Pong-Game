import { SVG_NS, KEYS } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import Gameover from './Gameover';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;

		this.boardGap = 10;

		this.paddleWidth = 4;
		this.paddleHeight = 56;

		this.radius = 8;

		this.gameElement = document.getElementById(this.element);

		this.pause = false;

		this.board = new Board(this.width, this.height);

		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			((this.height - this.paddleHeight) / 2),
			KEYS.k,
			KEYS.m,
			this.fill = '#ff00ff'
		);

		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			((this.height - this.paddleHeight) / 2),
			KEYS.a,
			KEYS.z,
			this.fill = '#32cd32'
		);
		this.ball = new Ball(
			this.radius,
			this.width,
			this.height,
		);
		this.ball2 = new Ball(
			this.radius,
			this.width,
			this.height,
		)


		this.score1 = new Score((this.width / 2) + 15, 40, 20, this.fill = '#ff00ff');
		this.score2 = new Score((this.width / 2) - 70, 40, 20, this.fill = '#32cd32');

		this.winp1 = new Gameover((this.width * .10), 40, 20, this.fill = '#32cd32');
		this.winp2 = new Gameover((this.width * 0.75), 40, 20, this.fill = '#ff00ff');
		this.win = new Gameover((this.width / 2)-50, (this.height / 2), 20, this.fill = '#FF0');
		this.restart = new Gameover((this.width / 2)-170, (this.height * 0.75), 20, this.fill = '#FF0');


		this.newball = false;
		document.addEventListener('keydown', event => {
			switch (event.keyCode) {
				case KEYS.spaceBar:
					this.pause = !this.pause;
					break;
				case KEYS.n:
					this.newball = true;
					break;
			}
		});

	}

	render() {

		if (this.pause) {
			return;
		}
		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewbox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);
		

		this.board.render(svg);

		this.player1.render(svg);
		this.player2.render(svg);

		this.score1.render(svg, `${this.player1.score} :P1`);
		this.score2.render(svg, `P2: ${this.player2.score}`);


		this.ball.render(svg, this.player1, this.player2);
		
		if (this.newball) {
			this.ball2.render(svg, this.player1, this.player2);
		}

		if (this.player1.score === 2) {
			this.winp1.render(svg, 'loser');
			this.winp2.render(svg, 'winner');
			this.win.render(svg, 'p1 wins');
			this.restart.render(svg, 'press enter to play again');
			this.pause = true;
			document.addEventListener('keydown', event => {
				switch (event.keyCode) {
					case KEYS.enter:
						this.player1.score = 0;
						this.player2.score = 0;
						this.newball = false;
						this.pause = false;

				}
			});
		}
		if (this.player2.score === 2) {
			this.winp2.render(svg, 'loser');
			this.winp1.render(svg, 'winner');
			this.win.render(svg, 'p2 wins');
			this.restart.render(svg, 'press enter to play again');
			this.pause = true;
			document.addEventListener('keydown', event => {
				switch (event.keyCode) {
					case KEYS.enter:
						this.player1.score= 0;
						this.player2.score = 0;
						this.newball = false;
						this.pause = false;
				}
			});
		}
	}

}
