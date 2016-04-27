import React        from 'react';
import ReactDOM     from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
}                   from 'react-addons-test-utils';
import {List, Map}  from 'immutable';
import {expect}     from 'chai';

import Results from '../src/components/Results';

describe('Results', () => {
  it('renders entries with cote counts or zero', () => {
    const pair = List.of('1', '2');
    const tally = Map({'1': 5});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally}/>
    );

    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [one, two] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(one).to.contain('1');
    expect(one).to.contain('5');
    expect(two).to.contain('2');
    expect(two).to.contain('0');
  });

  it('invokes the next callback when the next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = List.of('1', '2');
    const component = renderIntoDocument(
      <Results pair={pair} tally={Map()} next={next} />
    );

    Simulate.click(ReactDOM.findDOMNode(component.refs.next));
    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results
        winner='1'
        pair={'1', '2'}
        tally={Map()}
      />
    )
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('1');
  });

});