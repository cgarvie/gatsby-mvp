var glob = require("glob");
var fs = require("fs");

require("./src/utils/misc.js")

const path = require("path")

require('events').EventEmitter.prototype._maxListeners = 9999;

exports.createPages = ({ actions: { createPage }, graphql }) => {

  var niches_conditions = [];
  var niches_supplements = [];

  glob("src/data/*.json", function(err, files) { // read the folder or folders if you want: example json/**/*.json
    if(err) {
      console.log("cannot read the folder, something goes wrong with glob", err);
    }
    files.forEach(function(file) {
      fs.readFile(file, 'utf8', function (err, data) { // Read each file
        if(err) {
          console.log("cannot read the file, something goes wrong with the file", err);
        }
        var obj = JSON.parse(data).data;    
        var query = file.split('.')[0].split('/');
        niches_conditions.push(query)
        query = query[query.length-1].replaceAll(' ','-');
        var url = query //query.toLowerCase()
        createPage({
          path: `/supplements/${url}/`,
          component: require.resolve("./src/templates/serp.js"),
          context: { obj, query, files},
        })

      });
    });
    var obj = null
    var query = ""
    createPage({
          path: `/supplements/`,
          matchPath: `/supplements/*`,
          component: require.resolve("./src/templates/serp.js"),
          context: { obj, query, files},
        })
  });

  //
  
  glob("src/data-toplists/*.json", function(err, files) {
    if(err) {
      console.log("cannot read the folder, something goes wrong with glob", err);
    }
    files.forEach(function(file) {
      fs.readFile(file, 'utf8', function (err, data) { // Read each file
        if(err) {
          console.log("cannot read the file, something goes wrong with the file", err);
        }
        var obj = JSON.parse(data);    
        var keyword = file.split('.')[0].split('/');
        niches_conditions.push(keyword)
        keyword = keyword[keyword.length-1].replaceAll(' ','-');
        var url = keyword.toLowerCase()
        createPage({
          path: `/best-${keyword}-supplements/`,
          component: require.resolve("./src/templates/toplistTemplate.js"),
          context: { obj, keyword, files},
        })

      });
    });
  });
  
  //
  
  const blogPostTemplate = path.resolve(`./src/templates/blogTemplate.js`)

  graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              title
              path
              date
              _PARENT
            }

          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    else {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.fileAbsolutePath.includes('/markdown/pages/')) {
          createPage({
            path: node.frontmatter.path,
            component: blogPostTemplate,
            context: {}, // additional data can be passed via context
          })
        }
      })
    }
  })
  


}
