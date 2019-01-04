import React, { Component } from 'react'
import './sidebar.css'

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedItems: [],
    }
    
    this.close = this.close.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  close() {
    this.props.close()
  }
  update(filterItem) {
    this.props.update(filterItem)
  }
  getFilters() {
    const filters = []
    this.props.filterItems.forEach(filter => {
      filters.push({
        filterName:
          filter.fieldValue.charAt(0).toUpperCase() +
          filter.fieldValue.slice(1),
        count: filter.totalCount,
      })
    })
    return filters;
  }
  handleChange(e) {
    const filterItem = e.target.name
    this.update(filterItem)
  }
  render() {
    const { pageType, pageContext } = this.props
    const filterList = this.getFilters()
    return (
      <div className="sidebar">
        <a href="javascript:void(0)" className="closebtn" onClick={this.close}>
          &times;
        </a>
        <h5>{`Filter ${pageContext}`}</h5>
        {filterList.map(filter => (
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="filterCheck"
              name={filter.filterName}
              onChange={this.handleChange}
            />
            <label className="form-check-label" for="filterCheck">
              {filter.filterName}
            </label>
            <br />
          </div>
        ))}
      </div>
    )
  }
}
