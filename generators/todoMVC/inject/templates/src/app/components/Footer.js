var FILTER_TITLES = {};
FILTER_TITLES[SHOW_ALL] = 'All';
FILTER_TITLES[SHOW_ACTIVE] = 'Active';
FILTER_TITLES[SHOW_COMPLETED] = 'Completed';

var Footer = React.createClass({
  propTypes: {
    completedCount: React.PropTypes.number.isRequired,
    activeCount: React.PropTypes.number.isRequired,
    filter: React.PropTypes.string.isRequired,
    onClearCompleted: React.PropTypes.func.isRequired,
    onShow: React.PropTypes.func.isRequired
  },

  renderTodoCount: function () {
    var activeCount = this.props.activeCount;
    var itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  },

  renderFilterLink: function (filter) {
    var title = FILTER_TITLES[filter];
    var selectedFilter = this.props.filter;
    var onShow = this.props.onShow;
    var handleChange = function () {
      onShow(filter);
    };

    return (
      <a
        className={classNames({selected: filter === selectedFilter})}
        style={{cursor: 'pointer'}}
        onClick={handleChange}
        >
        {title}
      </a>
    );
  },

  renderClearButton: function () {
    var completedCount = this.props.completedCount;
    var onClearCompleted = this.props.onClearCompleted;
    if (completedCount > 0) {
      return (
        <button
          className="clear-completed"
          onClick={onClearCompleted}
          >
          Clear completed
        </button>
      );
    }
  },

  render: function () {
    return (
      <footer className="footer">
        {this.renderTodoCount()}
        <ul className="filters">
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(function (filter) {
            return (
              <li key={filter}>
                {this.renderFilterLink(filter)}
              </li>
            );
          }, this)}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
});
