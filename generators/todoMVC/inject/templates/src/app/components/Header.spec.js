function headerSetup() {
  var props = {
    addTodo: jasmine.createSpy()
  };

  var renderer = React.addons.TestUtils.createRenderer();
  renderer.render(<Header {...props}/>);
  var output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', function () {
  describe('Header', function () {
    it('should render correctly', function () {
      var output = headerSetup().output;

      expect(output.type).toBe('header');
      expect(output.props.className).toBe('header');

      var h1 = output.props.children[0];
      var input = output.props.children[1];

      expect(h1.type).toBe('h1');
      expect(h1.props.children).toBe('todos');

      expect(input.type).toBe(TodoTextInput);
      expect(input.props.newTodo).toBe(true);
      expect(input.props.placeholder).toBe('What needs to be done?');
    });

    it('should call addTodo if length of text is greater than 0', function () {
      var setupRes = headerSetup();
      var output = setupRes.output;
      var props = setupRes.props;
      var input = output.props.children[1];
      input.props.onSave('');
      expect(props.addTodo.calls.count()).toBe(0);
      input.props.onSave('Use Redux');
      expect(props.addTodo.calls.count()).toBe(1);
    });
  });
});
