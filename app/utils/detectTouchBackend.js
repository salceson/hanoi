import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import { DragDropContext } from 'react-dnd';

import detectTouchSupport from './detectTouchSupport';

const DetectTouchBackend = (Component) => {
  const backend = detectTouchSupport() ? TouchBackend : HTML5Backend;

  @DragDropContext(backend)
  class DecoratedComponent extends React.Component {
    render() {
      return <Component {...this.props} />;
    }
  }

  return DecoratedComponent;
};

export default DetectTouchBackend;
