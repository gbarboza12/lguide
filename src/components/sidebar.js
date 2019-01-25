import React, { Component } from 'react';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.reset = this.reset.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  // closes panel
  close() {
    this.props.close();
  }
  // updates list of checked filters
  update(filterItem) {
    this.props.update(filterItem);
  }
  // resets filter list
  reset() {
    this.props.reset();
  }
  // clicking inside panel does nothing, clicking outside prompts panel to close
  handleClick = e => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.close();
  };
  // handles changes when selecting checkbox
  handleChange(e) {
    const filterItem = e.target.name;
    this.update(filterItem);
  }
  render() {
    const { filterType, showFilterButton } = this.props;
    const filterList = this.props.filterOptions;

    return (
      <div className="sidebar" ref={node => (this.node = node)}>
        <a
          href="javascript:void(0)"
          aria-label="Close"
          className="closebtn"
          onClick={this.close}
        >
          &times;
        </a>
        <h5>{`Filter by ${filterType}`}</h5>
        {filterList.map(filter => (
          <div className="form-check">
            <label className="form-check-label">
              <input
                type="checkbox"
                className="form-check-input"
                id="filterCheck"
                name={filter.filterName}
                checked={filter.isChecked}
                onChange={this.handleChange}
              />
              {filter.filterName}({filter.count})
            </label>
            <br />
          </div>
        ))}
        {showFilterButton ? (
          <div className="reset-btn-div text-center">
            <button
              type="button"
              className="btn reset-btn"
              aria-label="Reset filters"
              onClick={this.reset}
            >
              Reset Filters
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
