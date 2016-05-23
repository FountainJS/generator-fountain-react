var React = require('react');
var TestUtils = require('react-addons-test-utils');
var MainSection = require('./MainSection');
var TodoItem = require('./TodoItem');
var Footer = require('./Footer');
var filters = require('../constants/TodoFilters');

var SHOW_ALL = filters.SHOW_ALL;
var SHOW_COMPLETED = filters.SHOW_COMPLETED;

function setup(propOverrides) {
  var props = Object.assign({
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
      editTodo: jasmine.createSpy(),
      deleteTodo: jasmine.createSpy(),
      completeTodo: jasmine.createSpy(),
      completeAll: jasmine.createSpy(),
      clearCompleted: jasmine.createSpy()
    }
  }, propOverrides);

  var renderer = TestUtils.createRenderer();
  renderer.render(<MainSection {...props}/>);
  var output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
}

describe('components', function () {
  describe('MainSection', function () {
    it('should render container', function () {
      var output = setup().output;
      expect(output.type).toBe('section');
      expect(output.props.className).toBe('main');
    });

    describe('toggle all input', function () {
      it('should render', function () {
        var output = setup().output;
        var toggle = output.props.children[0];
        expect(toggle.type).toBe('input');
        expect(toggle.props.type).toBe('checkbox');
        expect(toggle.props.checked).toBe(false);
      });

      it('should be checked if all todos completed', function () {
        var setupRes = setup({
          todos: [
            {
              text: 'Use Redux',
              completed: true,
              id: 0
            }
          ]
        });
        var output = setupRes.output;
        var toggle = output.props.children[0];
        expect(toggle.props.checked).toBe(true);
      });

      it('should call completeAll on change', function () {
        var setupRes = setup();
        var output = setupRes.output;
        var props = setupRes.props;
        var toggle = output.props.children[0];
        toggle.props.onChange({});
        expect(props.actions.completeAll).toHaveBeenCalled();
      });
    });

    describe('footer', function () {
      it('should render', function () {
        var output = setup().output;
        var footer = output.props.children[2];
        expect(footer.type).toBe(Footer);
        expect(footer.props.completedCount).toBe(1);
        expect(footer.props.activeCount).toBe(1);
        expect(footer.props.filter).toBe(SHOW_ALL);
      });

      it('onShow should set the filter', function () {
        var setupRes = setup();
        var output = setupRes.output;
        var renderer = setupRes.renderer;
        var footer = output.props.children[2];
        footer.props.onShow(SHOW_COMPLETED);
        var updated = renderer.getRenderOutput();
        var updatedFooter = updated.props.children[2];
        expect(updatedFooter.props.filter).toBe(SHOW_COMPLETED);
      });

      it('onClearCompleted should call clearCompleted', function () {
        var setupRes = setup();
        var output = setupRes.output;
        var props = setupRes.props;
        var footer = output.props.children[2];
        footer.props.onClearCompleted();
        expect(props.actions.clearCompleted).toHaveBeenCalled();
      });
    });

    describe('todo list', function () {
      it('should render', function () {
        var setupRes = setup();
        var output = setupRes.output;
        var props = setupRes.props;
        var list = output.props.children[1];
        expect(list.type).toBe('ul');
        expect(list.props.children.length).toBe(2);
        list.props.children.forEach(function (item, i) { // eslint-disable-line max-nested-callbacks
          expect(item.type).toBe(TodoItem);
          expect(item.props.todo).toBe(props.todos[i]);
        });
      });

      it('should filter items', function () {
        var setupRes = setup();
        var output = setupRes.output;
        var renderer = setupRes.renderer;
        var props = setupRes.props;
        var footer = output.props.children[2];
        footer.props.onShow(SHOW_COMPLETED);
        var updated = renderer.getRenderOutput();
        var updatedList = updated.props.children[1];
        expect(updatedList.props.children.length).toBe(1);
        expect(updatedList.props.children[0].props.todo).toBe(props.todos[1]);
      });
    });
  });
});
