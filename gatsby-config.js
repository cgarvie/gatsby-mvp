module.exports = {
  //pathPrefix: `/`, // do NOT add a trailing slash
  plugins: [
    {
        resolve: `gatsby-plugin-typography`,
        options: {
            pathToConfigModule: `src/utils/typography.js`,
        },
    },
	

		`gatsby-plugin-react-helmet`,

     {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown/`,
        name: "markdown-files",
      },
    },
  

    `gatsby-transformer-remark`,
    
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/products/*`] },
    },

    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        showSpinner: false,
        trickle: false,
        minimum: 0.4,
      },
    },
  ],
}