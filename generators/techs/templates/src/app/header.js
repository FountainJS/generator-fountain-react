var React = require('react');

var styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1f1f1f'
  },
  title: {
    flex: 1,
    fontSize: '1.5rem',
    margin: '1rem'
  },
  date: {
    flex: 1,
    textAlign: 'right',
    margin: '1rem',
    color: 'white'
  }
};

module.exports = React.createClass({
  render: function () {
    return (
      <header style={styles.header}>
        <p style={styles.title}>
          <a href="https://github.com/FountainJS/generator-fountain-webapp" target="_blank">
            Fountain Generator
          </a>
        </p>
        <p style={styles.date}>
          Generated with FountainJS v<%- version %> on <%- date %>
        </p>
      </header>
    );
  }
});
