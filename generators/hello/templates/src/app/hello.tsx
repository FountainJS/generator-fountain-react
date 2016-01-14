<% if (modules !== 'inject') { -%>
import * as React from 'react';
<% } else { -%>
/// <reference path="../../typings/tsd.d.ts" />
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
