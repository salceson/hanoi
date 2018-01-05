import React from 'react';
import PropTypes from 'prop-types';

import { minBlocksNum, maxBlocksNum } from '../config';

import style from '../styles/settings.css';

class Settings extends React.Component {
  static propTypes = {
    onChangeBlocksNum: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    blocksNum: PropTypes.number.isRequired,
  };

  constructor() {
    super();
    this.onChangeBlocksNum = this.onChangeBlocksNum.bind(this);
  }

  onChangeBlocksNum(e) {
    this.props.onChangeBlocksNum(parseInt(e.target.value, 10));
  }

  renderSelect(currentBlocksNum) {
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
    const { blocksNum, onReset } = this.props;
    return (
      <div className={style.settings}>
        Liczba krążków:
        {this.renderSelect(blocksNum)}
        <button onClick={onReset}>Od nowa</button>
      </div>
    );
  }
}

export default Settings;
