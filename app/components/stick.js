import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import { blocksPropType, blockType } from '../utils';

import Block from './block';

import style from '../styles/stick.css';

const stickTarget = {
  canDrop(props, monitor) {
    const block = monitor.getItem();
    return props.canMove(block.value, props.stickIdx);
  },

  drop(props, monitor) {
    const block = monitor.getItem();
    props.move(block.currentStickIdx, props.stickIdx);
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

@DropTarget(blockType, stickTarget, collect)
class Stick extends React.Component {
  static propTypes = {
    blocks: blocksPropType.isRequired,
    stickIdx: PropTypes.number.isRequired,
    blocksNum: PropTypes.number.isRequired,
    canMove: PropTypes.func.isRequired,
    move: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  render() {
    const {
      connectDropTarget, stickIdx, blocks, blocksNum,
    } = this.props;
    return connectDropTarget((
      <div className={style.container}>
        {blocks.map((block, blockIdx) => (
          <Block
            value={block}
            key={blockIdx}
            blocksNum={blocksNum}
            currentStickIdx={stickIdx}
            canDrag={blockIdx === blocks.length - 1}
          />
        ))}
        <div className={style.stick} />
        <div className={style.floor} />
      </div>
    ));
  }
}

export default Stick;
