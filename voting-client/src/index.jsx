import React            from 'react';
import ReactDOM         from 'react-dom';

import {Router, Route, hashHistory} from 'react-router';

import App      from './components/App';
import Voting   from './components/Voting';
import Results  from './components/Results';

// const pair = ['The Matrix', 'The Matrix Reloaded'];

const routes = <Route component={App}>
  <Route path="/results" component={Results}/>
  <Route path="/" component={Voting}/>
</Route>;

// ReactDOM.render(
//   <Voting 
//     pair={pair}
//     winner="The Matrix"
//   />,
//   document.getElementById('app')
// );

ReactDOM.render(
  <Router history={hashHistory}>{routes}</Router>,
  document.getElementById('app')
);


