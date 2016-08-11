const fountain = require('fountain-generator');
const version = require('../../package.json').version;

module.exports = fountain.Base.extend({
  prompting: {
    fountain() {
      this.options.framework = 'react';
      return this.fountainPrompting();
    },

    sample() {
      this.option('sample', {type: Boolean, required: false});

      const prompts = [{
        when: !this.options.sample,
        type: 'list',
        name: 'sample',
        message: 'Do you want a sample app?',
        choices: [
          {name: 'A working landing page', value: 'techs'},
          {name: 'Just a Hello World', value: 'hello'},
          {name: 'Redux TodoMVC', value: 'todoMVC'}
        ]
      }, {
        when: !this.options.router,
        type: 'list',
        name: 'router',
        message: 'Would you like a router?',
        choices: [
          {name: 'React router', value: 'router'},
          {name: 'None', value: 'none'}
        ]
      }];

      return this.prompt(prompts).then(props => {
        Object.assign(this.props, props);
      });
    }
  },

  configuring: {
    config() {
      this.config.set('version', version);
      this.config.set('props', this.props);
    },

    pkg() {
      this.mergeJson('package.json', {
        dependencies: {
          'react': '^15.0.1',
          'react-dom': '^15.0.1'
        }
      });

      if (this.props.router === 'router') {
        if (this.props.modules === 'inject') {
          this.mergeJson('package.json', {
            dependencies: {
              'react-router': 'https://cdnjs.cloudflare.com/ajax/libs/react-router/2.4.1/ReactRouter.min.js'
            }
          });
        } else {
          this.mergeJson('package.json', {
            dependencies: {
              'react-router': '^2.4.0'
            }
          });
        }
      }

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
    const options = {
      framework: this.props.framework,
      modules: this.props.modules,
      js: this.props.js,
      ci: this.props.ci,
      css: this.props.css,
      router: this.props.router,
      sample: this.props.sample,
      skipInstall: this.props.skipInstall,
      skipCache: this.props.skipCache
    };

    const modules = this.props.sample === 'todoMVC' ? `/${this.props.modules === 'inject' ? 'inject' : 'modules'}` : '';

    this.composeWith(`fountain-react:${this.props.sample}`, {options}, {
      local: require.resolve(`../${this.props.sample}${modules}`)
    });
    this.composeWith('fountain-gulp', {options}, {
      local: require.resolve('generator-fountain-gulp/generators/app')
    });
  },

  writing() {
    this.copyTemplate('src/index.html', 'src/index.html');
  }
});
