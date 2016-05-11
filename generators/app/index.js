const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  prompting: {
    fountain() {
      this.options.framework = 'react';
      this.fountainPrompting();
    },

    sample() {
      const done = this.async();

      this.option('sample', {type: Boolean, required: false});

      const prompts = {
        when: !this.options.sample,
        type: 'list',
        name: 'sample',
        message: 'Do you want a sample app?',
        choices: [
          {name: 'A working landing page', value: 'techs'},
          {name: 'Just a Hello World', value: 'hello'}
        ]
      };

      if (this.props.js !== 'typescript' && this.props.modules === 'webpack') {
        prompts.choices.push({name: 'Redux TodoMVC', value: 'todoMVC'});
      }

      this.prompt(prompts, props => {
        Object.assign(this.props, props);
        done();
      });
    }
  },

  configuring: {
    pkg() {
      this.mergeJson('package.json', {
        dependencies: {
          'react': '^15.0.1',
          'react-dom': '^15.0.1'
        }
      });

      this.mergeJson('package.json', {
        devDependencies: {
          'react-addons-test-utils': '^15.0.1'
        }
      });
    },

    babel() {
      if (this.props.js !== 'typescript') {
        this.mergeJson('.babelrc', {
          presets: ['react']
        });
      }
    }
  },

  composing() {
    this.composeWith(`fountain-react:${this.props.sample}`, {
      options: {
        framework: this.props.framework,
        modules: this.props.modules,
        js: this.props.js,
        css: this.props.css
      }
    }, {
      local: require.resolve(`../${this.props.sample}`)
    });
    this.composeWith('fountain-gulp', {options: this.props}, {
      local: require.resolve('generator-fountain-gulp/generators/app')
    });
  },

  writing() {
    this.copyTemplate('src/index.html', 'src/index.html');
  }
});
