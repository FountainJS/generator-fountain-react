import * as React from 'react';

const styles = {
  footer: {
    padding: '0.5rem',
    fontSize: '1rem',
    backgroundColor: '#1f1f1f',
    textAlign: 'center',
    color: 'white'
  }
};

interface IFooterProps {};

interface IFooterState {};

export class Footer extends React.Component<IFooterProps, IFooterState> {
  render() {
    return (
      <footer style={styles.footer}>
        Build with ♥ by the&nbsp;
        <a href='https://github.com/orgs/FountainJS/people'>
          FountainJS team
        </a>
      </footer>
    );
  }
}
