const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  prompting: function () {
    this.options.framework = 'react';
    this.fountainPrompting();
  },

  configuring: {
    package: function () {
      this.mergeJson('package.json', {
        dependencies: {
          react: '0.14.3',
          'react-dom': '0.14.3'
        },
        devDependencies: {
          'babel-preset-react': '6.1.18',
          'eslint-plugin-react': '3.10.0'
        }
      });
    },

    babel: function () {
      this.mergeJson('.babelrc', {
        presets: ['react']
      });
    }
  },

  composing: function () {
    this.composeWith('fountain-gulp', { options: this.props }, {
      local: require.resolve('generator-fountain-gulp/generators/app')
    });
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('src'),
      this.destinationPath('src'),
      { modules: this.props.modules !== 'inject' }
    );
  }
});
