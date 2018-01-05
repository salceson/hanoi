import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { sticksPropType } from '../utils';

import Stick from './stick';

import style from '../styles/gameBoard.css';

@DragDropContext(HTML5Backend)
class GameBoard extends React.Component {
  static propTypes = {
    sticks: sticksPropType.isRequired,
    blocksNum: PropTypes.number.isRequired,
    won: PropTypes.bool.isRequired,
    canMove: PropTypes.func.isRequired,
    move: PropTypes.func.isRequired,
  };

  render() {
    const {
      blocksNum, sticks, won, canMove, move,
    } = this.props;
    return (
      <div className={style.gameBoard}>
        {won && <div className={style.won}>Wygrana!</div>}
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
