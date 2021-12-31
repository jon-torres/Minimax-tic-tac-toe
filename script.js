'use strict';

import Board from './classes/board.js';
import Player from './classes/player.js';
import { hasClass, addClass } from './helpers.js';

function newGame(depth = -1, startingPlayer = 1) {
  const player = new Player(parseInt(depth));
  const gameBoard = new Board(['', '', '', '', '', '', '', '', '']);

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

  const htmlCells = [...boardDiv.querySelector('#cells-wrap').children];

  const starting = parseInt(startingPlayer),
    maximizing = starting;
  let playerTurn = starting;

  if (!starting) {
    const centerAndCorners = [0, 2, 4, 6, 8];
    const firstChoice =
      centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];
    const symbol = !maximizing ? 'x' : 'o';
    gameBoard.insert(symbol, firstChoice);
    addClass(htmlCells[firstChoice], symbol);
    playerTurn = 1;
  }

  //Adding Click event listener for each cell
  gameBoard.boardDefaultState.forEach((cell, index) => {
    let gameStatus = document.querySelector('#game-title');
    htmlCells[index].addEventListener(
      'click',
      () => {
        if (
          hasClass(htmlCells[index], 'x') ||
          hasClass(htmlCells[index], 'o') ||
          gameBoard.isTerminal() ||
          !playerTurn
        )
          return false;
        const symbol = maximizing ? 'x' : 'o';
        gameBoard.insert(symbol, index);
        addClass(htmlCells[index], symbol);

        if (gameBoard.isFull() && gameBoard.isTerminal()) {
          gameStatus.innerText = 'Tie!';
        } else if (gameBoard.isTerminal()) {
          setTimeout(() => {
            gameStatus.innerText = 'You won!';
          }, 50);
        }
        playerTurn = 0;
        player.getBestMove(gameBoard, !maximizing, bestMove => {
          const symbol = !maximizing ? 'x' : 'o';
          gameBoard.insert(symbol, parseInt(bestMove));
          addClass(htmlCells[bestMove], symbol);

          if (gameBoard.isFull() && gameBoard.isTerminal()) {
            gameStatus.innerText = 'Tie!';
          } else if (gameBoard.isTerminal()) {
            setTimeout(() => {
              gameStatus.innerText = 'You lost!';
            }, 50);
          }
          playerTurn = 1;
        });
      },
      false
    );
    if (cell) addClass(htmlCells[index], cell);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let gameStatus = document.querySelector('#game-title');
  const depth = -1;
  const startingPlayer = 1;
  newGame(depth, startingPlayer);

  document.querySelector('#newGame').addEventListener('click', () => {
    const startingDiv = document.querySelector('#starting');
    const starting = startingDiv.options[startingDiv.selectedIndex].value;
    const depthDiv = document.querySelector('#depth');
    const depth = depthDiv.options[depthDiv.selectedIndex].value;
    newGame(depth, starting);
    gameStatus.innerText = 'Tic-tac-toe';
  });
});
