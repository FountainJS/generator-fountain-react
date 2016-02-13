import * as React from 'react';

interface IHelloProps {};

interface IHelloState {};

export class Hello extends React.Component<IHelloProps, IHelloState> {
  render() {
    return (
      <h1>{'Hello world!'}</h1>
    );
  }
}
