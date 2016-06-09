const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  writing() {
    const name = this.options.name || 'myComponent';
    const titleCase = string => string.charAt(0).toUpperCase() + string.slice(1);
    const lowerCase = string => string.charAt(0).toLowerCase() + string.slice(1);
    const path = this.options.dir ? `app/${this.options.dir}` : `app`;
    const typings = this.options.dir ? this.options.dir.split('/').reduce(prev => `../${prev}`, '../../typings/index.d.ts') : '../../typings/index.d.ts';
    const props = {
      componentName: lowerCase(name),
      className: titleCase(name),
      modules: this.config.get('props').modules,
      js: this.config.get('props').js,
      framework: this.config.get('props').framework,
      typings
    };
    this.copyTemplate(`src/app/component.js`, `src/${path}/${name}.js`, props);
    this.copyTemplate(`src/app/component.spec.js`, `src/${path}/${name}.spec.js`, props);
  }
});
