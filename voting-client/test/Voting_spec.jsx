import React                from 'react';
import ReactDOM             from 'react-dom';
import {expect}             from 'chai';
import {List}               from 'immutable';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';

import Voting from '../src/components/Voting';

describe('Voting', () => {
  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={["The Matrix", "The Matrix Reloaded"]} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('The Matrix');
    expect(buttons[1].textContent).to.equal('The Matrix Reloaded');
  });

  it('invokes callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting 
        pair={['The Matrix', 'The MatrixReloaded']}
        vote={vote}
      />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('The Matrix');
  });

  it('disables buttons when user has voted', () => {
    const component = renderIntoDocument(
      <Voting
        pair={['The Matrix', 'The Matrix Reloaded']}
        hasVoted='The Matrix'
      />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    
    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('adds label to the voted entry', () => {
    const component = renderIntoDocument(
      <Voting
        pair={['The Matrix', 'The Matrix Reloaded']}
        hasVoted='The Matrix'
      />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).to.contain('Voted');
  });

  it('renders just the winner when there is one', () => {
    const component = renderIntoDocument(
      <Voting
        winner='The Matrix'
      />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('The Matrix');
  });

  it('renders as a pure component', () => {
    const pair = ['The Matrix', 'The Matrix Reloaded'];
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('The Matrix');
    
    pair[0] = 'The Matrix Revolutions';
    component = ReactDOM.render(
      <Voting pair={pair}/>,
      container
    );

    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('The Matrix');
  });

  it('does update DOM when prop changes', () =>{
    const pair = List.of('The Matrix', 'The Matrix Reloaded');
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('The Matrix');

    const newPair = pair.set(0, 'The Matrix Revolutions');
    component = ReactDOM.render(
      <Voting pair={newPair} />,
      container
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('The Matrix Revolutions')



  });
});


