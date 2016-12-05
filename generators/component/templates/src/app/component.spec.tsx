<% if (modules === 'inject') { -%>
describe('<%- className %> component', () => {
  it('should render title', () => {
    const <%- componentName %> = React.addons.TestUtils.renderIntoDocument(<<%- className %>/>);
    const h2 = React.addons.TestUtils.findRenderedDOMComponentWithTag(<%- componentName %>, 'h2');
    expect(h2.textContent).toEqual('My brand new component!');
  });
});
<% } else { -%>
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import <%- className %> from './<%- componentName %>';

describe('<%- className %> component', () => {
  it('should render title', () => {
    const <%- componentName %> = TestUtils.renderIntoDocument(<<%- className %>/>);
    const h2 = TestUtils.findRenderedDOMComponentWithTag(<%- componentName %>, 'h2');
    expect(h2.textContent).toEqual('My brand new component!');
  });
});
<% } -%>
