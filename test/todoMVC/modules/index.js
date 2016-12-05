const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('fountain-generator').TestUtils;

let context;

const files = [
  'src/index.html',
  'src/index.js',
  'src/index.css',
  'src/app/actions/index.js',
  'src/app/actions/index.spec.js',
  'src/app/components/Footer.js',
  'src/app/components/Footer.spec.js',
  'src/app/components/Header.js',
  'src/app/components/Header.spec.js',
  'src/app/components/MainSection.js',
  'src/app/components/MainSection.spec.js',
  'src/app/components/TodoItem.js',
  'src/app/components/TodoItem.spec.js',
  'src/app/components/TodoTextInput.js',
  'src/app/components/TodoTextInput.spec.js',
  'src/app/constants/ActionTypes.js',
  'src/app/constants/TodoFilters.js',
  'src/app/containers/App.js',
  'src/app/reducers/index.js',
  'src/app/reducers/todos.js',
  'src/app/reducers/todos.spec.js',
  'src/app/store/configureStore.js'
];

test.before(() => {
  context = TestUtils.mock('todoMVC/modules');
  require('../../../generators/todoMVC/modules/index');
  process.chdir('../../../');
});

test(`Add deps to package.json dependencies`, t => {
  TestUtils.call(context, 'configuring');
  t.is(context.mergeJson['package.json'].dependencies.classnames, '^2.2.5');
  t.is(context.mergeJson['package.json'].dependencies['react-dom'], '^15.0.1');
  t.is(context.mergeJson['package.json'].dependencies['react-redux'], '^4.4.5');
  t.is(context.mergeJson['package.json'].dependencies.redux, '^3.5.1');
  t.is(context.mergeJson['package.json'].dependencies['es6-shim'], '^0.35.0');
  t.is(context.mergeJson['package.json'].dependencies['todomvc-app-css'], '^2.0.4');
  t.is(context.mergeJson['package.json'].devDependencies['@types/classnames'], '^0.0.31');
});

test(`Call this.copyTemplate 12 times`, t => {
  const spy = chai.spy.on(context, 'copyTemplate');
  TestUtils.call(context, 'writing.src', {
    js: 'babel',
    version: require('../../../package.json').version,
    date: new Date().toString()
  });
  expect(spy).to.have.been.called.exactly(files.length);
  files.filter(file => file !== 'src/index.css').forEach(file => t.true(context.copyTemplate[file].length > 0));
});

test(`Call this.copyTemplate 13 times when js is 'typescript'`, t => {
  const spy = chai.spy.on(context, 'copyTemplate');
  TestUtils.call(context, 'writing.src', {
    js: 'typescript',
    version: require('../../../package.json').version,
    date: new Date().toString()
  });
  expect(spy).to.have.been.called.exactly(files.length + 1);
  files.filter(file => file !== 'src/index.css').forEach(file => t.true(context.copyTemplate[file].length > 0));
});
