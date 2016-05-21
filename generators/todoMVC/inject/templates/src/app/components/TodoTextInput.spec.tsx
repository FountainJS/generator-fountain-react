function todoTextInputSetup(propOverrides: any) {
  const props = assign({
    onSave: jasmine.createSpy('onSave'),
    text: 'Use Redux',
    placeholder: 'What needs to be done?',
    editing: false,
    newTodo: false
  }, propOverrides);

  const renderer = React.addons.TestUtils.createRenderer();

  renderer.render(
    <TodoTextInput {...props}/>
  );

  let output = renderer.getRenderOutput();

  output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('components', () => {
  describe('TodoTextInput', () => {
    it('should render correctly', () => {
      const {output} = todoTextInputSetup({});
      expect(output.props.placeholder).toEqual('What needs to be done?');
      expect(output.props.value).toEqual('Use Redux');
      expect(output.props.className).toEqual('');
    });

    it('should render correctly when editing=true', () => {
      const {output} = todoTextInputSetup({editing: true});
      expect(output.props.className).toEqual('edit');
    });

    it('should render correctly when newTodo=true', () => {
      const {output} = todoTextInputSetup({newTodo: true});
      expect(output.props.className).toEqual('new-todo');
    });

    it('should update value on change', () => {
      const {output, renderer} = todoTextInputSetup({});
      output.props.onChange({target: {value: 'Use Radox'}});
      const updated = renderer.getRenderOutput();
      expect(updated.props.value).toEqual('Use Radox');
    });

    it('should call onSave on return key press', () => {
      const {output, props} = todoTextInputSetup({});
      output.props.onKeyDown({which: 13, target: {value: 'Use Redux'}});
      expect(props.onSave).toHaveBeenCalledWith('Use Redux');
    });

    it('should reset state on return key press if newTodo', () => {
      const {output, renderer} = todoTextInputSetup({newTodo: true});
      output.props.onKeyDown({which: 13, target: {value: 'Use Redux'}});
      const updated = renderer.getRenderOutput();
      expect(updated.props.value).toEqual('');
    });

    it('should call onSave on blur', () => {
      const {output, props} = todoTextInputSetup({});
      output.props.onBlur({target: {value: 'Use Redux'}});
      expect(props.onSave).toHaveBeenCalledWith('Use Redux');
    });

    it('shouldnt call onSave on blur if newTodo', () => {
      const {output, props} = todoTextInputSetup({newTodo: true});
      output.props.onBlur({target: {value: 'Use Redux'}});
      expect(props.onSave.calls.count()).toBe(0);
    });
  });
});
