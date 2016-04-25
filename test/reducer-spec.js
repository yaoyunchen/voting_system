import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['1']};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      entries: ['1']
    }));
  });
  
  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['1', '2']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['1', '2']
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['1', '2']
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: '1'}
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['1', '2'],
        tally: {1: 1}
      },
      entries: []
    }));
  });

  it('has an initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['1']};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['1']
    }));
  });

  it('can be used with reduce', ()=> {
    const actions = [
      {type: 'SET_ENTRIES', entries: ['1', '2']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: '1'},
      {type: 'VOTE', entry: '2'},
      {type: 'VOTE', entry: '1'},
      {type: 'NEXT'},
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({
      winner: '1'
    }));
  });
});