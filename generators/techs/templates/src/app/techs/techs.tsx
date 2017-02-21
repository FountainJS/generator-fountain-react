import * as React from 'react';
import axios from 'axios';

import {Tech, TechComponent} from './tech';

const styles = {
  container: {
    margin: '1rem'
  },
  h2: {
    fontWeight: 300,
    fontSize: '1.5rem'
  } as React.CSSProperties,
  techs: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
};

interface ITechsProps {};

interface ITechsState {
  techs: Tech[];
};

export class Techs extends React.Component<ITechsProps, ITechsState> {
  constructor() {
    super();
    this.state = {techs: []};
  }

  componentDidMount() {
    axios
      .get('app/techs/techs.json')
      .then(response => {
        this.setState({techs: response.data});
      });
  }

  render() {
    return (
      <div style={styles.container}>
        <h2 style={styles.h2}>
          Cooked with all these awesome technologies:
        </h2>
        <div style={styles.techs as any}>
          {this.state.techs.map((tech: Tech, i: number) => (
            <TechComponent key={i} tech={tech}/>
          ))}
        </div>
      </div>
    );
  }
}
