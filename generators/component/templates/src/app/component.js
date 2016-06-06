<% if (modules === 'webpack') { -%>
const React = require('react');

export default React.createClass({
<% } -%>
<% if (modules === 'systemjs') { -%>
import React from 'react';

export default React.createClass({
<% } -%>
<% if (modules === 'inject') { -%>
window.<%- className %> = React.createClass({
<% } -%>
  getDefaultProps: function () {
    return {
      text: 'My brand new component!'
    };
  },

  propTypes: {
    text: React.PropTypes.string
  },

  render: function () {
    return (
      <div>
        <h2>{this.props.text}</h2>
      </div>
    );
  }
});
