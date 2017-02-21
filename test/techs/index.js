const path = require('path');
const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('fountain-generator').TestUtils;

let context;

const files = [
  'src/index.js',
  'src/index.css',
  'src/app/footer.js',
  'src/app/footer.spec.js',
  'src/app/header.js',
  'src/app/main.js',
  'src/app/title.js',
  'src/app/techs/tech.js',
  'src/app/techs/techs.js'
];

test.before(() => {
  context = TestUtils.mock('techs');
  context.mergeJson['package.json'] = {};
  require('../../generators/techs/index');
  process.chdir(path.resolve(__dirname, '../../'));
});

test(`Add axios to 'package.json' dependencies`, t => {
  TestUtils.call(context, 'configuring', {js: 'babel'});
  t.is(context.mergeJson['package.json'].dependencies.axios, '^0.15.3');
});

test(`Add axios and es6-promise to 'package.json' dependencies when js is 'typescript'`, t => {
  TestUtils.call(context, 'configuring', {js: 'typescript'});
  t.is(context.mergeJson['package.json'].dependencies.axios, '^0.15.3');
  t.is(context.mergeJson['package.json'].dependencies['es6-promise'], '^4.0.5');
});

test(`Call this.copyTemplate 8 times`, t => {
  const spy = chai.spy.on(context, 'copyTemplate');
  TestUtils.call(context, 'writing.src', {
    version: require('../../package.json').version,
    date: new Date().toString()
  });
  expect(spy).to.have.been.called.exactly(files.length);
  files.forEach(file => t.true(context.copyTemplate[file].length > 0));
});

test('Call this.prepareTechJson', () => {
  context.prepareTechJson = () => {};
  const spy = chai.spy.on(context, 'prepareTechJson');
  TestUtils.call(context, 'writing.techs');
  expect(spy).to.have.been.called.once();
});
