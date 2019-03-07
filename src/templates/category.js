import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import Modal from 'react-modal';

import Layout from '../components/layout';
import PostsHeader from '../components/posts-header';
import PostsHandler from '../components/posts-handler';
import Sidebar from '../components/sidebar';
import PostModal from '../components/post-modal';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
      listMode: true,
      showModal: false,
      checkedItems: [],
      filtersList: [],
      featuredPost: null,
    };
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleListMode = this.toggleListMode.bind(this);
    this.updateCheckedItems = this.updateCheckedItems.bind(this);
    this.reset = this.reset.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  componentDidMount() {
    Modal.setAppElement('body');
    const filtersList = this.getFiltersList();
    this.setState({ filtersList });
  }
  toggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar,
    });
  }
  toggleListMode(value) {
    this.setState({
      listMode: value,
    });
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
  updateCheckedItems(filterName) {
    // checkedItems list is used to filter out posts
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
  handleOpenModal(post) {
    this.setState({ showModal: true, featuredPost: post });
  }
  handleCloseModal() {
    this.setState({ showModal: false });
  }
  render() {
    const { category } = this.props.pageContext;
    const postEdges = this.props.data.categories.edges;
    const checkedItems = this.state.checkedItems.map(item => {
      return item.toLowerCase();
    });
    const showFilterButton = checkedItems.length > 0 ? true : false;
    const {
      filtersList,
      showSidebar,
      listMode,
      showModal,
      featuredPost,
    } = this.state;
    return (
      <Layout>
        <main id="main-content" aria-label="Main Content">
          <div id="main" className="container-fluid main-container h-100">
            {showSidebar && (
              <Sidebar
                filterType={'Topic'}
                close={this.toggleSidebar}
                update={this.updateCheckedItems}
                reset={this.reset}
                filterOptions={filtersList}
                showFilterButton={showFilterButton}
              />
            )}
            <div className="main-content">
              <PostsHeader
                toggleSidebar={this.toggleSidebar}
                toggleListMode={this.toggleListMode}
                listMode={listMode}
                pageTitle={category}
              />
              <PostsHandler
                postEdges={postEdges}
                checkedTags={checkedItems}
                listMode={listMode}
                showModal={showModal}
                handleOpenModal={this.handleOpenModal}
              />
              <br/><br/>
              <div className="text-center suggestions-text">
                <em>
                  Feel free to{' '}
                  <Link to={`/credits`}>send your suggestions</Link>.
                </em>
              </div>
            </div>
            <Modal
              isOpen={this.state.showModal}
              contentLabel="onRequestClose Example"
              onRequestClose={this.handleCloseModal}
              className="modal-body"
              overlayClassName="modal-overlay"
            >
              {featuredPost && (
                <PostModal
                  post={featuredPost}
                  handleCloseModal={this.handleCloseModal}
                />
              )}
            </Modal>
          </div>
        </main>
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
            author
            category
            tags
            website
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
