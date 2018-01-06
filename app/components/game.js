import React from 'react';

import { defaultBlocksNum } from '../config';
import { generateDefaultStick, moveBlock } from '../utils';

import GameBoard from './gameBoard';
import SettingsAndMovesDisplay from './settingsAndMovesDisplay';

import style from '../styles/game.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      blocksNum: defaultBlocksNum,
      sticks: [generateDefaultStick(defaultBlocksNum), [], []],
      won: false,
      moves: 0,
    };
    this.changeBlocksNum = this.changeBlocksNum.bind(this);
    this.reset = this.reset.bind(this);
    this.canMove = this.canMove.bind(this);
    this.move = this.move.bind(this);
  }

  changeBlocksNum(blocksNum) {
    this.setState({
      blocksNum,
      sticks: [generateDefaultStick(blocksNum), [], []],
      won: false,
      moves: 0,
    });
  }

  reset() {
    this.setState({
      sticks: [generateDefaultStick(this.state.blocksNum), [], []],
      won: false,
      moves: 0,
    });
  }

  canMove(block, toStickIdx) {
    const stick = this.state.sticks[toStickIdx];
    return stick.length === 0 || block < stick[stick.length - 1];
  }

  move(fromStickIdx, toStickIdx) {
    if (fromStickIdx === toStickIdx) {
      return;
    }
    const newSticks = moveBlock(this.state.sticks, fromStickIdx, toStickIdx);
    this.setState({
      sticks: newSticks,
      won: newSticks[2].length === this.state.blocksNum,
      moves: this.state.moves + 1,
    });
  }

  render() {
    const { blocksNum, sticks, moves } = this.state;
    return (
      <div className={style.game}>
        <div className={style.title}>Wieże Hanoi</div>
        <div className={style.info}>
          <p>Przenieś wszystkie krążki z lewego słupka na prawy.</p>
          <p>Możesz upuścić tylko mniejszy klocek na większy lub dowolny klocek na pusty słupek.</p>
        </div>
        <SettingsAndMovesDisplay
          onChangeBlocksNum={this.changeBlocksNum}
          onReset={this.reset}
          blocksNum={blocksNum}
          moves={moves}
          won={this.state.won}
        />
        <GameBoard
          blocksNum={blocksNum}
          sticks={sticks}
          won={this.state.won}
          canMove={this.canMove}
          move={this.move}
        />
      </div>
    );
  }
}

export default Game;
