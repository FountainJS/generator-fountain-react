<% if (modules !== 'babel') { -%>
import * as React from 'react';
<% } -%>

interface IHelloProps {};

interface IHelloState {};

<% if (modules !== 'inject') { -%>
export class Hello extends React.Component<IHelloProps, IHelloState> {
<% } else { -%>
class Hello extends React.Component<IHelloProps, IHelloState> {
<% } -%>
  render() {
    return (
      <h1>{'Hello world!'}</h1>
    );
  }
}
