import * as React from 'react';

export class Tech {
  constructor(
    public title: string,
    public text1: string,
    public text2: string,
    public logo: string
  ) {}
}

const styles = {
  tech: {
    height: '15rem',
    width: '15rem',
    border: '1px solid lightgray',
    borderRadius: '1rem',
    margin: '1rem',
    padding: '1rem'
  },
  logo: {
    width: '5rem',
    height: '5rem',
    float: 'right',
    margin: '0 0 .5rem .5rem'
  },
  h3: {
    fontSize: '1.5rem',
    margin: '0 0 2rem 0'
  }
};

interface ITechProps {
  key: number;
  tech: Tech;
};

interface ITechState {};

export class TechComponent extends React.Component<ITechProps, ITechState> {
  static propTypes = {
    tech: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div style={styles.tech}>
        <img style={styles.logo} src={this.props.tech.logo}/>
        <h3 style={styles.h3}>
          {this.props.tech.title}
        </h3>
        <p>{this.props.tech.text1}</p>
        <p>{this.props.tech.text2}</p>
      </div>
    );
  }
}
