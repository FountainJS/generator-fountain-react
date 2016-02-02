/* eslint-env jasmine */
<% if (modules === 'webpack') { -%>
const React = require('react');
const TestUtils = require('react/lib/ReactTestUtils');
const Hello = require('./hello');
<% } -%>
<% if (modules === 'systemjs') { -%>
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Hello from './hello';
<% } -%>
<% if (modules === 'inject') { -%>
const TestUtils = React.addons.TestUtils;
<% } -%>

describe('hello component', () => {
  it('should render hello world', () => {
    const hello = TestUtils.renderIntoDocument(<Hello/>);
    const h1 = TestUtils.findRenderedDOMComponentWithTag(hello, 'h1');
    expect(h1.textContent).toEqual('Hello world!');
  });
});
