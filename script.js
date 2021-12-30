'use strict';

import Board from './classes/board.js';
import Player from './classes/player.js';
import { hasClass, addClass } from './helpers.js';

//Starts a new game with a certain depth and a startingPlayer of 1 if human is going to start
function newGame(depth = -1, startingPlayer = 1) {
  // Instantiating a new player and an empty board
  const player = new Player(parseInt(depth));
  const board = new Board(['', '', '', '', '', '', '', '', '']);

  // Clearing all #Board classes and populating cells HTML
  const boardDiv = document.querySelector('#board');
  boardDiv.className = 'w-full pt-[100%] relative mb-8'; // w-full pt-40 relative mb-8

  boardDiv.innerHTML = `<div id='cells-wrap' class='absolute top-0 left-0 w-full h-full flex flex-wrap'>
  <button class='cell-0 h-[33%] w-[33%] border border-gray-300 border-solid bg-indigo-600 text-stone-200 text-[calc(18px+3vw)] font-sans'></button>
  <button class='cell-1 h-[33%] w-[33%] border border-gray-300 border-solid bg-indigo-600 text-stone-200 text-[calc(18px+3vw)] font-sans'></button>
  <button class='cell-2 h-[33%] w-[33%] border border-gray-300 border-solid bg-indigo-600 text-stone-200 text-[calc(18px+3vw)] font-sans'></button>
  <button class='cell-3 h-[33%] w-[33%] border border-gray-300 border-solid bg-indigo-600 text-stone-200 text-[calc(18px+3vw)] font-sans'></button>
  <button class='cell-4 h-[33%] w-[33%] border border-gray-300 border-solid bg-indigo-600 text-stone-200 text-[calc(18px+3vw)] font-sans'></button>
  <button class='cell-5 h-[33%] w-[33%] border border-gray-300 border-solid bg-indigo-600 text-stone-200 text-[calc(18px+3vw)] font-sans'></button>
  <button class='cell-6 h-[33%] w-[33%] border border-gray-300 border-solid bg-indigo-600 text-stone-200 text-[calc(18px+3vw)] font-sans'></button>
  <button class='cell-7 h-[33%] w-[33%] border border-gray-300 border-solid bg-indigo-600 text-stone-200 text-[calc(18px+3vw)] font-sans'></button>
  <button class='cell-8 h-[33%] w-[33%] border border-gray-300 border-solid bg-indigo-600 text-stone-200 text-[calc(18px+3vw)] font-sans'></button>
</div>`;

  // Storing HTML cells in an array
  const htmlCells = [...boardDiv.querySelector('#cells-wrap').children];
  // Initializing some variables for internal use
  const starting = parseInt(startingPlayer),
    maximizing = starting;
  let playerTurn = starting;

  //If computer is going to start, choose a random cell as long as it is the center or a corner
  if (!starting) {
    const centerAndCorners = [0, 2, 4, 6, 8];
    const firstChoice =
      centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];
    const symbol = !maximizing ? 'x' : 'o';
    board.insert(symbol, firstChoice);
    addClass(htmlCells[firstChoice], symbol);
    playerTurn = 1; // switch turns
  }

  //Adding Click event listener for each cell
  board.boardDefaultState.forEach((cell, index) => {
    let gameStatus = document.querySelector('#game-title');
    htmlCells[index].addEventListener(
      'click',
      () => {
        //If cell is already occupied or the board is in a terminal state or it's not humans turn, return false
        if (
          hasClass(htmlCells[index], 'x') ||
          hasClass(htmlCells[index], 'o') ||
          board.isTerminal() ||
          !playerTurn
        )
          return false;
        const symbol = maximizing ? 'x' : 'o'; //Maximizing player is always 'x'
        //Update the Board class instance as well as the Board UI
        board.insert(symbol, index);
        addClass(htmlCells[index], symbol);
        //If it's a terminal move and it's not a draw, then human won
        if (board.isFull() && board.isTerminal()) {
          gameStatus.innerText = 'Tie!';
        } else if (board.isTerminal()) {
          // drawWinningLine(board.isTerminal());
          setTimeout(() => {
            gameStatus.innerText = 'You won!';
          }, 50);
        }
        playerTurn = 0; // Switch turn
        // Get computer's best move and update the UI
        player.getBestMove(board, !maximizing, bestMove => {
          const symbol = !maximizing ? 'x' : 'o';
          board.insert(symbol, parseInt(bestMove));
          addClass(htmlCells[bestMove], symbol);
          if (board.isTerminal()) {
            setTimeout(() => {
              gameStatus.innerText = 'The computer won!';
            }, 50);
          }
          playerTurn = 1; //switch turns
        });
      },
      false
    );
    if (cell) addClass(htmlCells[index], cell);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  //Start a new game when page loads with default values
  let gameStatus = document.querySelector('#game-title');
  const depth = -1;
  const startingPlayer = 1;
  newGame(depth, startingPlayer);
  //Start a new game with chosen options when new game button is clicked
  document.querySelector('#newGame').addEventListener('click', () => {
    const startingDiv = document.querySelector('#starting');
    const starting = startingDiv.options[startingDiv.selectedIndex].value;
    const depthDiv = document.querySelector('#depth');
    const depth = depthDiv.options[depthDiv.selectedIndex].value;
    newGame(depth, starting);
    gameStatus.innerText = 'Tic-tac-toe';
  });
});
