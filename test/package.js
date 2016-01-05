/* eslint no-unused-expressions: 0 */

const expect = require('chai').expect;
const TestUtils = require('fountain-generator').TestUtils;

describe('generator fountain react package', () => {
  beforeEach(function () {
    this.context = TestUtils.mock();
    require('../generators/app/index');
  });

  it('should add react-addons-test-utils in deps for typescript tests', function () {
    const getDep = () => this.context.mergeJson['package.json'].devDependencies['react-addons-test-utils'];
    TestUtils.call(this.context, 'configuring.pkg');
    expect(getDep()).to.not.exist;
    TestUtils.call(this.context, 'configuring.pkg', { js: 'typescript' });
    expect(getDep()).to.be.a('string');
    expect(getDep()).to.match(/^\^/);
  });
});
