var React = require('react');
var Header = require('./header');
var Title = require('./title');
var Techs = require('./techs/techs');
var Footer = require('./footer');

var styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  }
};

module.exports = React.createClass({
  render: function () {
    return (
      <div style={styles.container}>
        <Header/>
        <main style={styles.main}>
          <Title/>
          <Techs/>
        </main>
        <Footer/>
      </div>
    );
  }
});
