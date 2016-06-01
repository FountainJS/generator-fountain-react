/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
<% if (modules === 'webpack') { -%>
import * as classnames from 'classnames';
<% } else { -%>
import {default as classnames} from 'classnames';
<% } -%>

interface ITodoTextInputProps {
  onSave: (text: string) => void;
  text?: string;
  placeholder?: string;
  editing?: boolean;
  newTodo?: boolean;
};

interface ITodoTextInputState {
  text: string;
};

class TodoTextInput extends React.Component<ITodoTextInputProps, ITodoTextInputState> {
  static propTypes = {
    onSave: React.PropTypes.func.isRequired,
    text: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    editing: React.PropTypes.bool,
    newTodo: React.PropTypes.bool
  };

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: any) {
    const text = e.target.value.trim();
    if (e.which === 13 && this.state.text.length) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({text: ''});
      }
    }
  }

  handleChange(e: any) {
    this.setState({text: e.target.value});
  }

  handleBlur(e: any) {
    if (!this.props.newTodo && this.state.text.length) {
      this.props.onSave(e.target.value);
    }
  }

  render() {
    return (
      <input
        className={
          classnames({
            'edit': this.props.editing,
            'new-todo': this.props.newTodo
          })}
        type='text'
        placeholder={this.props.placeholder}
        autoFocus={true}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
        />
    );
  }
}

export default TodoTextInput;
