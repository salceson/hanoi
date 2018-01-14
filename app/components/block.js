import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import classNames from 'classnames';

import { blockType } from '../utils';

import style from '../styles/block.css';

const blockSource = {
  beginDrag: props => ({
    currentStickIdx: props.currentStickIdx,
    value: props.value,
  }),
  canDrag: props => props.canDrag,
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

@DragSource(blockType, blockSource, collect)
class Block extends React.Component {
  static propTypes = {
    canDrag: PropTypes.bool.isRequired,
    blocksNum: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    currentStickIdx: PropTypes.number.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  };

  render() {
    const {
      canDrag, connectDragSource, value, blocksNum,
    } = this.props;
    const width = `calc(90% * ${value} / ${blocksNum})`;
    const color = 255 - Math.round((value / blocksNum) * 128);
    const background = `rgb(0, 0, ${color}`;
    const className = classNames(style.block, canDrag && style.canDrag);

    return connectDragSource((
      <div className={className} style={{ width, background }}>
        {value}
      </div>
    ));
  }
}

export default Block;
