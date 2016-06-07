/// <reference path="../../typings/index.d.ts" />

<% if (modules !== 'inject') { -%>
import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import { Hello } from './hello';
<% } else { -%>
const TestUtils = React.addons.TestUtils;
<% } -%>

describe('hello component', function() {
  it('should render hello world', function() {
    const hello = TestUtils.renderIntoDocument(<Hello/>);
    const h1 = TestUtils.findRenderedDOMComponentWithTag(hello, 'h1');
    expect(h1.textContent).toEqual('Hello world!');
  });
});
