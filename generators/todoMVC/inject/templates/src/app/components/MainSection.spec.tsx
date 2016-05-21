function mainSetup(propOverrides: any) {
  const props = assign({
    todos: [
      {
        text: 'Use Redux',
        completed: false,
        id: 0
      }, {
        text: 'Run the tests',
        completed: true,
        id: 1
      }
    ],
    actions: {
      editTodo: jasmine.createSpy('editTodo'),
      deleteTodo: jasmine.createSpy('deleteTodo'),
      completeTodo: jasmine.createSpy('completeTodo'),
      completeAll: jasmine.createSpy('completeAll'),
      clearCompleted: jasmine.createSpy('clearCompleted')
    }
  }, propOverrides);

  const renderer = React.addons.TestUtils.createRenderer();
  renderer.render(<MainSection {...props}/>);
  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('components', () => {
  describe('MainSection', () => {
    it('should render container', () => {
      const {output} = mainSetup({});
      expect(output.type).toBe('section');
      expect(output.props.className).toBe('main');
    });

    describe('toggle all input', () => {
      it('should render', () => {
        const {output} = mainSetup({});
        const [toggle] = output.props.children;
        expect(toggle.type).toBe('input');
        expect(toggle.props.type).toBe('checkbox');
        expect(toggle.props.checked).toBe(false);
      });

      it('should be checked if all todos completed', () => {
        const {output} = mainSetup({
          todos: [
            {
              text: 'Use Redux',
              completed: true,
              id: 0
            }
          ]
        });
        const [toggle] = output.props.children;
        expect(toggle.props.checked).toBe(true);
      });

      it('should call completeAll on change', () => {
        const {output, props} = mainSetup({});
        const [toggle] = output.props.children;
        toggle.props.onChange({});
        expect(props.actions.completeAll).toHaveBeenCalled();
      });
    });

    describe('footer', () => {
      it('should render', () => {
        const {output} = mainSetup({});
        const [, , footer] = output.props.children;
        expect(footer.type).toBe(Footer);
        expect(footer.props.completedCount).toBe(1);
        expect(footer.props.activeCount).toBe(1);
        expect(footer.props.filter).toBe(SHOW_ALL);
      });

      it('onShow should set the filter', () => {
        const {output, renderer} = mainSetup({});
        const [, , footer] = output.props.children;
        footer.props.onShow(SHOW_COMPLETED);
        const updated = renderer.getRenderOutput();
        const [, , updatedFooter] = updated.props.children;
        expect(updatedFooter.props.filter).toBe(SHOW_COMPLETED);
      });

      it('onClearCompleted should call clearCompleted', () => {
        const {output, props} = mainSetup({});
        const [, , footer] = output.props.children;
        footer.props.onClearCompleted();
        expect(props.actions.clearCompleted).toHaveBeenCalled();
      });
    });

    describe('todo list', () => {
      it('should render', () => {
        const {output, props} = mainSetup({});
        const [, list] = output.props.children;
        expect(list.type).toBe('ul');
        expect(list.props.children.length).toBe(2);
        list.props.children.forEach((item, i) => { // eslint-disable-line max-nested-callbacks
          expect(item.type).toBe(TodoItem);
          expect(item.props.todo).toBe(props.todos[i]);
        });
      });

      it('should filter items', () => {
        const {output, renderer, props} = mainSetup({});
        const [, , footer] = output.props.children;
        footer.props.onShow(SHOW_COMPLETED);
        const updated = renderer.getRenderOutput();
        const [, updatedList] = updated.props.children;
        expect(updatedList.props.children.length).toBe(1);
        expect(updatedList.props.children[0].props.todo).toBe(props.todos[1]);
      });
    });
  });
});
