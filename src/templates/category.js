import React, { Component } from 'react';
import { graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/layout';
import PostList from '../components/post-list';
import Sidebar from '../components/sidebar';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
      checkedItems: [],
      filtersList: [],
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.updateCheckedItems = this.updateCheckedItems.bind(this);
    this.reset = this.reset.bind(this);
  }
  componentDidMount() {
    const filtersList = this.getFiltersList();
    this.setState({ filtersList });
  }
  getFiltersList() {
    const filtersList = [];
    const filterOptions = this.props.data.filters.group;
    filterOptions.forEach(filter => {
      filtersList.push({
        filterName:
          filter.fieldValue.charAt(0).toUpperCase() +
          filter.fieldValue.slice(1),
        count: filter.totalCount,
        isChecked: false,
      });
    });
    return filtersList;
  }
  toggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar,
    });
  }
  updateCheckedItems(filterName) {
    // checkedItems list is used to filter out posts
    // TODO: use filters list instead
    const tempList = this.state.checkedItems;
    // delete item if already in list
    if (tempList.includes(filterName)) {
      this.setState({
        checkedItems: tempList.filter(function(listItem) {
          return listItem !== filterName;
        }),
      });
    }
    //add item to list
    else {
      this.setState(prevState => ({
        checkedItems: [...prevState.checkedItems, filterName],
      }));
    }

    // filtersList is used to check/uncheck items on sidebar
    this.setState({
      filtersList: this.state.filtersList.map(filterItem => {
        if (filterItem.filterName === filterName) {
          return {
            ...filterItem,
            isChecked: !filterItem.isChecked,
          };
        }
        return filterItem;
      }),
    });
  }
  reset() {
    this.setState({
      filtersList: this.state.filtersList.map(filterItem => {
        if (filterItem.isChecked) {
          return {
            ...filterItem,
            isChecked: false,
          };
        }
        return filterItem;
      }),
      checkedItems: [],
    });
  }
  render() {
    const { category } = this.props.pageContext;
    const postEdges = this.props.data.categories.edges;
    const checkedItems = this.state.checkedItems.map(item => {
      return item.toLowerCase();
    });
    const showFilterButton = checkedItems.length > 0 ? true : false;
    const filtersList = this.state.filtersList;
    return (
      <Layout>
        <div className="container-fluid main-container h-100">
          {this.state.showSidebar ? (
            <Sidebar
              filterType={'Topic'}
              close={this.toggleSidebar}
              update={this.updateCheckedItems}
              reset={this.reset}
              filterOptions={filtersList}
              showFilterButton={showFilterButton}
            />
          ) : null}

          <div className="main-content">
            <div className="filterbtn-div">
              <button
                className="btn filter-btn"
                type="button"
                aria-label="Filter category by topics"
                onClick={this.toggleSidebar}
              >
                <FontAwesomeIcon icon={faFilter} /> Filter
              </button>
            </div>

            <div className="text-center page-title-div">
              <h1>{category}</h1>
            </div>
            <PostList postEdges={postEdges} checkedTags={checkedItems} />
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    categories: allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          html
          id
          frontmatter {
            title
            category
            tags
            image {
              childImageSharp {
                sizes(maxWidth: 200) {
                  src
                }
              }
            }
          }
        }
      }
    }
    filters: allMarkdownRemark(
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
