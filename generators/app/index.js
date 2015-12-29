const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  prompting() {
    this.options.framework = 'react';
    this.fountainPrompting();
  },

  configuring: {
    package() {
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

    babel() {
      this.mergeJson('.babelrc', {
        presets: ['react']
      });
    }
  },

  composing() {
    this.composeWith('fountain-gulp', { options: this.props }, {
      local: require.resolve('generator-fountain-gulp/generators/app')
    });
  },

  writing() {
    const files = [
      'src/index.html',
      'src/index.js',
      'src/index.css',
      'src/app/hello.js',
      'src/app/hello.spec.js'
    ];

    files.map(file => {
      this.copyTemplate(file, file);
    });
  }
});
