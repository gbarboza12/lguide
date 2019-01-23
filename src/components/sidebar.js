import React, { Component } from 'react'

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.close = this.close.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }
  // closes panel
  close() {
    this.props.close()
  }
  // updates list of checked filters
  update(filterItem) {
    this.props.update(filterItem)
  }
  // clicking inside panel does nothing, clicking outside prompts panel to close
  handleClick = e => {
    if (this.node.contains(e.target)) {
      return
    }
    this.close()
  }
  // handles changes when selecting checkbox
  handleChange(e) {
    const filterItem = e.target.name
    this.update(filterItem)
  }
  // returns a list of filter options
  getFilters() {
    const filters = []
    this.props.filterOptions.forEach(filter => {
      filters.push({
        filterName:
          filter.fieldValue.charAt(0).toUpperCase() +
          filter.fieldValue.slice(1),
        count: filter.totalCount,
      })
    })
    return filters
  }
  isChecked(filterName) {
    const filterType = this.props.filterType
    const filterItem =
      filterType === 'Topic' ? filterName.toLowerCase() : filterName
    const checkedItems = this.props.checkedItems

    if (checkedItems.includes(filterItem)) return true
    else return false
  }
  render() {
    const { filterType, resetFilters } = this.props
    const filterList = this.getFilters()
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
                checked={this.isChecked(filter.filterName)}
                onChange={this.handleChange}
              />
              {filter.filterName}({filter.count})
            </label>
            <br />
          </div>
        ))}
        {/* {resetFilters ? <button type="button" class="btn btn-outline-danger" onClick={this.reset} >Reset Filters</button>  : null} */}
      </div>
    )
  }
}
