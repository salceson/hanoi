import React from 'react';
import PropTypes from 'prop-types';

import DetectTouchBackend from '../utils/detectTouchBackend';
import { sticksPropType } from '../utils';

import Stick from './stick';

import style from '../styles/gameBoard.css';

@DetectTouchBackend
class GameBoard extends React.Component {
  static propTypes = {
    sticks: sticksPropType.isRequired,
    blocksNum: PropTypes.number.isRequired,
    moves: PropTypes.number.isRequired,
    won: PropTypes.bool.isRequired,
    canMove: PropTypes.func.isRequired,
    move: PropTypes.func.isRequired,
  };

  renderWon() {
    const { won, moves, blocksNum } = this.props;
    if (!won) {
      return null;
    }
    const minMoves = (2 ** blocksNum) - 1;
    if (moves > minMoves) {
      return <div className={style.won}>Dobrze, ale za duża liczba ruchów!</div>;
    }
    return <div className={style.won}>Wygrana!</div>;
  }

  render() {
    const {
      blocksNum, sticks, canMove, move,
    } = this.props;
    return (
      <div className={style.gameBoard}>
        {this.renderWon()}
        <div className={style.sticks}>
          {sticks.map((stick, stickIdx) => (
            <Stick
              blocks={stick}
              blocksNum={blocksNum}
              key={`stick-${stickIdx}`}
              stickIdx={stickIdx}
              canMove={canMove}
              move={move}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default GameBoard;
