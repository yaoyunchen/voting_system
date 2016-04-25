import {expect}         from 'chai';
import {List, Map}      from 'immutable';

describe('immutability', () => {

  describe('a number', () => {
    function increment(currentState) {
      return currentState + 1;
    }
    it('is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('a list', () => {
    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('is immutable' ,() => {
      let state = List.of('The Matrix', 'The Matrix Reloaded')
      let nextState = addMovie(state, 'The Matrix Revolutions')

      expect(nextState).to.equal(List.of(
        'The Matrix',
        'The Matrix Reloaded',
        'The Matrix Revolutions'
      ));
      expect(state).to.equal(List.of(
        'The Matrix',
        'The Matrix Reloaded'
      ));
    });
  });

  describe('a tree', () => {
    function addMovie(currentState, movie) {
      return currentState.update('movies', movies => movies.push(movie)
      );
    }

    it('is immutable', () => {
      let state = Map({
        movies: List.of('The Matrix', 'The Matrix Reloaded')
      });
      let nextState = addMovie(state, 'The Matrix Revolutions')
      expect(nextState).to.equal(Map({
        movies: List.of(
          'The Matrix',
          'The Matrix Reloaded',
          'The Matrix Revolutions'
        )
      }));
      expect(state).to.equal(Map({
        movies: List.of(
          'The Matrix',
          'The Matrix Reloaded'
        )
      }));
    });
  });

});

