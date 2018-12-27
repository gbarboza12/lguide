module.exports = {
  siteMetadata: {
    title: 'Test Title',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
    'gatsby-transformer-sharp',
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `@andrew-codes/gatsby-plugin-elasticlunr-search`,
      options: {
          // Fields to index
          fields: [
              'title',
              'tags',
              //'category'
          ],
          // How to resolve each field's value for a supported node type
          resolvers: {
              // For any node of type MarkdownRemark, list how to resolve the fields' values
              MarkdownRemark: {
                  title: node => node.frontmatter.title,
                  keywords: node => node.frontmatter.tags,
              },
          },
      },
  },
    
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
