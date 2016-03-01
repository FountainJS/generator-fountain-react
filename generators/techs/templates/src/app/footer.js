var React = require('react');

var styles = {
  footer: {
    padding: '0.5rem',
    fontSize: '1rem',
    backgroundColor: '#26d9de',
    textAlign: 'center'
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
