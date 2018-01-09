import React from 'react';
import PropTypes from 'prop-types';

import { minBlocksNum, maxBlocksNum } from '../config';

import style from '../styles/gameControlPanel.css';

class GameControlPanel extends React.Component {
  static propTypes = {
    onChangeBlocksNum: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    blocksNum: PropTypes.number.isRequired,
    moves: PropTypes.number.isRequired,
    won: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
  };

  constructor() {
    super();
    this.onChangeBlocksNum = this.onChangeBlocksNum.bind(this);
  }

  onChangeBlocksNum(e) {
    this.props.onChangeBlocksNum(parseInt(e.target.value, 10));
  }

  renderMoves() {
    const { moves, won, blocksNum } = this.props;
    const minMoves = (2 ** blocksNum) - 1;
    return (
      <span className={style.moves}>
        Liczba ruchów: {moves}
        {won && ` (minimalna: ${minMoves})`}
      </span>
    );
  }

  renderTime() {
    const { time } = this.props;
    const s = time % 60;
    const seconds = (s < 10) ? `0${s}` : s;
    const m = (time - s) / 60;
    const minutes = (m < 10) ? `0${m}` : m;
    return (
      <span className={style.time}>Czas: {minutes}:{seconds}</span>
    );
  }

  renderSelect() {
    const { blocksNum: currentBlocksNum } = this.props;
    const blocksNumbers = [];
    for (let i = minBlocksNum; i <= maxBlocksNum; i += 1) {
      blocksNumbers.push(i);
    }
    return (
      <select onChange={this.onChangeBlocksNum} defaultValue={currentBlocksNum}>
        {blocksNumbers.map(blocksNum => (
          <option
            value={blocksNum}
            key={`blocks-num-${blocksNum}`}
          >
            {blocksNum}
          </option>
        ))}
      </select>
    );
  }

  render() {
    const { onReset } = this.props;
    return (
      <div className={style.settings}>
        Liczba krążków:
        {this.renderSelect()}
        <button onClick={onReset}>Od nowa</button>
        {this.renderMoves()}
        {this.renderTime()}
      </div>
    );
  }
}

export default GameControlPanel;
