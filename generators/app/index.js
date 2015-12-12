const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  prompting: function () {
    this.options.framework = 'react';
    this.fountainPrompting();
  },

  composing: function () {
    this.composeWith('fountain-gulp', { options: this.props });
  },

  writing: {
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

    src: function () {
      this.fs.copyTpl(
        this.templatePath('src'),
        this.destinationPath('src'),
        { modules: this.props.modules !== 'inject' }
      );

      this.mergeJson('.babelrc', {
        presets: ['react']
      });
    }
  }
});
