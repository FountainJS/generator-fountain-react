var React = require('react');

var styles = {
  footer: {
    padding: '0.5rem',
    fontSize: '1rem',
    backgroundColor: '#1f1f1f',
    textAlign: 'center',
    color: 'white'
  }
};

module.exports = React.createClass({
  render: function () {
    return (
      <footer style={styles.footer}>
        Build with ♥ by the&nbsp;
        <a href="https://github.com/orgs/FountainJS/people">
          FountainJS team
        </a>
      </footer>
    );
  }
});
