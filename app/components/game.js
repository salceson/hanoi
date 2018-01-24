import React from 'react';

import { defaultBlocksNum } from '../config';
import { generateDefaultStick, moveBlock } from '../utils';

import GameBoard from './gameBoard';
import GameControlPanel from './gameControlPanel';

import style from '../styles/game.css';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      blocksNum: defaultBlocksNum,
      sticks: [generateDefaultStick(defaultBlocksNum), [], []],
      won: false,
      isTimerGoing: false,
      moves: 0,
      time: 0,
      interval: null,
    };
    this.changeBlocksNum = this.changeBlocksNum.bind(this);
    this.reset = this.reset.bind(this);
    this.canMove = this.canMove.bind(this);
    this.move = this.move.bind(this);
    this.updateTime = this.updateTime.bind(this);
  }

  componentWillMount() {
    this.setState({
      interval: setInterval(this.updateTime, 1000),
    });
  }

  componentWillUnmount() {
    const { interval } = this.state;
    clearInterval(interval);
    this.setState({ interval: null });
  }

  changeBlocksNum(blocksNum) {
    this.setState({
      blocksNum,
      sticks: [generateDefaultStick(blocksNum), [], []],
      won: false,
      moves: 0,
      isTimerGoing: false,
      time: 0,
    });
  }

  reset() {
    this.setState({
      sticks: [generateDefaultStick(this.state.blocksNum), [], []],
      won: false,
      moves: 0,
      isTimerGoing: false,
      time: 0,
    });
  }

  updateTime() {
    const { isTimerGoing, time } = this.state;
    if (isTimerGoing) {
      this.setState({ time: time + 1 });
    }
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

    const won = newSticks[2].length === this.state.blocksNum;
    this.setState({
      isTimerGoing: !won,
      sticks: newSticks,
      won,
      moves: this.state.moves + 1,
    });
  }

  render() {
    const {
      blocksNum, sticks, moves, time,
    } = this.state;
    return (
      <div className={style.game}>
        <div className={style.title}>Wieże Hanoi</div>
        <div className={style.info}>
          <p>Przenieś wszystkie krążki z lewego słupka na prawy.</p>
          <p>Możesz upuścić tylko mniejszy klocek na większy lub dowolny klocek na pusty słupek.</p>
        </div>
        <GameControlPanel
          onChangeBlocksNum={this.changeBlocksNum}
          onReset={this.reset}
          blocksNum={blocksNum}
          moves={moves}
          won={this.state.won}
          time={time}
        />
        <GameBoard
          blocksNum={blocksNum}
          sticks={sticks}
          moves={moves}
          won={this.state.won}
          canMove={this.canMove}
          move={this.move}
        />
      </div>
    );
  }
}

export default Game;
