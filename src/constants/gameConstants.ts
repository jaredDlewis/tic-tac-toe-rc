import type { BoardContent } from "../types";

export const INITIAL_CURR_PLAYER = 'X';

export const INITIAL_WINNER = null;

export const INITIAL_BOARD_CONTENT: BoardContent = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

export const WINNING_CONDITIONS = [
  [
    ['X', 'X', 'X'],
    ['', '', ''],
    ['', '', ''],
  ],
  [
    ['', '', ''],
    ['X', 'X', 'X'],
    ['', '', ''],
  ],
  [
    ['', '', ''],
    ['', '', ''],
    ['X', 'X', 'X'],
  ],
  [
    ['X', '', ''],
    ['X', '', ''],
    ['X', '', ''],
  ],
  [
    ['', 'X', ''],
    ['', 'X', ''],
    ['', 'X', ''],
  ],
  [
    ['', '', 'X'],
    ['', '', 'X'],
    ['', '', 'X'],
  ],
  [
    ['X', '', ''],
    ['', 'X', ''],
    ['', '', 'X'],
  ],
  [
    ['', '', 'X'],
    ['', 'X', ''],
    ['X', '', ''],
  ],
];