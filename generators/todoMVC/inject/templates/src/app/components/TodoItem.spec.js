function todoItemSetup(editing) {
  editing = editing || false;

  var props = {
    todo: {
      id: 0,
      text: 'Use Redux',
      completed: false
    },
    editTodo: jasmine.createSpy(),
    deleteTodo: jasmine.createSpy(),
    completeTodo: jasmine.createSpy()
  };

  var renderer = React.addons.TestUtils.createRenderer();

  renderer.render(
    <TodoItem {...props}/>
  );

  var output = renderer.getRenderOutput();

  if (editing) {
    var label = output.props.children.props.children[1];
    label.props.onDoubleClick({});
    output = renderer.getRenderOutput();
  }

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', function () {
  describe('TodoItem', function () {
    it('initial render', function () {
      var output = todoItemSetup().output;

      expect(output.type).toBe('li');
      expect(output.props.className).toBe('');

      var div = output.props.children;

      expect(div.type).toBe('div');
      expect(div.props.className).toBe('view');

      var input = div.props.children[0];
      var label = div.props.children[1];
      var button = div.props.children[2];

      expect(input.type).toBe('input');
      expect(input.props.checked).toBe(false);

      expect(label.type).toBe('label');
      expect(label.props.children).toBe('Use Redux');

      expect(button.type).toBe('button');
      expect(button.props.className).toBe('destroy');
    });

    it('input onChange should call completeTodo', function () {
      var setupRes = todoItemSetup();
      var output = setupRes.output;
      var props = setupRes.props;
      var input = output.props.children.props.children[0];
      input.props.onChange({});
      expect(props.completeTodo).toHaveBeenCalledWith(0);
    });

    it('button onClick should call deleteTodo', function () {
      var setupRes = todoItemSetup();
      var output = setupRes.output;
      var props = setupRes.props;
      var button = output.props.children.props.children[2];
      button.props.onClick({});
      expect(props.deleteTodo).toHaveBeenCalledWith(0);
    });

    it('label onDoubleClick should put component in edit state', function () {
      var setupRes = todoItemSetup();
      var output = setupRes.output;
      var renderer = setupRes.renderer;
      var label = output.props.children.props.children[1];
      label.props.onDoubleClick({});
      var updated = renderer.getRenderOutput();
      expect(updated.type).toBe('li');
      expect(updated.props.className).toBe('editing');
    });

    it('edit state render', function () {
      var output = todoItemSetup(true).output;

      expect(output.type).toBe('li');
      expect(output.props.className).toBe('editing');

      var input = output.props.children;
      expect(input.type).toBe(TodoTextInput);
      expect(input.props.text).toBe('Use Redux');
      expect(input.props.editing).toBe(true);
    });

    it('TodoTextInput onSave should call editTodo', function () {
      var setupRes = todoItemSetup(true);
      var output = setupRes.output;
      var props = setupRes.props;
      output.props.children.props.onSave('Use Redux');
      expect(props.editTodo).toHaveBeenCalledWith(0, 'Use Redux');
    });

    it('TodoTextInput onSave should call deleteTodo if text is empty', function () {
      var setupRes = todoItemSetup(true);
      var output = setupRes.output;
      var props = setupRes.props;
      output.props.children.props.onSave('');
      expect(props.deleteTodo).toHaveBeenCalledWith(0);
    });

    it('TodoTextInput onSave should exit component from edit state', function () {
      var setupRes = todoItemSetup(true);
      var output = setupRes.output;
      var renderer = setupRes.renderer;
      output.props.children.props.onSave('Use Redux');
      var updated = renderer.getRenderOutput();
      expect(updated.type).toBe('li');
      expect(updated.props.className).toBe('');
    });
  });
});
