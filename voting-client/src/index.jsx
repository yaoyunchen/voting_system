import React      from 'react';
import ReactDOM   from 'react-dom';

import Voting from './components/Voting';

const pair = ['The Matrix', 'The Matrix Reloaded'];

ReactDOM.render(
  <Voting 
    pair={pair}
    winner="The Matrix"
  />,
  document.getElementById('app')
)