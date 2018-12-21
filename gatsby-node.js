const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require("path")
const _ = require("lodash");


exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const postPage = path.resolve("src/templates/post.js");
    const tagPage = path.resolve("src/templates/tag.js");
    const categoryPage = path.resolve("src/templates/category.js");
    resolve(
      graphql(`
          {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    tags
                    category
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {

        const tagSet = new Set();
        const categorySet = new Set();

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          if (node.frontmatter.tags) {
            node.frontmatter.tags.forEach(tag => {
              tagSet.add(tag);
            });
          }

          if (node.frontmatter.category) {
            categorySet.add(node.frontmatter.category);
          }

          createPage({
            path: node.fields.slug,
            component: postPage,
            context: {
              slug: node.fields.slug,
            }
          });
        });
        
        const tagList = Array.from(tagSet);
        tagList.forEach(tag => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}/`,
            component: tagPage,
            context: {
              tag
            }
          });
        });

        const categoryList = Array.from(categorySet);
        categoryList.forEach(category => {
          createPage({
            path: `/categories/${_.kebabCase(category)}/`,
            component: categoryPage,
            context: {
              category
            }
          });
        });

      })
    )
  })
}

