import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  squares: any[];
  gameover: boolean;
  gameoverMessage: string;
  currentPlayer: string;
  remainingSquares: number;

  constructor() { }

  ngOnInit() {
    this.resetGame();
  }

  resetGame() {
    this.squares = ['', '', '', '', '', '', '', '', ''];
    this.gameover = false;
    this.gameoverMessage = '';
    this.currentPlayer = 'Player';
    this.remainingSquares = 9;
  }

  onPlayerAction(index: number) {
    if (this.squares[index] !== '') {
      return
    } else {
      this.currentPlayer = 'Player'
      this.squares[index] = "X";
      this.remainingSquares -= 1;
      this.checkGameover();
      if (!this.gameover) {
        this.computerTurn();
      }
    }
  }

  computerTurn() {
    this.currentPlayer = 'Computer'
    const remainingMoves = this.squares.map((square, index) => {
      if (square !== 'X' && square !== 'O') {
        return index;
      }
    }).filter(square => square !== undefined);
    const computerMoveIndex = Math.floor(Math.random() * (remainingMoves.length - 1))
    const computerMove = remainingMoves[computerMoveIndex]
    this.squares[computerMove] = 'O';
    this.remainingSquares -= 1;
    this.checkGameover();
  }

  checkGameover() {
    if (
      this.squares[0] === this.squares[1] && this.squares[0] === this.squares[2] && this.squares[0] !== '' ||
      this.squares[3] === this.squares[4] && this.squares[3] === this.squares[5] && this.squares[3] !== '' ||
      this.squares[6] === this.squares[7] && this.squares[6] === this.squares[8] && this.squares[6] !== '' ||
      this.squares[0] === this.squares[3] && this.squares[0] === this.squares[6] && this.squares[0] !== '' ||
      this.squares[1] === this.squares[4] && this.squares[1] === this.squares[7] && this.squares[1] !== '' ||
      this.squares[2] === this.squares[5] && this.squares[2] === this.squares[8] && this.squares[2] !== '' ||
      this.squares[0] === this.squares[4] && this.squares[0] === this.squares[8] && this.squares[0] !== '' ||
      this.squares[2] === this.squares[4] && this.squares[2] === this.squares[6] && this.squares[2] !== ''
    ) {
      this.gameoverMessage = this.currentPlayer + ' wins!';
      this.gameover = true;
    } else if (this.remainingSquares === 0) {
      this.gameoverMessage = 'It\'s a Draw!';
      this.gameover = true;
    }
  }
}
