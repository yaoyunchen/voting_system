import {List, Map}  from 'immutable';
import {expect}     from 'chai';

import {setEntries, next, vote} from '../src/core'

describe('application logic', () => {

  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('1', '2');
      const nextState = setEntries(state, entries)
      expect(nextState).to.equal(Map({
        entries: List.of('1', '2')
      }));
    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['1', '2'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('1', '2')
      }));
    });
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('1', '2', '3')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('1', '2')
        }),
        entries: List.of('3')
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('1', '2'),
          tally: Map({
            '1': 4,
            '2': 2
          })
        }),
        entries: List.of('3', '4', '5')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('3', '4')
        }),
        entries: List.of('5', '1')
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('1', '2'),
          tally: Map({
            '1': 3,
            '2': 3
          })
        }),
        entries: List.of('3', '4', '5')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('3', '4')
        }),
        entries: List.of('5', '1', '2')
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('1', '2'),
          tally: Map({
            '1': 4,
            '2': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state)
      expect(nextState).to.equal(Map({
        winner: '1'
      }));
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('1', '2')
        }),
        entries: List()
      });
      const nextState = vote(state, '1');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('1', '2'),
          tally: Map({
            '1': 1
          })
        }),
        entries: List()
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('1', '2'),
          tally: Map({
            '1': 3,
            '2': 2
          })
        }),
        entries: List()
      });
      const nextState = vote(state, '1');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('1', '2'),
          tally: Map({
            '1': 4,
            '2': 2
          })
        }),
        entries: List()
      }));
    });
  });

});