import React          from 'React';
import {List, Map}    from 'immutable';

const pair = List.of('The Matrix', 'The Matrix Reloaded');
const tally = Map({'The Matrix': 5, 'The Matrix Reloaded': 4});

export default React.createClass({
  render: function() {
    return (
      React.cloneElement(this.props.children, {pair: pair,
        tally: tally
      })
    );
  }
});