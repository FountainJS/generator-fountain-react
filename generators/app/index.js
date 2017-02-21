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
          'react': '^15.4.2',
          'react-dom': '^15.4.2'
        },
        devDependencies: {
          'react-addons-test-utils': '^15.4.2',
          '@types/react': '^15.0.11',
          '@types/react-dom': '^0.14.23',
          '@types/react-addons-test-utils': '^0.14.17'
        }
      });

      if (this.props.router === 'router') {
        const routerVersion = this.props.modules === 'inject' ?
          'https://cdnjs.cloudflare.com/ajax/libs/react-router/3.0.2/ReactRouter.min.js' :
          '^3.0.2';
        this.mergeJson('package.json', {
          dependencies: {
            'react-router': routerVersion
          },
          devDependencies: {
            '@types/react-router': '^3.0.3'
          }
        });
      }
    },

    babel() {
      if (this.props.js !== 'typescript') {
        const presets = ['react'];

        this.mergeJson('.babelrc', {presets});
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

    this.composeWith(require.resolve(`../${this.props.sample}${modules}`), options);
    this.composeWith(require.resolve('generator-fountain-gulp/generators/app'), options);
  },

  writing() {
    this.copyTemplate('src/index.html', 'src/index.html');
  }
});
