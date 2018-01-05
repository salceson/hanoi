import PropTypes from 'prop-types';

export function generateDefaultStick(blocksNum) {
  const stick = [];
  for (let i = blocksNum; i > 0; i -= 1) {
    stick.push(i);
  }
  return stick;
}

export function moveBlock(sticks, fromStickIdx, toStickIdx) {
  const newSticks = [];
  for (let i = 0; i < 3; i += 1) {
    const newStick = [];
    const length = sticks[i].length + ((i === fromStickIdx) ? -1 : 0);
    for (let j = 0; j < length; j += 1) {
      newStick.push(sticks[i][j]);
    }
    if (i === toStickIdx) {
      const fromStick = sticks[fromStickIdx];
      newStick.push(fromStick[fromStick.length - 1]);
    }
    newSticks.push(newStick);
  }
  return newSticks;
}

export const blocksPropType = PropTypes.arrayOf(PropTypes.number);
export const sticksPropType = PropTypes.arrayOf(blocksPropType);

export const blockType = 'block';
