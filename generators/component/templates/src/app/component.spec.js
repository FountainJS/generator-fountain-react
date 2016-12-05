<% if (modules === 'inject') { -%>
describe('<%- className %> component', function () {
  it('should render default text', function () {
    const <%- componentName %> = React.addons.TestUtils.renderIntoDocument(<<%- className %>/>);
    const h2 = React.addons.TestUtils.findRenderedDOMComponentWithTag(<%- componentName %>, 'h2');
    expect(h2.textContent).toEqual('My brand new component!');
  });
});
<% } else { -%>
import React from 'react';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import <%- className %> from './<%- componentName %>.js';

describe('<%- className %> component', function () {
  it('should render default text', function () {
    const <%- componentName %> = TestUtils.renderIntoDocument(<<%- className %>/>);
    const h2 = TestUtils.findRenderedDOMComponentWithTag(<%- componentName %>, 'h2');
    expect(h2.textContent).toEqual('My brand new component!');
  });
});
<% } -%>
