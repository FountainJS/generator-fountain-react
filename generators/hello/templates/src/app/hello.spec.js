/* eslint-env jasmine */
<% if (modules === 'webpack') { -%>
var React = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils');
var Hello = require('./hello');
<% } -%>
<% if (modules === 'systemjs') { -%>
import React from 'react';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import Hello from './hello';
<% } -%>
<% if (modules === 'inject') { -%>
var TestUtils = React.addons.TestUtils;
<% } -%>

describe('hello component', function () {
  it('should render hello world', function () {
    var hello = TestUtils.renderIntoDocument(<Hello/>);
    var h1 = TestUtils.findRenderedDOMComponentWithTag(hello, 'h1');
    expect(h1.textContent).toEqual('Hello world!');
  });
});
