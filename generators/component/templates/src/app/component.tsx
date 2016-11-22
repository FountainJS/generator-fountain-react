<% if (modules !== 'inject') { -%>
import * as React from 'react';

<% } -%>
interface I<%- className %>Props {
  text?: string;
};

interface I<%- className %>State {};

<% if (modules === 'inject') { -%>
class <%- className %> extends React.Component<I<%- className %>Props, I<%- className %>State> {
<% } else { -%>
export default class <%- className %> extends React.Component<I<%- className %>Props, I<%- className %>State> {
<% } -%>
  static propTypes = {
    text: React.PropTypes.string
  };

  static defaultProps = {
    text: 'My brand new component!'
  };

  render() {
    return (
      <div>
        <h2>{this.props.text}</h2>
      </div>
    );
  }
}
