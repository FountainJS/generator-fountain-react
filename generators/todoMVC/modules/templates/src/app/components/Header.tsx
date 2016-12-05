import * as React from 'react';
import TodoTextInput from './TodoTextInput';

interface IHeaderProps {
  addTodo: (text: string) => void;
};

interface IHeaderState {};

class Header extends React.Component<IHeaderProps, IHeaderState> {
  static propTypes = {
    addTodo: React.PropTypes.func.isRequired
  };
  constructor(props: any) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text: string) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <header className='header'>
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder='What needs to be done?'
          />
      </header>
    );
  }
}

export default Header;
