/// <reference path="../../typings/main.d.ts" />

/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-addons-test-utils';

import {Footer} from './footer';

describe('Footer', () => {
  it('should be a footer', () => {
<% if (modules === 'inject') { -%>
    const footer = React.addons.TestUtils.renderIntoDocument(<Footer/>);
<% } else { -%>
    const footer = TestUtils.renderIntoDocument(<Footer/>);
<% } -%>
    const footerNode = ReactDOM.findDOMNode(footer);
    expect(footerNode.tagName).toEqual('FOOTER');
  });
});
