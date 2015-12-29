<% if (modules !== 'inject') { -%>
var React = require('react');

module.exports = React.createClass({
<% } else { -%>
module.exports = React.createClass({
<% } -%>
  render: function() {
    return (
      <h1>{'Hello world!'}</h1>
    );
  }
});
