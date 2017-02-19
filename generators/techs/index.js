const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  configuring() {
    this.mergeJson('package.json', {
      dependencies: {
        axios: '^0.15.3'
      }
    });

    if (this.options.js === 'typescript') {
      this.mergeJson('package.json', {
        dependencies: {
          'es6-promise': '^4.0.5'
        }
      });
    }
  },

  writing: {
    src() {
      [
        'src/index.js',
        'src/index.css',
        'src/app/footer.js',
        'src/app/footer.spec.js',
        'src/app/header.js',
        'src/app/main.js',
        'src/app/title.js',
        'src/app/techs/tech.js',
        'src/app/techs/techs.js'
      ].map(file => this.copyTemplate(file, file, {modules: this.options.modules}));
    },

    techs() {
      this.prepareTechJson();
    }
  }
});
