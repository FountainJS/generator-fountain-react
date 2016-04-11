const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  prompting() {
    this.fountainPrompting();
  },

  writing() {
    const files = [
      'src/index.js',
      'src/index.css',
      'src/app/hello.js',
      'src/app/hello.spec.js'
    ];

    files.map(file => {
      return this.copyTemplate(file, file);
    });
  }
});
