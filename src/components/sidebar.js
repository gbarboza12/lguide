import React, { Component } from 'react';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.reset = this.reset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getLabelCss = this.getLabelCss.bind(this);
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
  getLabelCss(isChecked) {
    return isChecked ? 'form-check-label checked-label' : 'form-check-label';
  }
  render() {
    const { showFilterButton } = this.props;
    const filterList = this.props.filterOptions;

    return (
      <aside
        className="sidebar"
        aria-label="Sidebar"
        ref={node => (this.node = node)}
      >
        <button
          type="button"
          aria-label="Close"
          className="btn closebtn"
          onClick={this.close}
        >
          &times;
        </button>
        <h4>Filter by </h4>
        <div className="sidebar-list-div">
          {filterList.map(filter => (
            <div className="row">
              <div className="col-9">
                <div className="checkbox">
                  <input
                    type="checkbox"
                    id={filter.filterName}
                    name={filter.filterName}
                    checked={filter.isChecked}
                    onChange={this.handleChange}
                  />
                  <label
                    htmlFor={filter.filterName}
                    className={this.getLabelCss(filter.isChecked)}
                  >
                    {filter.filterName}
                  </label>
                </div>
              </div>
              <div className="col-3 filter-count">{filter.count}</div>
              <hr className="" />
            </div>
          ))}
        </div>
        {showFilterButton ? (
          <div className="reset-btn-div text-center">
            <button
              type="button"
              className="btn reset-btn"
              aria-label="Clear filters"
              onClick={this.reset}
            >
              Clear Filters
            </button>
          </div>
        ) : null}
      </aside>
    );
  }
}
