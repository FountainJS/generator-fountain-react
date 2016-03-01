var React = require('react');

var styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#26d9de'
  },
  title: {
    flex: 1,
    fontSize: '1.5rem',
    margin: '1rem'
  },
  date: {
    flex: 1,
    textAlign: 'right',
    margin: '1rem'
  }
};

module.exports = React.createClass({
  render: function () {
    return (
      <header style={styles.header}>
        <p style={styles.title}>
          <a href="https://github.com/FountainJS/generator-fountain-webapp" target="_blank">
            Foutain Generator
          </a>
        </p>
        <p style={styles.date}>
          Generated with FountainJS v<%- version %> on <%- date %>
        </p>
      </header>
    );
  }
});
