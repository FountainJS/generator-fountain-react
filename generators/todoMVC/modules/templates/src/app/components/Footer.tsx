/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
<% if (modules === 'webpack') { -%>
import * as classnames from 'classnames';
<% } else { -%>
import {default as classnames} from 'classnames';
<% } -%>
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../constants/TodoFilters';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
};

interface IFooterProps {
  completedCount: number;
  activeCount: number;
  filter: string;
  onClearCompleted: () => void;
  onShow: (filter: string) => void;
};

interface IFooterState {};

class Footer extends React.Component<IFooterProps, IFooterState> {
  static propTypes = {
    completedCount: React.PropTypes.number.isRequired,
    activeCount: React.PropTypes.number.isRequired,
    filter: React.PropTypes.string.isRequired,
    onClearCompleted: React.PropTypes.func.isRequired,
    onShow: React.PropTypes.func.isRequired
  };

  renderTodoCount() {
    const {activeCount} = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className='todo-count'>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter: string) {
    const title = FILTER_TITLES[filter];
    const {filter: selectedFilter, onShow} = this.props;
    const handleChange = () => onShow(filter);

    return (
      <a
        className={classnames({selected: filter === selectedFilter})}
        style={{cursor: 'pointer'}}
        onClick={handleChange}
        >
        {title}
      </a>
    );
  }

  renderClearButton() {
    const {completedCount, onClearCompleted} = this.props;
    if (completedCount > 0) {
      return (
        <button
          className='clear-completed'
          onClick={onClearCompleted}
          >
          Clear completed
        </button>
      );
    }
  }

  render() {
    return (
      <footer className='footer'>
        {this.renderTodoCount()}
        <ul className='filters'>
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}

export default Footer;
