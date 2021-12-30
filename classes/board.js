'use strict';

class Board {
  constructor(boardDefaultState = ['', '', '', '', '', '', '', '', '']) {
    this.boardDefaultState = boardDefaultState;
  }

  isEmpty() {
    return this.boardDefaultState.every(cell => !cell);
  }

  isFull() {
    return this.boardDefaultState.every(cell => cell);
  }

  isTerminal() {
    // Return False if board is empty
    if (this.isEmpty()) return false;

    // Checking Horizontal wins
    if (
      this.boardDefaultState[0] === this.boardDefaultState[1] &&
      this.boardDefaultState[0] === this.boardDefaultState[2] &&
      this.boardDefaultState[0]
    ) {
      return { winner: this.boardDefaultState[0], direction: 'L', row: 1 }; // L refers to 'line'
    }

    if (
      this.boardDefaultState[3] === this.boardDefaultState[4] &&
      this.boardDefaultState[3] === this.boardDefaultState[5] &&
      this.boardDefaultState[3]
    ) {
      return { winner: this.boardDefaultState[3], direction: 'L', row: 2 };
    }

    if (
      this.boardDefaultState[6] === this.boardDefaultState[7] &&
      this.boardDefaultState[6] === this.boardDefaultState[8] &&
      this.boardDefaultState[6]
    ) {
      return { winner: this.boardDefaultState[6], direction: 'L', row: 3 };
    }

    //    Checking for Vertical wins
    if (
      this.boardDefaultState[0] === this.boardDefaultState[3] &&
      this.boardDefaultState[0] === this.boardDefaultState[6] &&
      this.boardDefaultState[0]
    ) {
      return {
        winner: this.boardDefaultState[0],
        direction: 'V',
        column: 1,
      };
    }

    if (
      this.boardDefaultState[1] === this.boardDefaultState[4] &&
      this.boardDefaultState[1] === this.boardDefaultState[7] &&
      this.boardDefaultState[1]
    ) {
      return {
        winner: this.boardDefaultState[1],
        direction: 'V',
        column: 2,
      };
    }

    if (
      this.boardDefaultState[2] === this.boardDefaultState[5] &&
      this.boardDefaultState[2] === this.boardDefaultState[8] &&
      this.boardDefaultState[2]
    ) {
      return {
        winner: this.boardDefaultState[2],
        direction: 'V',
        column: 3,
      };
    }

    // Check for Diagonal wins
    if (
      this.boardDefaultState[0] === this.boardDefaultState[4] &&
      this.boardDefaultState[0] === this.boardDefaultState[8] &&
      this.boardDefaultState[0]
    ) {
      return {
        winner: this.boardDefaultState[0],
        direction: 'D',
        diagonal: 'main',
      };
    }

    if (
      this.boardDefaultState[2] === this.boardDefaultState[4] &&
      this.boardDefaultState[2] === this.boardDefaultState[6] &&
      this.boardDefaultState[2]
    ) {
      return {
        winner: this.boardDefaultState[2],
        direction: 'D',
        diagonal: 'counter',
      };
    }

    // If no winner but the board is isFull(), then it's a draw
    if (this.isFull()) {
      return { winner: 'draw' };
    }

    // return false otherwise
    return false;
  }

  insert(symbol, position) {
    if (![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(position)) {
      throw new Error('Cell index does not exist!');
    }
    if (!['x', 'o'].includes(symbol)) {
      throw new Error('The symbol can only be "x" or "o"!');
    }
    if (this.boardDefaultState[position]) {
      return false;
    }
    this.boardDefaultState[position] = symbol;
    return true;
  }

  getPossibleMoves() {
    const moves = [];
    this.boardDefaultState.forEach((cell, index) => {
      if (!cell) moves.push(index);
    });
    return moves;
  }
}
export default Board;
