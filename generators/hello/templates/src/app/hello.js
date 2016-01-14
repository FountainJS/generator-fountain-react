<% if (modules === 'webpack') { -%>
var React = require('react');

module.exports = React.createClass({
<% } -%>
<% if (modules === 'systemjs') { -%>
import React from 'react';

export default React.createClass({
<% } -%>
<% if (modules === 'inject') { -%>
window.Hello = React.createClass({
<% } -%>
  render: function() {
    return (
      <h1>{'Hello world!'}</h1>
    );
  }
});
