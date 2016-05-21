var React = require('react');
var TestUtils = require('react-addons-test-utils');
var Footer = require('./Footer');
var filters = require('../constants/TodoFilters');

var SHOW_ALL = filters.SHOW_ALL;
var SHOW_ACTIVE = filters.SHOW_ACTIVE;

function setup(propOverrides) {
  var props = Object.assign({
    completedCount: 0,
    activeCount: 0,
    filter: SHOW_ALL,
    onClearCompleted: jasmine.createSpy(),
    onShow: jasmine.createSpy()
  }, propOverrides);

  var renderer = TestUtils.createRenderer();
  renderer.render(<Footer {...props}/>);
  var output = renderer.getRenderOutput();

  return {
    props: props,
    output: output
  };
}

function getTextContent(elem) {
  var children = Array.isArray(elem.props.children) ?
    elem.props.children : [elem.props.children];

  return children.reduce(function (out, child) {
    // Children are either elements or text strings
    return out + (child.props ? getTextContent(child) : child);
  }, '');
}

describe('components', function () {
  describe('Footer', function () {
    it('should render container', function () {
      var output = setup().output;
      expect(output.type).toBe('footer');
      expect(output.props.className).toBe('footer');
    });

    it('should display active count when 0', function () {
      var output = setup({activeCount: 0}).output;
      var count = output.props.children[0];
      expect(getTextContent(count)).toBe('No items left');
    });

    it('should display active count when above 0', function () {
      var output = setup({activeCount: 1}).output;
      var count = output.props.children[0];
      expect(getTextContent(count)).toBe('1 item left');
    });

    it('should render filters', function () {
      var output = setup().output;
      var filters = output.props.children[1];
      expect(filters.type).toBe('ul');
      expect(filters.props.className).toBe('filters');
      expect(filters.props.children.length).toBe(3);
      filters.props.children.forEach(function (filter, i) {
        expect(filter.type).toBe('li');
        var a = filter.props.children;
        expect(a.props.className).toBe(i === 0 ? 'selected' : '');
        expect(a.props.children).toBe({
          0: 'All',
          1: 'Active',
          2: 'Completed'
        }[i]);
      });
    });

    it('should call onShow when a filter is clicked', function () {
      var setupRes = setup();
      var output = setupRes.output;
      var props = setupRes.props;
      var filters = output.props.children[1];
      var filterLink = filters.props.children[1].props.children;
      filterLink.props.onClick({});
      expect(props.onShow).toHaveBeenCalledWith(SHOW_ACTIVE);
    });

    it('shouldnt show clear button when no completed todos', function () {
      var output = setup({completedCount: 0}).output;
      var clear = output.props.children[2];
      expect(clear).toBe(undefined);
    });

    it('should render clear button when completed todos', function () {
      var output = setup({completedCount: 1}).output;
      var clear = output.props.children[2];
      expect(clear.type).toBe('button');
      expect(clear.props.children).toBe('Clear completed');
    });

    it('should call onClearCompleted on clear button click', function () {
      var setupRes = setup({completedCount: 1});
      var output = setupRes.output;
      var props = setupRes.props;
      var clear = output.props.children[2];
      clear.props.onClick({});
      expect(props.onClearCompleted).toHaveBeenCalled();
    });
  });
});
