function todoTextInputSetup(propOverrides) {
  var props = Object.assign({
    onSave: jasmine.createSpy(),
    text: 'Use Redux',
    placeholder: 'What needs to be done?',
    editing: false,
    newTodo: false
  }, propOverrides);

  var renderer = React.addons.TestUtils.createRenderer();

  renderer.render(
    <TodoTextInput {...props}/>
  );

  var output = renderer.getRenderOutput();

  output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', function () {
  describe('TodoTextInput', function () {
    it('should render correctly', function () {
      var output = todoTextInputSetup().output;
      expect(output.props.placeholder).toEqual('What needs to be done?');
      expect(output.props.value).toEqual('Use Redux');
      expect(output.props.className).toEqual('');
    });

    it('should render correctly when editing=true', function () {
      var output = todoTextInputSetup({editing: true}).output;
      expect(output.props.className).toEqual('edit');
    });

    it('should render correctly when newTodo=true', function () {
      var output = todoTextInputSetup({newTodo: true}).output;
      expect(output.props.className).toEqual('new-todo');
    });

    it('should update value on change', function () {
      var setupRes = todoTextInputSetup();
      var output = setupRes.output;
      var renderer = setupRes.renderer;
      output.props.onChange({target: {value: 'Use Radox'}});
      var updated = renderer.getRenderOutput();
      expect(updated.props.value).toEqual('Use Radox');
    });

    it('should call onSave on return key press', function () {
      var setupRes = todoTextInputSetup();
      var output = setupRes.output;
      var props = setupRes.props;
      output.props.onKeyDown({which: 13, target: {value: 'Use Redux'}});
      expect(props.onSave).toHaveBeenCalledWith('Use Redux');
    });

    it('should reset state on return key press if newTodo', function () {
      var setupRes = todoTextInputSetup({newTodo: true});
      var output = setupRes.output;
      var renderer = setupRes.renderer;
      output.props.onKeyDown({which: 13, target: {value: 'Use Redux'}});
      var updated = renderer.getRenderOutput();
      expect(updated.props.value).toEqual('');
    });

    it('should call onSave on blur', function () {
      var setupRes = todoTextInputSetup();
      var output = setupRes.output;
      var props = setupRes.props;
      output.props.onBlur({target: {value: 'Use Redux'}});
      expect(props.onSave).toHaveBeenCalledWith('Use Redux');
    });

    it('shouldnt call onSave on blur if newTodo', function () {
      var setupRes = todoTextInputSetup({newTodo: true});
      var output = setupRes.output;
      var props = setupRes.props;
      output.props.onBlur({target: {value: 'Use Redux'}});
      expect(props.onSave.calls.count()).toBe(0);
    });
  });
});
